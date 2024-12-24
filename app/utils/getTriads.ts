type Chord = "A" | "Bb" | "B" | "C" | "Db" | "D" | "Eb" | "E" | "F" | "Gb" | "G" | "Ab"
type Inversion = "root" | "first" | "second"
type StringSet = 1 | 2 | 3 | 4
type ChordType = "major" | "minor" | "diminished" | "augmented"

type Tunings = "standard" | "dropD"

type Fretboard = {
  tuning: Tunings
  strings: string[][]
}

const standardFretboard: Fretboard = {
  tuning: "standard",
  strings: [
    ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
    ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
    ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
    ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
    ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
  ],
}

export type TriadQuery = {
  chord: Chord
  inversion: Inversion
  stringSet: StringSet
  chordType: ChordType
  tuning?: Tunings
}

export type Note = {
  fret: number
  string: number
  note: string
  altNote?: string // for example, Bb is a flat note, but it's also a sharp note
  scaleDegree?: number
  minFret?: number
  maxFret?: number
}

export type TriadResult = TriadQuery & {
  notes: Note[]
}

type StringNotesInput = {
  string: number
  tuning: Tunings
  minFret: number
  maxFret: number
}

export const getStringNotes = ({
  string,
  tuning = "standard",
  minFret = 0,
  maxFret = 22,
}: StringNotesInput) => {
  if (!standardFretboard.tuning) {
    throw new Error(`No fretboard found for tuning ${tuning}`)
  }

  return standardFretboard.strings[string].slice(minFret, maxFret)
}
export const getTriads = ({
  chord,
  inversion,
  stringSet,
  chordType = "major",
  maxFret = 15,
  tuning = "standard",
}: TriadQuery): TriadResult => {
  if (!standardFretboard.tuning) {
    throw new Error(`No fretboard found for tuning ${tuning}`)
  }

  if (chordType !== "major") {
    throw new Error(`only major chords are supported at this time`)
  }

  if (stringSet === 1) {
    // find the root note on the 3rd string
    const rootNotes = standardFretboard.strings[2].filter((note) => note === chord)
    if (!rootNotes) {
      throw new Error(`Root note ${chord} not found on the 3rd string`)
    }
  }

  throw new Error(`not implemented yet`)
}
