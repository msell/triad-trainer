import { getStringNotes, getTriads } from "./getTriads"

describe("getStringNotes", () => {
  it("should return the notes for the 1st string up to the 13th fret", () => {
    const result = getStringNotes({ string: 1, tuning: "standard", minFret: 0, maxFret: 13 })
    expect(result).toEqual([
      { fret: 0, string: 1, note: "E" },
      { fret: 1, string: 1, note: "F" },
      { fret: 2, string: 1, note: "Gb", altNote: "F#" },
      { fret: 3, string: 1, note: "G" },
      { fret: 4, string: 1, note: "Ab", altNote: "G#" },
      { fret: 5, string: 1, note: "A" },
      { fret: 6, string: 1, note: "Bb", altNote: "A#" },
      { fret: 7, string: 1, note: "B" },
      { fret: 8, string: 1, note: "C" },
      { fret: 9, string: 1, note: "Db", altNote: "C#" },
      { fret: 10, string: 1, note: "D" },
      { fret: 11, string: 1, note: "Eb", altNote: "D#" },
      { fret: 12, string: 1, note: "E" },
      { fret: 13, string: 1, note: "F" },
    ])
  })
})
describe("getTriads", () => {
  it("should return the notes for a C major triad on the 1st stringset root voicing", () => {
    const result = getTriads({
      chord: "C",
      chordType: "major",
      inversion: "root",
      stringSet: 1,
      maxFret: 13,
    })
    expect(result.notes).toEqual([
      { fret: 5, string: 3, note: "C", scaleDegree: 1, altNote: undefined },
      { fret: 5, string: 2, note: "E", scaleDegree: 3, altNote: undefined },
      { fret: 3, string: 1, note: "G", scaleDegree: 5, altNote: undefined },
    ])
  })
})