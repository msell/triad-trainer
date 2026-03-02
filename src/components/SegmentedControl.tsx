import { Text } from "@/components"
import { typography } from "@/theme"
import { Pressable, View, ViewStyle, TextStyle, LayoutChangeEvent } from "react-native"
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated"
import { useState } from "react"

interface Props<T extends string> {
  options: { label: string; value: T }[]
  selected: T
  onSelect: (value: T) => void
}

export const SegmentedControl = <T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const selectedIndex = options.findIndex((o) => o.value === selected)
  const segmentWidth = containerWidth / options.length

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }

  const $animatedPill = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(selectedIndex * segmentWidth, { damping: 18, stiffness: 200 }) }],
    width: segmentWidth,
  }))

  return (
    <View style={$container} onLayout={onLayout}>
      {containerWidth > 0 && (
        <Animated.View style={[$pill, $animatedPill]} />
      )}
      {options.map((option) => {
        const isSelected = option.value === selected
        return (
          <Pressable
            key={option.value}
            style={$segment}
            onPress={() => onSelect(option.value)}
          >
            <Text style={[
              $segmentText,
              isSelected ? $segmentTextSelected : $segmentTextUnselected,
            ]}>
              {option.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "rgba(255,255,255,0.08)",
  borderRadius: 12,
  height: 36,
  overflow: "hidden",
}

const $pill: ViewStyle = {
  position: "absolute",
  top: 3,
  bottom: 3,
  borderRadius: 9,
  backgroundColor: "#41476E",
  marginHorizontal: 3,
}

const $segment: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}

const $segmentText: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 14,
}

const $segmentTextSelected: TextStyle = {
  color: "#FFFFFF",
}

const $segmentTextUnselected: TextStyle = {
  color: "#BCC0D6",
}
