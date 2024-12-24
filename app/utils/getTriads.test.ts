import { getTriads } from "./getTriads"

describe("getTriads", () => {
  it("should return the notes for a C major triad on the 1st stringset root voicing", () => {
    const result = getTriads({ chord: "C", chordType: "major", inversion: "root", stringSet: 1 })
    expect(result.notes).toEqual([
      { fret: 5, string: 3, note: "C", scaleDegree: 1 },
      { fret: 5, string: 2, note: "E", scaleDegree: 3 },
      { fret: 3, string: 1, note: "G", scaleDegree: 5 },
    ])
  })
})
