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
  notes: NotePosition[]
  inversion: "root" | "firstInversion" | "secondInversion"
  stringset: "1" | "2" | "3" | "4"
}

function calculateStartingFret(notes: NotePosition[]): number {
  if (!notes.length) return 1

  // Find the minimum fret number from all notes
  const minFret = Math.min(...notes.map((note) => note.fretNumber))

  // Return one fret lower than the minimum, but not less than 0
  return Math.max(1, minFret)
}

const fretOffsetY = (fretNumber: number) => {
  return fretNumber * FRET_SPACING + TOP_MARGIN + 3
}

export const FretboardPosition = ({ notes, inversion, stringset }: Props) => {
  const { themed } = useAppTheme()
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = exactWidth / NUM_STRINGS

  const startingFret = calculateStartingFret(notes)

  interface FretMarkerProps {
    fretNumber: number
    position: "left" | "right"
    y: number
  }
  const FretMarker = ({ fretNumber, position, y }: FretMarkerProps) => {
    const x = position === "left" ? 21 : exactWidth - 10
    return <SkiaText x={x} y={y} text={fretNumber.toString()} fontSize={15} color={NUT_COLOR} />
  }

  console.tron.log({
    notes,
    startingFret,
  })
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

    return degreeMap[inversion][positionInSet]
  }
  const getNoteCoordinates = useCallback(
    (note: NotePosition): { x: number; y: number } => {
      const x = (NUM_STRINGS - note.stringNumber) * stringSpacing + LEFT_GUTTER
      const y = fretOffsetY(note.fretNumber - startingFret + 1) - FRET_SPACING / 2

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
          key={`${note.stringNumber}-${note.fretNumber}`}
          {...getNoteCoordinates(note)}
          text={getNoteDegree(inversion, note.stringNumber, stringset) ?? ""}
        />
      ))}

      <FretMarker
        y={90}
        fretNumber={startingFret}
        position={stringset === "4" ? "right" : "left"}
      />
      <FretMarker
        y={290}
        fretNumber={startingFret + 2}
        position={stringset === "4" ? "right" : "left"}
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
