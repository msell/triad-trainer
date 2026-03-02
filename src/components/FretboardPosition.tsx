import { colors, ThemedStyle } from "@/theme"
import { Note as NoteType, StringSet, TriadNote } from "@/types"
import { calculateFretRange } from "@/utils/calculateFretRange"
import { useAppTheme } from "@/utils/useAppTheme"
import { Canvas, Group } from "@shopify/react-native-skia"
import { useCallback } from "react"
import { Dimensions, ViewStyle } from "react-native"

import { Fret } from "./Fret"
import { GuitarString } from "./GuitarString"
import { Note } from "./Note"
import { Nut } from "./Nut"
import { SkiaText } from "./SkiaText"

const DEFAULT_HEIGHT = 440
const NUT_COLOR = colors.palette.secondary400
const STRING_COLOR = colors.palette.secondary300
const FRET_COLOR = colors.palette.neutral400
const NUM_STRINGS = 6
const TOP_MARGIN = 46
const NUMBER_OF_FRETS = 4
const LEFT_GUTTER = 28
const TUNING = ["E", "A", "D", "G", "B", "e"]

interface Props {
  notes: TriadNote[]
  stringset: StringSet
  noteDisplay: "scaleDegree" | "noteName" | "none"
  pulseRoot?: boolean
  height?: number
}

export const FretboardPosition = ({
  notes,
  stringset,
  noteDisplay = "noteName",
  pulseRoot,
  height = DEFAULT_HEIGHT,
}: Props) => {
  const { themed } = useAppTheme()

  const fretSpacing = (height - TOP_MARGIN) / NUMBER_OF_FRETS

  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = exactWidth / NUM_STRINGS

  const fretRange = calculateFretRange(notes)
  const startingFret = fretRange.minFret

  const fretOffsetY = useCallback(
    (fretNumber: number) => fretNumber * fretSpacing + TOP_MARGIN + 3,
    [fretSpacing],
  )

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
      let y = fretOffsetY(note.fret - startingFret + 1) - fretSpacing / 2

      if (note.fret === 0) {
        y = y + 26
      }
      return { x, y }
    },
    [startingFret, stringSpacing, fretOffsetY, fretSpacing],
  )

  const fretMarkerY1 = fretOffsetY(1) - fretSpacing / 2 + 10
  const fretMarkerY2 = fretOffsetY(3) - fretSpacing / 2 + 10

  return (
    <Canvas style={[themed($canvas), { width: exactWidth, height }]}>
      <Group>
        {Array.from({ length: NUMBER_OF_FRETS }).map((_, index) => (
          <Fret key={index} offset={fretOffsetY(index)} color={FRET_COLOR} width={exactWidth} />
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
              height={height}
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
          text={
            noteDisplay === "scaleDegree"
              ? note.scaleDegree.toString()
              : noteDisplay === "noteName"
                ? note.note
                : ""
          }
          pulse={pulseRoot && note.scaleDegree === 1}
        />
      ))}

      <FretMarker
        y={fretMarkerY1}
        fretNumber={startingFret}
        position={stringset === 4 ? "right" : "left"}
      />
      <FretMarker
        y={fretMarkerY2}
        fretNumber={startingFret + 2}
        position={stringset === 4 ? "right" : "left"}
      />
    </Canvas>
  )
}

const $canvas: ThemedStyle<ViewStyle> = () => ({
  width: "95%",
  borderRadius: 10,
  boxShadow: `0 0 10px ${colors.palette.neutral400}`,
  backgroundColor: colors.palette.neutral100,
})
