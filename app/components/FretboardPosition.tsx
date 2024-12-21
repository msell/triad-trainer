import { View, StyleSheet, ViewStyle, Dimensions } from "react-native"
import { Canvas, Circle, Group, Path, Skia, Text } from "@shopify/react-native-skia"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, ThemedStyle } from "@/theme"

const STRINGS = [1, 2, 3, 4, 5, 6]
const HEIGHT = 500
const NUT_COLOR = colors.palette.secondary400
const STRING_COLOR = colors.palette.secondary300
const FRET_COLOR = colors.palette.neutral400

interface GuitarStringProps {
  offset: number
  index: number
}

interface FretProps {
  offset: number
}

const GuitarString = ({ offset, index }: GuitarStringProps) => {
  let strokeWidth = 5
  if (index > 0) {
    strokeWidth = 6 - index * 0.8
  }

  if (__DEV__) {
    console.tron.log("GuitarString", { index, offset, strokeWidth })
  }

  // TODO: - make the string fade out after the last fret, that migth be a nice effect
  return (
    <Path
      path={Skia.Path.Make().moveTo(offset, 50).lineTo(offset, HEIGHT)}
      color={STRING_COLOR}
      style="stroke"
      strokeWidth={strokeWidth}
    />
  )
}

const Fret = ({ offset }: FretProps) => {
  return (
    <Path
      path={Skia.Path.Make().moveTo(0, offset).lineTo(500, offset)}
      color={FRET_COLOR}
      style="stroke"
      strokeWidth={2}
    />
  )
}

interface NutProps {
  width: number
  verticalOffset: number
}

const Nut = ({ width, verticalOffset }: NutProps) => {
  return (
    <Path
      path={Skia.Path.Make().moveTo(0, verticalOffset).lineTo(width, verticalOffset)}
      color={NUT_COLOR}
      style="stroke"
      strokeWidth={8}
    />
  )
}

export interface NoteProps {
  note: string
  fret: number
  x: number
  y: number
}

interface DotProps {
  cx: number
  cy: number
  color?: string
}

export const Dot = (props: DotProps) => {
  return <Circle {...props} r={28} color={colors.palette.angry500} />
}

export const Note = (props: NoteProps) => {
  return <Text text={props.note} x={props.x} y={props.y} color={colors.palette.angry500} />
}

export const FretboardPosition = () => {
  const { themed } = useAppTheme()
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = (exactWidth * 1.1) / STRINGS.length

  return (
    <Canvas style={[themed($canvas), { width: exactWidth }]}>
      <Nut width={exactWidth} verticalOffset={46} />

      <Group transform={[{ translateY: 20 }]}>
        <Fret offset={100} />
        <Fret offset={200} />
        <Fret offset={300} />
        <Fret offset={400} />
      </Group>
      <Group transform={[{ translateX: 12 }]}>
        {STRINGS.map((_, index) => (
          <GuitarString key={index} offset={stringSpacing * index} index={index + 1} />
        ))}
      </Group>
      <Dot cx={330} cy={50} />
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
