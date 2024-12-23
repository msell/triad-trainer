import { View } from "react-native"
import { Text } from "@/components"
import { FretboardPosition } from "./FretboardPosition"
import { NotePosition } from "@/types/CommonTypes"

interface Props {
  chord: string
  chordType: "major" | "minor" | "diminished" | "augmented"
  inversion: "root" | "first" | "second"
  stringset: "1" | "2" | "3" | "4"
}

const getNotes = (props: Props): NotePosition[] => {
  if (props.chordType === "major") {
    return []
  }
  if (props.chordType === "minor") {
    // TODO: Implement minor chord
    return []
  }
  if (props.chordType === "diminished") {
    // TODO: Implement diminished chord
    return []
  }
  if (props.chordType === "augmented") {
    // TODO: Implement augmented chord
    return []
  }
  return []
}

export const Triad = ({ chord, inversion, stringset }: Props) => {
  return (
    <View>
      <Text>{chord}</Text>
      <Text>{inversion}</Text>
      <FretboardPosition />
    </View>
  )
}
