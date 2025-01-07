import { getTriads } from "@/utils/getTriads"
import { Chord, ChordType, Inversion, StringSet } from "@/types"
import { FretboardPosition } from "./FretboardPosition"

interface Props {
  chord: Chord
  chordType: ChordType
  inversion: Inversion
  stringSet: StringSet
}

export const Triad = ({ chord, chordType, inversion, stringSet }: Props) => {
  const triads = getTriads({
    chord,
    chordType,
    inversion,
    stringSet,
    minFret: 1,
  })

  return <FretboardPosition notes={triads?.notes ?? []} stringset={stringSet} />
}
