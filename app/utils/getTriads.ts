import { Chord, ChordType, Fretboard, Inversion, Note, StringSet, TriadNote, Tunings } from "types/music.types"

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

type StringNotesInput = {
  string: number
  tuning: Tunings
  minFret: number
  maxFret: number
}

type MajorTriad = {
  root: string
  third: string
  fifth: string
}

const MajorScaleFormulaInSemitones = [0, 2, 4, 5, 7, 9, 11]

interface StringSetDetails {
  bottomString: number
  middleString: number
  topString: number
}

const getStrings = (stringSet: StringSet): StringSetDetails => {
  switch (stringSet) {
    case 1:
      return {
        bottomString: 3,
        middleString: 2,
        topString: 1,
      }
    case 2:
      return {
        bottomString: 4,
        middleString: 3,
        topString: 2,
      }
    case 3:
      return {
        bottomString: 5,
        middleString: 4,
        topString: 3,
      }
    case 4:
      return {
        bottomString: 6,
        middleString: 5,
        topString: 4,
      }
    default:
      throw new Error(`Invalid string set ${stringSet}`)
  }
}

const getNoteByInterval = (root: string, interval: number): string => {
  const stringNotes = standardFretboard.strings[0] // Use any string, here the first string is used
  const rootIndex = stringNotes.indexOf(root)

  if (rootIndex === -1) {
    throw new Error(`Root note ${root} not found on the fretboard`)
  }

  const targetIndex = (rootIndex + interval) % stringNotes.length
  return stringNotes[targetIndex]
}

export const getThird = (root: string): string => {
  const thirdInterval = MajorScaleFormulaInSemitones[2] // 4 semitones
  return getNoteByInterval(root, thirdInterval)
}

export const getFifth = (root: string): string => {
  const fifthInterval = MajorScaleFormulaInSemitones[4] // 7 semitones
  return getNoteByInterval(root, fifthInterval)
}

export const getMajorTriad = (root: string): MajorTriad => {
  return {
    root,
    third: getThird(root),
    fifth: getFifth(root),
  }
}

export const getStringNotes = ({
  string,
  tuning = "standard",
  minFret = 0,
  maxFret = 22,
}: StringNotesInput): Note[] => {
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

  if (chordType !== "major") {
    throw new Error(`only major chords are supported at this time`)
  }

  const { bottomString, middleString, topString } = getStrings(stringSet)
  const bottomStringNotes = getStringNotes({ string: bottomString, minFret, maxFret, tuning })
  const middleStringNotes = getStringNotes({ string: middleString, minFret, maxFret, tuning })
  const topStringNotes = getStringNotes({ string: topString, minFret, maxFret, tuning })
  const majorTriad = getMajorTriad(chord)

  const rootNotes = bottomStringNotes.reduce<TriadNote[]>((acc, note) => {
    if (note.note === majorTriad.root) {
      acc.push({ ...note, scaleDegree: 1 })
    }
    return acc
  }, [])

  const thirdNotes = middleStringNotes.reduce<TriadNote[]>((acc, note) => {
    if (note.note === majorTriad.third) {
      acc.push({ ...note, scaleDegree: 3 })
    }
    return acc
  }, [])

  const fifthNotes = topStringNotes.reduce<TriadNote[]>((acc, note) => {
    if (note.note === majorTriad.fifth) {
      acc.push({ ...note, scaleDegree: 5 })
    }
    return acc
  }, [])

  return {
    chord,
    inversion,
    stringSet,
    chordType,
    notes: [...rootNotes, ...thirdNotes, ...fifthNotes],
  }

}
