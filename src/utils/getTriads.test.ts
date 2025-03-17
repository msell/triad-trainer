import { getStringNotes, getTriads } from "./getTriads"

// Define __DEV__ for tests
global.__DEV__ = false

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
    expect(result).not.toBeNull()
    expect(result!.notes).toEqual([
      { fret: 5, string: 3, note: "C", scaleDegree: 1, altNote: undefined },
      { fret: 5, string: 2, note: "E", scaleDegree: 3, altNote: undefined },
      { fret: 3, string: 1, note: "G", scaleDegree: 5, altNote: undefined },
    ])
  })

  it("should return the correct notes for a G major root voicing", () => {
    const result = getTriads({
      chord: "G",
      chordType: "major",
      inversion: "root",
      stringSet: 1,
      maxFret: 16,
    })
    expect(result).not.toBeNull()
    expect(result!.notes).toEqual([
      { fret: 12, string: 3, note: "G", scaleDegree: 1, altNote: undefined },
      { fret: 12, string: 2, note: "B", scaleDegree: 3, altNote: undefined },
      { fret: 10, string: 1, note: "D", scaleDegree: 5, altNote: undefined },
    ])
  })

  it("should return the correct notes for a C major first inversion", () => {
    const result = getTriads({
      chord: "C",
      chordType: "major",
      inversion: "first",
      stringSet: 1,
      maxFret: 13,
    })
    expect(result).not.toBeNull()
    const expectedNotes = [
      { fret: 9, note: "E", scaleDegree: 3, string: 3, altNote: undefined },
      { fret: 8, note: "G", scaleDegree: 5, string: 2, altNote: undefined },
      { fret: 8, note: "C", scaleDegree: 1, string: 1, altNote: undefined },
    ]

    // Check that each expected note is in the result
    expectedNotes.forEach((expectedNote) => {
      expect(result!.notes).toContainEqual(expectedNote)
    })
  })

  it("should return the correct notes for a D major second inversion 4th string", () => {
    const result = getTriads({
      chord: "D",
      chordType: "major",
      inversion: "second",
      stringSet: 4,
      minFret: 1,
      maxFret: 13,
    })
    expect(result).not.toBeNull()
    const expectedNotes = [
      { fret: 5, note: "A", scaleDegree: 5, string: 6, altNote: undefined },
      { fret: 5, note: "D", scaleDegree: 1, string: 5, altNote: undefined },
      { fret: 4, note: "Gb", scaleDegree: 3, string: 4, altNote: "F#" },
    ]

    // Check that each expected note is in the result
    expectedNotes.forEach((expectedNote) => {
      expect(result!.notes).toContainEqual(expectedNote)
    })
  })

  it("should return the correct notes for a C augmented triad root position", () => {
    const result = getTriads({
      chord: "C",
      chordType: "augmented",
      inversion: "root",
      stringSet: 1,
      maxFret: 13,
    })
    expect(result).not.toBeNull()
    const expectedNotes = [
      { fret: 5, note: "C", scaleDegree: 1, string: 3, altNote: undefined },
      { fret: 5, note: "E", scaleDegree: 3, string: 2, altNote: undefined },
      { fret: 4, note: "Ab", scaleDegree: 5, string: 1, altNote: "G#" },
    ]

    // Check that each expected note is in the result
    expectedNotes.forEach((expectedNote) => {
      expect(result!.notes).toContainEqual(expectedNote)
    })
  })

  it("should return the correct notes for an A augmented triad first inversion", () => {
    const result = getTriads({
      chord: "A",
      chordType: "augmented",
      inversion: "first",
      stringSet: 1,
      maxFret: 13,
    })
    expect(result).not.toBeNull()
    const expectedNotes = [
      { fret: 5, note: "Db", scaleDegree: 3, string: 3, altNote: "C#" },
      { fret: 5, note: "F", scaleDegree: 5, string: 2, altNote: undefined },
      { fret: 5, note: "A", scaleDegree: 1, string: 1, altNote: undefined },
    ]

    // Check that each expected note is in the result
    expectedNotes.forEach((expectedNote) => {
      expect(result!.notes).toContainEqual(expectedNote)
    })
  })
})
