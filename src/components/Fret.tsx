import { Path, Skia } from "@shopify/react-native-skia"

interface FretProps {
  offset: number
  color: string
  width: number
}

export const Fret = ({ offset, color, width }: FretProps) => {
  return (
    <Path
      path={Skia.Path.Make().moveTo(0, offset).lineTo(width, offset)}
      color={color}
      style="stroke"
      strokeWidth={2}
    />
  )
}
