import { Screen } from "@/components"
import { FretboardPosition } from "@/components/FretboardPosition"
import { GradientBackground } from "@/components/GradientBackground"
import { InlineControlPanel, NoteDisplay } from "@/components/InlineControlPanel"
import { $styles } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { getTriads } from "@/utils/getTriads"
import { makeImageFromView } from "@shopify/react-native-skia"
import { Audio } from "expo-av"
import { File, Paths } from "expo-file-system/next"
import * as MediaLibrary from "expo-media-library"
import { useRef, useState } from "react"
import { Platform, View, ViewStyle, Dimensions } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

const CONTROLS_HEIGHT = 240

export default function TriadScreen() {
  const ref = useRef<View>(null)
  const insets = useSafeAreaInsets()
  const [selectedChordType, setSelectedChordType] = useState<ChordType>("major")
  const [inversion, setInversion] = useState<Inversion>("root")
  const [noteDisplay, setNoteDisplay] = useState<NoteDisplay>("scaleDegree")
  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>(1)
  const [selectedNote, setSelectedNote] = useState<string>("A")
  const [pulseRoot, setPulseRoot] = useState(true)

  const windowHeight = Dimensions.get("window").height
  const fretboardHeight = Math.min(
    440,
    windowHeight - insets.top - insets.bottom - CONTROLS_HEIGHT,
  )

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/camera-shutter.wav"),
    )
    await sound.playAsync()
  }

  const onSnapshot = async () => {
    if (ref.current) {
      try {
        const { status } = Platform.OS === "ios"
          ? await MediaLibrary.requestPermissionsAsync(true, ["photo"])
          : await MediaLibrary.requestPermissionsAsync()
        if (status !== "granted") {
          throw new Error("Permission to access media library was denied")
        }
        const snapshot = await makeImageFromView(ref)
        const base64Image = snapshot?.encodeToBase64()
        if (base64Image) {
          const file = new File(Paths.cache, `temp_image_${Date.now()}.png`)
          file.write(base64Image, { encoding: "base64" })
          await MediaLibrary.createAssetAsync(file.uri)
          playSound()
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Image saved to camera roll",
          })
          file.delete()
        }
      } catch (error) {
        if (__DEV__) {
          console.warn("Snapshot error:", error)
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save image",
        })
      }
    }
  }

  const notes = getTriads({
    chord: selectedNote,
    chordType: selectedChordType,
    inversion,
    stringSet: selectedStringSet,
    minFret: 1,
  })?.notes ?? []

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <GradientBackground />
      <GestureHandlerRootView style={$container}>
        <View style={$fretboardContainer}>
          <View ref={ref} collapsable={false} style={$fretboardInner}>
            <FretboardPosition
              height={fretboardHeight}
              noteDisplay={noteDisplay}
              pulseRoot={pulseRoot}
              notes={notes}
              stringset={selectedStringSet}
            />
          </View>
        </View>
        <InlineControlPanel
          selectedNote={selectedNote}
          onNoteSelect={setSelectedNote}
          selectedChordType={selectedChordType}
          onChordTypeSelect={setSelectedChordType}
          inversion={inversion}
          setInversion={setInversion}
          selectedStringSet={selectedStringSet}
          setSelectedStringSet={setSelectedStringSet}
          noteDisplay={noteDisplay}
          setNoteDisplay={setNoteDisplay}
          pulseRoot={pulseRoot}
          setPulseRoot={setPulseRoot}
          onSnapshot={onSnapshot}
          bottomInset={insets.bottom}
        />
        <Toast position="bottom" />
      </GestureHandlerRootView>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent",
}

const $fretboardContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $fretboardInner: ViewStyle = {
  alignItems: "center",
}
