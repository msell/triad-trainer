import { View, StyleSheet, ViewStyle, Dimensions } from "react-native"
import { Canvas, Circle, Group, Path, Skia } from "@shopify/react-native-skia"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, ThemedStyle } from "@/theme"

const STRINGS = [1, 2, 3, 4, 5, 6]
const FRETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const HEIGHT = 500
const NUT_COLOR = colors.palette.secondary400
const STRING_COLOR = colors.palette.secondary300

const FRET_WIDTH = 12

interface GuitarStringProps {
  offset: number
}

const GuitarString = ({ offset }: GuitarStringProps) => {
  return (
    <Path
      path={Skia.Path.Make().moveTo(offset, 50).lineTo(offset, HEIGHT)}
      color={STRING_COLOR}
      style="stroke"
      strokeWidth={4}
    />
  )
}

export const FretboardPosition = () => {
  const { themed } = useAppTheme()
  const screenWidth = Dimensions.get("window").width
  const exactWidth = screenWidth * 0.9
  const stringSpacing = exactWidth / (STRINGS.length + 1)
  const startOffset = stringSpacing / 2
  return (
    <Canvas style={[themed($canvas), { width: exactWidth }]}>
      <Path
        path={Skia.Path.Make()
          .moveTo(0, 44)
          .lineTo(exactWidth * 1.1, 44)}
        color={NUT_COLOR}
        style="stroke"
        strokeWidth={12}
      />

      <Group transform={[{ translateX: startOffset }]}>
        {STRINGS.map((_, index) => (
          <GuitarString key={index} offset={startOffset + stringSpacing * index} />
        ))}
      </Group>
    </Canvas>
  )
}
const $canvas: ThemedStyle<ViewStyle> = () => ({
  width: "95%",
  maxWidth: 400,
  height: HEIGHT,
  backgroundColor: colors.palette.neutral300,
})
