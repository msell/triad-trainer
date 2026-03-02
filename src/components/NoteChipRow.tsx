import { Text } from "@/components"
import { chromaticScale } from "@/constants"
import { typography } from "@/theme"
import { Pressable, ScrollView, ViewStyle, TextStyle } from "react-native"

interface Props {
  selectedNote: string
  onNoteSelect: (note: string) => void
}

export const NoteChipRow = ({ selectedNote, onNoteSelect }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={$scrollContent}
    >
      {chromaticScale.map((note) => {
        const isSelected = selectedNote === note
        return (
          <Pressable
            key={note}
            style={[$chip, isSelected ? $chipSelected : $chipUnselected]}
            onPress={() => onNoteSelect(note)}
          >
            <Text style={[
              $chipText,
              isSelected ? $chipTextSelected : $chipTextUnselected,
            ]}>
              {note}
            </Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const $scrollContent: ViewStyle = {
  paddingHorizontal: 16,
  gap: 8,
}

const $chip: ViewStyle = {
  width: 42,
  height: 32,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
}

const $chipSelected: ViewStyle = {
  backgroundColor: "#FFBB50",
}

const $chipUnselected: ViewStyle = {
  backgroundColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
}

const $chipText: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 14,
}

const $chipTextSelected: TextStyle = {
  color: "#1E1C32",
}

const $chipTextUnselected: TextStyle = {
  color: "rgba(255,255,255,0.8)",
}
