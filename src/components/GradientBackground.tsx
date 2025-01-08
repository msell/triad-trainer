import { LinearGradient } from "expo-linear-gradient"
import { ViewStyle } from "react-native"

export default function GradientBackground() {
  return (
    <LinearGradient
      colors={[
        "#F5F7FE", // Brightest shade
        "#E8EDFD", // Light accent
        "#D7DDFA", // Similar to secondary100
        "#C6CCF7", // Blend
        "#B5BBF4", // Similar to secondary200
        "#A4ABF1", // Lighter accent
        "#939ADE", // Blend
        "#8288CB", // Lighter variant
        "#7176B8", // Blend
        "#6269A5", // Similar to secondary400
        "#545C92", // Blend
        "#4B5280", // Transition color
        "#41476E", // Your secondary500
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
