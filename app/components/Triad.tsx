import { View } from "react-native"
import { Text } from "@/components"
import { FretboardPosition } from "./FretboardPosition"
import data from "@/data/triads-keyof-c.json"

interface Props {
  chord: "C"
  chordType: "major" | "minor" | "diminished" | "augmented"
  inversion: "root" | "firstInversion" | "secondInversion"
  stringset: "1" | "2" | "3" | "4"
}

export const Triad = ({ chord, chordType, inversion, stringset }: Props) => {
  const notes = data[chord][chordType][inversion][stringset] as any
  console.tron.log(notes)
  return (
    <View>
      <Text>{chord}</Text>
      <Text>{inversion}</Text>
      <FretboardPosition notes={notes} />
      <Text>{stringset}</Text>
    </View>
  )
}
