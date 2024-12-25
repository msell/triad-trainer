import { Text } from "@/components"
import { getTriads } from "@/utils/getTriads"
import { View } from "react-native"
import { Chord, ChordType, Inversion, StringSet } from "types/music.types"

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
  })

  return (
    <View>
      <Text>{chord}</Text>
      <Text>{inversion}</Text>
      <FretboardPosition notes={triads?.notes ?? []} stringset={stringSet} />
      <Text>{stringSet}</Text>
    </View>
  )
}
