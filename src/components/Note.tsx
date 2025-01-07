import { colors } from "@/theme"
import { Circle, Group, Text, useFont } from "@shopify/react-native-skia"

interface NoteProps {
  x: number
  y: number
  text: string
}

export const Note = ({ x, y, text }: NoteProps) => {
  const font = useFont(require("../../assets/fonts/LilitaOne-Regular.ttf"), 44)
  return (
    <Group>
      <Circle cx={x} cy={y} r={28} color={colors.palette.secondary500} />
      <Text x={x - 12} y={y + 15} text={text} color={"#fff"} font={font} />
    </Group>
  )
}
