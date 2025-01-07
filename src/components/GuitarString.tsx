import { Path, Skia } from "@shopify/react-native-skia"

interface GuitarStringProps {
  offset: number
  index: number
  color: string
  height: number
}

export const GuitarString = ({ offset, index, color, height }: GuitarStringProps) => {
  let strokeWidth = 5
  if (index > 0) {
    strokeWidth = 6 - index * 0.8
  }

  // TODO: - make the string fade out after the last fret, that migth be a nice effect
  return (
    <Path
      path={Skia.Path.Make().moveTo(offset, 50).lineTo(offset, height)}
      color={color}
      style="stroke"
      strokeWidth={strokeWidth}
    />
  )
}
