import { Path, Skia } from "@shopify/react-native-skia"

interface NutProps {
  width: number
  verticalOffset: number
  color: string
}

export const Nut = ({ width, verticalOffset, color }: NutProps) => {
  return (
    <Path
      path={Skia.Path.Make().moveTo(0, verticalOffset).lineTo(width, verticalOffset)}
      color={color}
      style="stroke"
      strokeWidth={8}
    />
  )
}
