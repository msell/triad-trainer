import {
  Chord,
  ChordType,
  Fretboard,
  Inversion,
  Note,
  StringSet,
  TriadNote,
  Tunings,
} from "types/music.types"

const standardFretboard: Fretboard = {
  tuning: "standard",
  strings: [
    ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"],
    ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb"],
    ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb"],
    ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db"],
    ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
    ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"],
  ],
}

const accidentalNotes: Record<string, string> = {
  "Bb": "A#",
  "Db": "C#",
  "Eb": "D#",
  "Gb": "F#",
  "Ab": "G#",
  "A#": "Bb",
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
}

export type TriadQuery = {
  chord: Chord
  inversion: Inversion
  stringSet: StringSet
  chordType: ChordType
  tuning?: Tunings
  minFret?: number
  maxFret?: number
}

export type TriadResult = TriadQuery & {
  notes: TriadNote[]
}

const ChordFormulas: Record<ChordType, number[]> = {
  major: [0, 4, 7], // Root, Major 3rd, Perfect 5th
  minor: [0, 3, 7], // Root, Minor 3rd, Perfect 5th
  diminished: [0, 3, 6], // Root, Minor 3rd, Diminished 5th
  augmented: [0, 4, 8], // Root, Major 3rd, Augmented 5th
}

const getNoteByInterval = (root: string, interval: number): string => {
  const stringNotes = standardFretboard.strings[0]
  const rootIndex = stringNotes.indexOf(root)

  if (rootIndex === -1) {
    throw new Error(`Root note ${root} not found on the fretboard`)
  }

  const targetIndex = (rootIndex + interval) % stringNotes.length
  return stringNotes[targetIndex]
}

const getTriadNotes = (
  root: string,
  chordType: ChordType,
): { root: string; third: string; fifth: string } => {
  const formula = ChordFormulas[chordType]
  return {
    root,
    third: getNoteByInterval(root, formula[1]),
    fifth: getNoteByInterval(root, formula[2]),
  }
}

const applyInversion = (
  triad: { root: string; third: string; fifth: string },
  inversion: Inversion,
): [keyof typeof triad, keyof typeof triad, keyof typeof triad] => {
  switch (inversion) {
    case "root":
      return ["root", "third", "fifth"]
    case "first":
      return ["third", "fifth", "root"]
    case "second":
      return ["fifth", "root", "third"]
    default:
      throw new Error(`Invalid inversion: ${inversion}`)
  }
}

const getStringNotes = ({
  string,
  tuning = "standard",
  minFret = 0,
  maxFret = 22,
}: {
  string: number
  tuning?: Tunings
  minFret?: number
  maxFret?: number
}): Note[] => {
  const fretboard = standardFretboard

  if (!fretboard.tuning) {
    throw new Error(`No fretboard found for tuning ${tuning}`)
  }

  const stringNotes = fretboard.strings[string - 1]
  const notes: Note[] = []

  for (let fret = minFret; fret <= maxFret; fret++) {
    const noteIndex = fret % stringNotes.length
    const altNote = accidentalNotes[stringNotes[noteIndex]] || undefined
    notes.push({
      fret,
      string,
      note: stringNotes[noteIndex],
      altNote,
    })
  }

  return notes
}

const getClosestTriad = (
  rootNotes: TriadNote[],
  thirdNotes: TriadNote[],
  fifthNotes: TriadNote[],
): TriadNote[] => {
  let closestTriad: TriadNote[] = []
  let smallestSpan = Infinity

  for (const root of rootNotes) {
    for (const third of thirdNotes) {
      for (const fifth of fifthNotes) {
        const frets = [root.fret, third.fret, fifth.fret]
        const maxFret = Math.max(...frets)
        const minFret = Math.min(...frets)
        const span = maxFret - minFret

        if (span < smallestSpan) {
          smallestSpan = span
          closestTriad = [root, third, fifth]
        }
      }
    }
  }

  return closestTriad
}

export const getTriads = ({
  chord,
  inversion,
  stringSet,
  chordType = "major",
  minFret = 0,
  maxFret = 15,
  tuning = "standard",
}: TriadQuery): TriadResult => {
  if (!standardFretboard.tuning) {
    throw new Error(`No fretboard found for tuning ${tuning}`)
  }

  const { bottomString, middleString, topString } = getStrings(stringSet)
  const bottomNotes = getStringNotes({ string: bottomString, minFret, maxFret, tuning })
  const middleNotes = getStringNotes({ string: middleString, minFret, maxFret, tuning })
  const topNotes = getStringNotes({ string: topString, minFret, maxFret, tuning })

  const triad = getTriadNotes(chord, chordType)
  const [bottomKey, middleKey, topKey] = applyInversion(triad, inversion)

  const rootNotes = bottomNotes
    .filter((note) => note.note === triad[bottomKey])
    .map((note) => ({ ...note, scaleDegree: 1 }))

  const thirdNotes = middleNotes
    .filter((note) => note.note === triad[middleKey])
    .map((note) => ({ ...note, scaleDegree: 3 }))

  const fifthNotes = topNotes
    .filter((note) => note.note === triad[topKey])
    .map((note) => ({ ...note, scaleDegree: 5 }))

  const triadNotes = getClosestTriad(rootNotes, thirdNotes, fifthNotes)

  return {
    chord,
    inversion,
    stringSet,
    chordType,
    notes: triadNotes,
  }
}

const getStrings = (
  stringSet: StringSet,
): { bottomString: number; middleString: number; topString: number } => {
  switch (stringSet) {
    case 1:
      return { bottomString: 3, middleString: 2, topString: 1 }
    case 2:
      return { bottomString: 4, middleString: 3, topString: 2 }
    case 3:
      return { bottomString: 5, middleString: 4, topString: 3 }
    case 4:
      return { bottomString: 6, middleString: 5, topString: 4 }
    default:
      throw new Error(`Invalid string set ${stringSet}`)
  }
}
