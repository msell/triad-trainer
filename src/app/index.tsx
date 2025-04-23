/* eslint-disable react-native/no-inline-styles */
import { Screen } from "@/components"
import { FretboardPosition } from "@/components/FretboardPosition"
import GradientBackground from "@/components/GradientBackground"
import NoteSelectionModal from "@/components/NoteSelectionModal"
import { $styles, ThemedStyle, colors } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { getTriads } from "@/utils/getTriads"
import { useAppTheme } from "@/utils/useAppTheme"
import { makeImageFromView } from "@shopify/react-native-skia"
import { Audio } from "expo-av"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { useRef, useState, useEffect } from "react"
import { View, ViewStyle, Animated, TouchableOpacity } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Toast from "react-native-toast-message"
import ControlPanel from "@/components/ControlPanel"
import { MaterialIcons } from "@expo/vector-icons"

export type NoteDisplay = "none" | "scaleDegree" | "noteName"

export default function TriadScreen() {
  const { themed } = useAppTheme()
  const ref = useRef<View>(null)
  const [openChordTypeDD, setOpenChordTypeDD] = useState(false)
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false)
  const [selectedChordType, setSelectedChordType] = useState<ChordType>("major")
  const [inversion, setInversion] = useState<Inversion>("root")
  const [noteDisplay, setNoteDisplay] = useState<NoteDisplay>("scaleDegree")
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current

  // Initialize panel as hidden
  useEffect(() => {
    slideAnim.setValue(0)
  }, [slideAnim])

  const togglePanel = () => {
    const toValue = isPanelVisible ? 0 : 1
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setIsPanelVisible(!isPanelVisible)
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/camera-shutter.wav"),
    )

    await sound.playAsync()
  }

  const [chordTypes, setChordTypes] = useState<ChordType[]>([
    "major",
    "minor",
    "diminished",
    "augmented",
  ])

  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>(1)
  const [selectedNote, setSelectedNote] = useState<string>("A")
  const [pulseRoot, setPulseRoot] = useState(true)
  const onSnapshot = async () => {
    if (ref.current) {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync(true, ["photo"])
        if (status !== "granted") {
          throw new Error("Permission to access media library was denied")
        }
        const snapshot = await makeImageFromView(ref)

        const base64Image = snapshot?.encodeToBase64()
        if (base64Image) {
          // Create a file path in the app's temporary directory
          const filePath = `${FileSystem.cacheDirectory}temp_image_${Date.now()}.png`

          if (__DEV__) {
            console.tron.log(filePath)
          }

          // Write the PNG data to the file
          await FileSystem.writeAsStringAsync(filePath, base64Image, {
            encoding: FileSystem.EncodingType.Base64,
          })

          // Use MediaLibrary to create an asset
          await MediaLibrary.createAssetAsync(filePath)

          playSound()
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Image saved to camera roll",
          })
          // Clean up temporary file
          await FileSystem.deleteAsync(filePath)
        } else {
          console.error("Failed to encode PNG data")
        }
      } catch (error) {
        if (__DEV__) {
          console.tron.log(error)
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save image",
        })
      }
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <GradientBackground />
      <GestureHandlerRootView style={themed($container)}>
        <View style={themed($fretboardContainer)}>
          <View ref={ref} collapsable={false}>
            <FretboardPosition
              noteDisplay={noteDisplay}
              pulseRoot={pulseRoot}
              notes={
                getTriads({
                  chord: selectedNote,
                  chordType: selectedChordType,
                  inversion,
                  stringSet: selectedStringSet,
                  minFret: 1,
                })?.notes ?? []
              }
              stringset={selectedStringSet}
            />
          </View>
        </View>
        
        <TouchableOpacity style={themed($toggleButton)} onPress={togglePanel} activeOpacity={0.8}>
          <MaterialIcons
            name={isPanelVisible ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
        
        <Animated.View
          style={[
            themed($controlsContainer),
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ControlPanel
            selectedNote={selectedNote}
            selectedChordType={selectedChordType}
            chordTypes={chordTypes}
            setSelectedChordType={setSelectedChordType}
            setChordTypes={setChordTypes}
            openChordTypeDD={openChordTypeDD}
            setOpenChordTypeDD={setOpenChordTypeDD}
            inversion={inversion}
            setInversion={setInversion}
            selectedStringSet={selectedStringSet}
            setSelectedStringSet={setSelectedStringSet}
            noteDisplay={noteDisplay}
            setNoteDisplay={setNoteDisplay}
            pulseRoot={pulseRoot}
            setPulseRoot={setPulseRoot}
            onNotePress={() => setIsNoteModalVisible(true)}
            onSnapshot={onSnapshot}
          />
        </Animated.View>
        <Toast position="bottom" />
      </GestureHandlerRootView>
      <NoteSelectionModal
        isVisible={isNoteModalVisible}
        onClose={() => setIsNoteModalVisible(false)}
        selectedNote={selectedNote}
        onNoteSelect={setSelectedNote}
      />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: "transparent",
})

const $fretboardContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 40,
  paddingBottom: 50, 
})

const $controlsContainer: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  position: "absolute",
  bottom: 0,
  zIndex: 100,
})

const $toggleButton: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  bottom: 35, // Move the toggle button up by 35 pixels
  alignSelf: "center",
  backgroundColor: colors.palette.secondary500,
  width: 60,
  height: 35,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 101,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 5,
})
