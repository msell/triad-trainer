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
  chord?: string
  inversion?: string
  stringset?: number
}

const fretOffsetY = (fretNumber: number) => {
  return fretNumber * FRET_SPACING + TOP_MARGIN
}

export const FretboardPosition = (_: Props) => {
  const { themed } = useAppTheme()
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = exactWidth / NUM_STRINGS

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
      <Note {...getNoteCoordinates({ stringNumber: 1, fretNumber: 3 })} text="1" />
      <Note {...getNoteCoordinates({ stringNumber: 2, fretNumber: 3 })} text="5" />
      <Note {...getNoteCoordinates({ stringNumber: 3, fretNumber: 4 })} text="3" />
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
