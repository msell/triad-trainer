import { ViewStyle, Dimensions } from "react-native"
import { Canvas, Group, useFont } from "@shopify/react-native-skia"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, ThemedStyle } from "@/theme"
import { useCallback, useEffect } from "react"
import { Note } from "./Note"
import { Fret } from "./Fret"
import { GuitarString } from "./GuitarString"
import { Nut } from "./Nut"

const HEIGHT = 500
const NUT_COLOR = colors.palette.secondary400
const STRING_COLOR = colors.palette.secondary300
const FRET_COLOR = colors.palette.neutral400
const NUM_STRINGS = 6
const LEFT_MARGIN = 10
const TOP_MARGIN = 46
const FRET_SPACING = 100
const NUMBER_OF_FRETS = 4
interface NotePosition {
  stringNumber: number
  fretNumber: number
}

interface Props {
  notes?: NotePosition[]
  startingFret?: number
}

const fretOffsetY = (fretNumber: number) => {
  return fretNumber * FRET_SPACING + TOP_MARGIN
}

const getNoteCoordinates = (note: NotePosition): { x: number; y: number } => {
  const x = NUM_STRINGS - note.stringNumber + LEFT_MARGIN
  const y = fretOffsetY(note.fretNumber) - FRET_SPACING / 2

  return { x, y }
}

export const FretboardPosition = () => {
  const { themed } = useAppTheme()
  const font = useFont(require("../assets/fonts/LilitaOne-Regular.ttf"), 44)
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = (exactWidth * 1.1) / NUM_STRINGS

  useEffect(() => {
    // eslint-disable-next-line reactotron/no-tron-in-production
    console.tron.log("font", font)
  }, [font])
  return (
    <Canvas style={[themed($canvas), { width: exactWidth }]}>
      <Group>
        {Array.from({ length: NUMBER_OF_FRETS }).map((_, index) => (
          <Fret key={index} offset={fretOffsetY(index)} color={FRET_COLOR} />
        ))}
      </Group>
      <Group transform={[{ translateX: 12 }]}>
        {Array.from({ length: NUM_STRINGS }).map((_, index) => (
          <GuitarString
            key={index}
            offset={stringSpacing * index}
            index={index + 1}
            color={STRING_COLOR}
            height={HEIGHT}
          />
        ))}
      </Group>

      <Nut width={exactWidth} verticalOffset={TOP_MARGIN} color={NUT_COLOR} />
      <Note {...getNoteCoordinates({ stringNumber: 6, fretNumber: 1 })} text="X" />
      <Note x={330} y={50} text="R" />
      <Note x={330} y={190} text="1" />
      <Note x={200} y={230} text="5" />
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
