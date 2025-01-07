import { Modal, View, Pressable, ViewStyle, TextStyle } from "react-native"
import { PropsWithChildren } from "react"
import { Text } from "@/components"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

type Props = PropsWithChildren<{
  isVisible: boolean
  onClose: () => void
  title?: string
}>

export default function BottomModal({ isVisible, children, onClose, title }: Props) {
  const { themed } = useAppTheme()
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={themed($modalContent)}>
        <View style={themed($titleContainer)}>
          <Text style={themed($title)}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const $modalContent: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral600,
  borderTopLeftRadius: spacing.md,
  borderTopRightRadius: spacing.md,
  bottom: 0,
  height: "25%",
  position: "absolute",
  width: "100%",
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontWeight: "bold",
  fontSize: 16,
})

const $titleContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  backgroundColor: colors.palette.neutral600,
  borderTopLeftRadius: spacing.md,
  borderTopRightRadius: spacing.md,
  flexDirection: "row",
  height: "16%",
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
})
