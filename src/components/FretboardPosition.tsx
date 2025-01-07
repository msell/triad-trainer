import { colors, ThemedStyle } from "@/theme"
import { calculateFretRange } from "@/utils/calculateFretRange"
import { useAppTheme } from "@/utils/useAppTheme"
import { Canvas, Group } from "@shopify/react-native-skia"
import { useCallback } from "react"
import { Dimensions, ViewStyle } from "react-native"
import { Note as NoteType, StringSet, TriadNote } from "@/types"

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
  notes: TriadNote[]
  stringset: StringSet
}

const fretOffsetY = (fretNumber: number) => {
  return fretNumber * FRET_SPACING + TOP_MARGIN + 3
}

export const FretboardPosition = ({ notes, stringset }: Props) => {
  const { themed } = useAppTheme()
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = exactWidth / NUM_STRINGS

  const fretRange = calculateFretRange(notes)
  // console.tron.log({ fretRange, notes })
  const startingFret = fretRange.minFret
  interface FretMarkerProps {
    fretNumber: number
    position: "left" | "right"
    y: number
  }
  const FretMarker = ({ fretNumber, position, y }: FretMarkerProps) => {
    const x = position === "left" ? 21 : exactWidth - 10
    return <SkiaText x={x} y={y} text={fretNumber.toString()} fontSize={15} color={NUT_COLOR} />
  }

  const getNoteCoordinates = useCallback(
    (note: NoteType): { x: number; y: number } => {
      const x = (NUM_STRINGS - note.string) * stringSpacing + LEFT_GUTTER
      const y = fretOffsetY(note.fret - startingFret + 1) - FRET_SPACING / 2

      return { x, y }
    },
    [startingFret, stringSpacing],
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

      {startingFret === 1 && (
        <Nut width={exactWidth} verticalOffset={TOP_MARGIN} color={NUT_COLOR} />
      )}
      {notes?.map((note) => (
        <Note
          key={`${note.string}-${note.fret}`}
          {...getNoteCoordinates(note)}
          text={note.scaleDegree === 1 ? "R" : (note.scaleDegree.toString() ?? "")}
          pulse={note.scaleDegree === 1}
        />
      ))}

      <FretMarker y={90} fretNumber={startingFret} position={stringset === 4 ? "right" : "left"} />
      <FretMarker
        y={290}
        fretNumber={startingFret + 2}
        position={stringset === 4 ? "right" : "left"}
      />
      {/* <SkiaText x={21} y={90} text={startingFret.toString()} fontSize={15} color={NUT_COLOR} />
      <SkiaText
        x={21}
        y={290}
        text={(startingFret + 2).toString()}
        fontSize={15}
        color={NUT_COLOR}
      /> */}
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
