import { $styles } from "@/theme"
import { Canvas, Path, Skia } from "@shopify/react-native-skia"

const path = Skia.Path.Make()
path.moveTo(128, 0)
path.lineTo(168, 80)
path.lineTo(256, 93)
path.lineTo(192, 155)
path.lineTo(207, 244)
path.lineTo(128, 202)
path.lineTo(49, 244)
path.lineTo(64, 155)
path.lineTo(0, 93)
path.lineTo(88, 80)
path.lineTo(128, 0)
path.close()

export const Star = () => {
  return (
    <Canvas style={{ width: "70%", height: "70%" }}>
      <Path path={path} color="lightblue" />
    </Canvas>
  )
}
