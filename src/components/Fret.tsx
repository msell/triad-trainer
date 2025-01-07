import { Path, Skia } from "@shopify/react-native-skia"

interface FretProps {
  offset: number
  color: string
}

export const Fret = ({ offset, color }: FretProps) => {
  return (
    <Path
      path={Skia.Path.Make().moveTo(0, offset).lineTo(500, offset)}
      color={color}
      style="stroke"
      strokeWidth={2}
    />
  )
}
