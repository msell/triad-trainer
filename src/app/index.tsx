/* eslint-disable react-native/no-inline-styles */
import { Button, Screen, Switch, Text } from "@/components"
import { FretboardPosition } from "@/components/FretboardPosition"
import GradientBackground from "@/components/GradientBackground"
import { chromaticScale } from "@/constants"
import { $styles, colors, ThemedStyle } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { getTriads } from "@/utils/getTriads"
import { useAppTheme } from "@/utils/useAppTheme"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { makeImageFromView } from "@shopify/react-native-skia"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { useCallback, useEffect, useRef, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Picker from "react-native-dropdown-picker"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Toast from "react-native-toast-message"

export type NoteDisplay = "none" | "scaleDegree" | "noteName"

export default function TriadScreen() {
  const { themed } = useAppTheme()
  const ref = useRef<View>(null)
  const [openChordTypeDD, setOpenChordTypeDD] = useState(false)
  const [openNote, setOpenNote] = useState(false)
  const [selectedChordType, setSelectedChordType] = useState<ChordType>("major")
  const [inversion, setInversion] = useState<Inversion>("root")
  const [noteDisplay, setNoteDisplay] = useState<NoteDisplay>("scaleDegree")

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  useEffect(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  const [chordTypes, setChordTypes] = useState<ChordType[]>([
    "major",
    "minor",
    "diminished",
    // "augmented",
  ])

  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>(1)
  const [notes, setNotes] = useState<string[]>(chromaticScale)
  const [selectedNote, setSelectedNote] = useState<string>("A")
  const [pulseRoot, setPulseRoot] = useState(true)
  const onSnapshot = async () => {
    if (ref.current) {
      try {
        // const { status } = await MediaLibrary.requestPermissionsAsync()
        // if (status !== "granted") {
        //   throw new Error("Permission to access media library was denied")
        // }
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

  const snapPoints = [330, 450]

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <GradientBackground />
      <GestureHandlerRootView style={themed($bottomSheetContainer)}>
        <View style={themed($container)}>
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
        <Toast position="bottom" />
        <BottomSheetModalProvider>
          <Button onPress={handlePresentModalPress}>Open Controls</Button>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            enablePanDownToClose
          >
            <BottomSheetView style={themed($bottomSheetContentContainer)}>
              <View style={themed($row)}>
                <View style={themed($notePickerWrapper)}>
                  <Picker
                    open={openNote}
                    setOpen={setOpenNote}
                    value={selectedNote}
                    items={notes.map((chord) => ({ label: chord, value: chord }))}
                    setValue={setSelectedNote}
                    setItems={setNotes}
                    labelStyle={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: colors.palette.secondary500,
                    }}
                  />
                </View>
                <View style={[themed($notePickerWrapper), { flexGrow: 1 }]}>
                  <Picker
                    open={openChordTypeDD}
                    setOpen={setOpenChordTypeDD}
                    value={selectedChordType}
                    items={chordTypes.map((chordType) => ({ label: chordType, value: chordType }))}
                    setValue={setSelectedChordType}
                    setItems={setChordTypes}
                    labelStyle={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: colors.palette.secondary500,
                    }}
                  />
                </View>
                <Button preset="default" onPress={onSnapshot}>
                  <MaterialIcons
                    name="photo-camera"
                    color={colors.palette.secondary400}
                    size={22}
                  />
                </Button>
              </View>
              <View style={themed($buttonStack)}>
                <View style={themed($labeledRowContainer)}>
                  <Text style={themed($label)}>Inversion</Text>
                  <View style={themed($buttonRow)}>
                    <Button
                      style={[themed($button), inversion === "root" ? themed($selectedButton) : {}]}
                      textStyle={[inversion === "root" ? themed($selectedButtonText) : {}]}
                      preset="default"
                      onPress={() => {
                        setInversion("root")
                      }}
                    >
                      Root
                    </Button>
                    <Button
                      style={[
                        themed($button),
                        inversion === "first" ? themed($selectedButton) : {},
                      ]}
                      textStyle={inversion === "first" ? themed($selectedButtonText) : {}}
                      preset="default"
                      onPress={() => {
                        setInversion("first")
                      }}
                    >
                      1st
                    </Button>
                    <Button
                      style={[
                        themed($button),
                        inversion === "second" ? themed($selectedButton) : {},
                      ]}
                      textStyle={inversion === "second" ? themed($selectedButtonText) : {}}
                      preset="default"
                      onPress={() => {
                        setInversion("second")
                      }}
                    >
                      2nd
                    </Button>
                  </View>
                </View>
              </View>
              <View style={themed($buttonStack)}>
                <Text style={themed($label)}>String Set</Text>
                <View style={themed($buttonRow)}>
                  <Button
                    style={[
                      themed($button),
                      selectedStringSet === 4 ? themed($selectedButton) : {},
                    ]}
                    textStyle={[selectedStringSet === 4 ? themed($selectedButtonText) : {}]}
                    preset="default"
                    onPress={() => {
                      setSelectedStringSet(4)
                    }}
                  >
                    4
                  </Button>
                  <Button
                    style={[
                      themed($button),
                      selectedStringSet === 3 ? themed($selectedButton) : {},
                    ]}
                    textStyle={selectedStringSet === 3 ? themed($selectedButtonText) : {}}
                    preset="default"
                    onPress={() => {
                      setSelectedStringSet(3)
                    }}
                  >
                    3
                  </Button>
                  <Button
                    style={[
                      themed($button),
                      selectedStringSet === 2 ? themed($selectedButton) : {},
                    ]}
                    textStyle={selectedStringSet === 2 ? themed($selectedButtonText) : {}}
                    preset="default"
                    onPress={() => {
                      setSelectedStringSet(2)
                    }}
                  >
                    2
                  </Button>
                  <Button
                    style={[
                      themed($button),
                      selectedStringSet === 1 ? themed($selectedButton) : {},
                    ]}
                    textStyle={selectedStringSet === 1 ? themed($selectedButtonText) : {}}
                    preset="default"
                    onPress={() => {
                      setSelectedStringSet(1)
                    }}
                  >
                    1
                  </Button>
                </View>
              </View>
              <View style={themed($buttonStack)}>
                <Text style={themed($label)}>Note Display</Text>
                <View style={themed($buttonRow)}>
                  <Button
                    style={[
                      themed($button),
                      noteDisplay === "scaleDegree" ? themed($selectedButton) : {},
                    ]}
                    textStyle={noteDisplay === "scaleDegree" ? themed($selectedButtonText) : {}}
                    preset="default"
                    onPress={() => {
                      setNoteDisplay("scaleDegree")
                    }}
                  >
                    Scale Degree
                  </Button>
                  <Button
                    style={[
                      themed($button),
                      noteDisplay === "noteName" ? themed($selectedButton) : {},
                    ]}
                    textStyle={noteDisplay === "noteName" ? themed($selectedButtonText) : {}}
                    preset="default"
                    onPress={() => {
                      setNoteDisplay("noteName")
                    }}
                  >
                    Note
                  </Button>
                  <Button
                    style={[themed($button), noteDisplay === "none" ? themed($selectedButton) : {}]}
                    textStyle={noteDisplay === "none" ? themed($selectedButtonText) : {}}
                    preset="default"
                    onPress={() => {
                      setNoteDisplay("none")
                    }}
                  >
                    None
                  </Button>
                </View>
                <View style={themed($row)}>
                  <Text style={themed($label)}>Pulse Root</Text>
                  <Switch label="Pulse Root" value={pulseRoot} onValueChange={setPulseRoot} />
                </View>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Screen>
  )
}
const $bottomSheetContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: "transparent",
})

const $bottomSheetContentContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  padding: 36,
  alignItems: "center",
  boxShadow: `0 0 10px ${colors.palette.neutral400}`,
})

const $label: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
  fontWeight: "bold",
  color: colors.palette.secondary500,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
  flexBasis: "70%",
  alignItems: "center",
  marginTop: 100,
})

const $labeledRowContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  columnGap: spacing.xs,
  alignContent: "space-between",
  alignItems: "center",
  marginTop: spacing.xs,
})

const $row: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  columnGap: spacing.xs,
  alignContent: "space-between",
  marginTop: spacing.xs,
  alignItems: "center",
})

const $button: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $selectedButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.secondary500,
})

const $selectedButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $buttonStack: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "90%",
  alignItems: "center",
  marginTop: spacing.sm,
})

const $buttonRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  width: "100%",
  gap: spacing.xs,
  justifyContent: "space-between",
})

const $notePickerWrapper: ThemedStyle<ViewStyle> = () => ({
  flexShrink: 1,
  width: 100,
})
