import { colors, ThemedStyle } from "@/theme"
import { NotePosition } from "@/types/CommonTypes"
import { useAppTheme } from "@/utils/useAppTheme"
import { Canvas, Group } from "@shopify/react-native-skia"
import { useCallback } from "react"
import { Dimensions, ViewStyle } from "react-native"

import { Fret } from "./Fret"
import { GuitarString } from "./GuitarString"
import { Note } from "./Note"
import { Nut } from "./Nut"
import { SkiaText } from "./SkiaText"

const HEIGHT = 500
const NUT_COLOR = colors.palette.secondary400
const STRING_COLOR = colors.palette.secondary300
const FRET_COLOR = colors.palette.neutral400
const NUM_STRINGS = 6
const TOP_MARGIN = 46
const FRET_SPACING = 100
const NUMBER_OF_FRETS = 4
const LEFT_GUTTER = 28
const TUNING = ["E", "A", "D", "G", "B", "e"]
interface Props {
  notes?: NotePosition[]
  startingFret?: number
  inversion: "root" | "firstInversion" | "secondInversion"
  stringset: "1" | "2" | "3" | "4"
}

const fretOffsetY = (fretNumber: number) => {
  return fretNumber * FRET_SPACING + TOP_MARGIN
}

export const FretboardPosition = ({ notes, inversion, stringset }: Props) => {
  const { themed } = useAppTheme()
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = exactWidth / NUM_STRINGS

  const getNoteDegree = (
    inversion: "root" | "firstInversion" | "secondInversion",
    string: number,
    stringset: "1" | "2" | "3" | "4",
  ) => {
    // Stringset 1: strings 1,2,3
    // Stringset 2: strings 2,3,4
    // Stringset 3: strings 3,4,5
    // Stringset 4: strings 4,5,6

    const stringsetMappings = {
      "1": [3, 2, 1],
      "2": [4, 3, 2],
      "3": [5, 4, 3],
      "4": [6, 5, 4],
    }

    const currentStringset = stringsetMappings[stringset]
    const positionInSet = currentStringset.indexOf(string)

    if (positionInSet === -1) return null

    const degreeMap = {
      root: ["1", "3", "5"],
      firstInversion: ["3", "5", "1"],
      secondInversion: ["5", "1", "3"],
    }

    console.tron.log({
      inversion,
      positionInSet,
      currentStringset,
      degreeMap,
      result: degreeMap[inversion][positionInSet],
    })
    return degreeMap[inversion][positionInSet]
  }
  const getNoteCoordinates = useCallback(
    (note: NotePosition): { x: number; y: number } => {
      const x = (NUM_STRINGS - note.stringNumber) * stringSpacing + LEFT_GUTTER
      const y = fretOffsetY(note.fretNumber) - FRET_SPACING / 2

      return { x, y }
    },
    [stringSpacing],
  )

  return (
    <Canvas style={[themed($canvas), { width: exactWidth }]}>
      <Group>
        {Array.from({ length: NUMBER_OF_FRETS }).map((_, index) => (
          <Fret key={index} offset={fretOffsetY(index)} color={FRET_COLOR} />
        ))}
      </Group>

      <Group transform={[{ translateX: LEFT_GUTTER }]}>
        {Array.from({ length: NUM_STRINGS }).map((_, index) => (
          <Group key={index}>
            <SkiaText
              x={stringSpacing * index + 4}
              y={20}
              text={TUNING[index]}
              fontSize={30}
              color={NUT_COLOR}
            />
            <GuitarString
              offset={stringSpacing * index}
              index={index + 1}
              color={STRING_COLOR}
              height={HEIGHT}
            />
          </Group>
        ))}
      </Group>

      <Nut width={exactWidth} verticalOffset={TOP_MARGIN} color={NUT_COLOR} />
      {notes?.map((note) => (
        <Note
          key={`${note.stringNumber}-${note.fretNumber}`}
          {...getNoteCoordinates(note)}
          text={getNoteDegree(inversion, note.stringNumber, stringset) ?? ""}
        />
      ))}
    </Canvas>
  )
}
const $canvas: ThemedStyle<ViewStyle> = () => ({
  width: "95%",
  maxWidth: 400,
  height: HEIGHT,
  borderRadius: 10,
  boxShadow: `0 0 10px ${colors.palette.neutral400}`,
  backgroundColor: colors.palette.neutral100,
})
