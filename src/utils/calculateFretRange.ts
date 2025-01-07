import { Note } from "@/types"

export const calculateFretRange = (notes: Note[]) => {
  const minFret = Math.max(1, Math.min(...notes.map((note) => note.fret)))
  let maxFret = Math.max(...notes.map((note) => note.fret))

  const fretRange = maxFret - minFret
  if (fretRange < 4) {
    maxFret += 4 - fretRange
  }
  return { minFret, maxFret }
}
