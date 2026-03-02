import { LinearGradient } from "expo-linear-gradient"
import { ViewStyle } from "react-native"

export const GradientBackground = () => {
  return (
    <LinearGradient
      colors={["#1E1C32", "#232140", "#2A2D4A", "#343859", "#41476E"]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={$background}
    />
  )
}

const $background: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}
