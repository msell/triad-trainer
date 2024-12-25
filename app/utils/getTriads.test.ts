import { getTriads } from "./getTriads"

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

  it("should return the correct notes for a G major root voicing", () => {
    const result = getTriads({
      chord: "G",
      chordType: "major",
      inversion: "root",
      stringSet: 1,
      maxFret: 16,
    })
    expect(result?.notes).toEqual([
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
    const expectedNotes = [
      { fret: 9, note: "E", scaleDegree: 3, string: 3, altNote: undefined },
      { fret: 8, note: "G", scaleDegree: 5, string: 2, altNote: undefined },
      { fret: 8, note: "C", scaleDegree: 1, string: 1, altNote: undefined },
    ]

    // Check that each expected note is in the result
    expectedNotes.forEach((expectedNote) => {
      expect(result.notes).toContainEqual(expectedNote)
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
    const expectedNotes = [
      { fret: 5, note: "A", scaleDegree: 5, string: 6, altNote: undefined },
      { fret: 5, note: "D", scaleDegree: 1, string: 5, altNote: undefined },
      { fret: 4, note: "Gb", scaleDegree: 3, string: 4, altNote: "F#" },
    ]

    // Check that each expected note is in the result
    expectedNotes.forEach((expectedNote) => {
      expect(result.notes).toContainEqual(expectedNote)
    })
  })
})
