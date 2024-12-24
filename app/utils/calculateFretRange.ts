import { Note } from "types/music.types"

export const calculateFretRange = (notes: Note[]) => {
  const minFret = Math.min(...notes.map((note) => note.fret))
  let maxFret = Math.max(...notes.map((note) => note.fret))

  const fretRange = maxFret - minFret
  if (fretRange < 4) {
    maxFret += 4 - fretRange
  }
  return { minFret, maxFret }
}
