import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle, View } from "react-native"
import { Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"

import { useAppTheme } from "@/utils/useAppTheme"
import { Triad } from "@/components/Triad"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const { themed } = useAppTheme()
  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($container)}>
        <Triad chord="C" chordType="major" inversion="firstInversion" stringset="2" />
      </View>
    </Screen>
  )
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
  flexBasis: "70%",
  alignItems: "center",
  justifyContent: "center",
})
