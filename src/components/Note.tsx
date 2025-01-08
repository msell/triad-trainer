import { colors } from "@/theme"
import { Circle, Group, Text, useFont } from "@shopify/react-native-skia"
import { useEffect } from "react"
import { useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

interface NoteProps {
  x: number
  y: number
  text: string
  pulse?: boolean
}

export const Note = ({ x, y, text, pulse }: NoteProps) => {
  const outerRadius = useSharedValue(28)
  const borderColor = pulse ? colors.palette.secondary200 : colors.palette.secondary500
  useEffect(() => {
    if (pulse) {
      outerRadius.value = withRepeat(withTiming(31, { duration: 800 }), -1, true)
    }
  }, [pulse, outerRadius])
  const font = useFont(require("../../assets/fonts/LilitaOne-Regular.ttf"), 30)

  const metrics = font?.measureText(text) ?? { width: 0, height: 0 }

  return (
    <Group>
      {pulse && <Circle cx={x} cy={y} r={outerRadius} color={borderColor} />}
      <Circle cx={x} cy={y} r={25} color={colors.palette.secondary500} />
      <Text
        x={x - metrics.width / 2}
        y={y + metrics.height / 3}
        text={text}
        color={"#fff"}
        font={font}
      />
    </Group>
  )
}
