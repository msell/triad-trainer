import { Text, useFont } from "@shopify/react-native-skia"

interface Props {
  x: number
  y: number
  text: string
  color?: string
  fontSize?: number
}

export const SkiaText = ({ x, y, text, fontSize = 16, color = "#fff" }: Props) => {
  const font = useFont(require("../../assets/fonts/LilitaOne-Regular.ttf"), fontSize)
  return <Text x={x - 12} y={y + 15} text={text} color={color} font={font} />
}
