import { Text } from "@/components"
import data from "@/data/triads-keyof-c.json"
import { View } from "react-native"

import { FretboardPosition } from "./FretboardPosition"

interface Props {
  chord: "C"
  chordType: "major" | "minor" | "diminished" | "augmented"
  inversion: "root" | "firstInversion" | "secondInversion"
  stringset: "1" | "2" | "3" | "4"
}

export const Triad = ({ chord, chordType, inversion, stringset }: Props) => {
  const notes = data[chord][chordType][inversion][stringset] as any

  return (
    <View>
      <Text>{chord}</Text>
      <Text>{inversion}</Text>
      <FretboardPosition notes={notes} inversion={inversion} stringset={stringset} />
      <Text>{stringset}</Text>
    </View>
  )
}
