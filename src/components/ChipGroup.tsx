import { Text } from "@/components"
import { typography } from "@/theme"
import { Pressable, View, ViewStyle, TextStyle } from "react-native"

interface ChipOption<T> {
  label: string
  value: T
}

interface Props<T> {
  label: string
  options: ChipOption<T>[]
  selected: T
  onSelect: (value: T) => void
}

export const ChipGroup = <T extends string | number>({
  label,
  options,
  selected,
  onSelect,
}: Props<T>) => {
  return (
    <View style={$container}>
      <Text style={$label}>{label}</Text>
      <View style={$chipRow}>
        {options.map((option) => {
          const isSelected = option.value === selected
          return (
            <Pressable
              key={String(option.value)}
              style={[$chip, isSelected ? $chipSelected : $chipUnselected]}
              onPress={() => onSelect(option.value)}
            >
              <Text style={[
                $chipText,
                isSelected ? $chipTextSelected : $chipTextUnselected,
              ]}>
                {option.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $label: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 11,
  color: "#9196B9",
  textTransform: "uppercase",
  letterSpacing: 1.5,
  marginBottom: 6,
}

const $chipRow: ViewStyle = {
  flexDirection: "row",
  gap: 6,
}

const $chip: ViewStyle = {
  flex: 1,
  height: 32,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
}

const $chipSelected: ViewStyle = {
  backgroundColor: "#41476E",
}

const $chipUnselected: ViewStyle = {
  backgroundColor: "rgba(255,255,255,0.08)",
}

const $chipText: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 13,
}

const $chipTextSelected: TextStyle = {
  color: "#FFFFFF",
}

const $chipTextUnselected: TextStyle = {
  color: "#BCC0D6",
}
