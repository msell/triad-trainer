import { chromaticScale } from "./constants"

export type Chord = (typeof chromaticScale)[number]
export type Inversion = "root" | "first" | "second"
export type StringSet = 1 | 2 | 3 | 4
export type ChordType = "major" | "minor" | "diminished" | "augmented"

export type Tunings = "standard" | "dropD"

export type Fretboard = {
  tuning: Tunings
  strings: string[][]
}

export type Note = {
  fret: number
  string: number
  note: string
  altNote?: string // for example, Bb is a flat note, but it's also a sharp note
}

export type TriadNote = Note & {
  scaleDegree: number
}
