import { Text } from "@/components"
import { chromaticScale } from "@/constants"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { PropsWithChildren } from "react"
import { Modal, Pressable, TextStyle, View, ViewStyle } from "react-native"

type Props = PropsWithChildren<{
  isVisible: boolean
  onClose: () => void
  selectedNote: string
  onNoteSelect: (note: string) => void
}>

export default function NoteSelectionModal({
  isVisible,
  onClose,
  selectedNote,
  onNoteSelect,
}: Props) {
  const { themed } = useAppTheme()

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={themed($modalOverlay)}>
        <View style={themed($modalContent)}>
          <View style={themed($titleContainer)}>
            <Text style={themed($title)}>Select Note</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          <View style={themed($notesGrid)}>
            {chromaticScale.map((note) => (
              <Pressable
                key={note}
                style={[themed($noteButton), selectedNote === note && themed($selectedNoteButton)]}
                onPress={() => {
                  onNoteSelect(note)
                  onClose()
                }}
              >
                <Text
                  style={[themed($noteText), selectedNote === note && themed($selectedNoteText)]}
                >
                  {note}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const $modalOverlay: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
})

const $modalContent: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral800,
  width: "100%",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 10,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontWeight: "bold",
  fontSize: 20,
})

const $titleContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  backgroundColor: colors.palette.neutral700,
  flexDirection: "row",
  height: 60,
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
})

const $notesGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
  padding: spacing.md,
})

const $noteButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  backgroundColor: colors.palette.neutral700,
  borderRadius: spacing.sm,
  height: 60,
  justifyContent: "center",
  width: "30%",
})

const $selectedNoteButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.secondary500,
})

const $noteText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 24,
  fontWeight: "bold",
})

const $selectedNoteText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})
