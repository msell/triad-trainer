/* eslint-disable react-native/no-inline-styles */
import { Button, Screen, Text } from "@/components"
import { $styles, colors, ThemedStyle } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { useAppTheme } from "@/utils/useAppTheme"
import * as MediaLibrary from "expo-media-library"
import { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Picker from "react-native-dropdown-picker"
import { chromaticScale } from "@/constants"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { getTriads } from "@/utils/getTriads"
import { FretboardPosition } from "@/components/FretboardPosition"
import { useCanvasRef } from "@shopify/react-native-skia"
import * as FileSystem from "expo-file-system"

export default function TriadScreen() {
  const { themed } = useAppTheme()
  const canvasRef = useCanvasRef()
  const [openChordTypeDD, setOpenChordTypeDD] = useState(false)
  const [openNote, setOpenNote] = useState(false)
  const [selectedChordType, setSelectedChordType] = useState<ChordType>("major")
  const [inversion, setInversion] = useState<Inversion>("root")

  const [chordTypes, setChordTypes] = useState<ChordType[]>([
    "major",
    "minor",
    "diminished",
    "augmented",
  ])

  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>(1)
  const [notes, setNotes] = useState<string[]>(chromaticScale)
  const [selectedNote, setSelectedNote] = useState<string>("A")

  const onSnapshot = async () => {
    if (canvasRef.current) {
      try {
        const snapshot = canvasRef.current?.makeImageSnapshot()
        const pngData = snapshot?.encodeToBytes()
        if (pngData) {
          // Create a file path in the app's temporary directory
          const filePath = `${FileSystem.cacheDirectory}snapshot.png`

          if (__DEV__) {
            console.tron.log(filePath)
          }
          // Write the PNG data to the file
          await FileSystem.writeAsStringAsync(filePath, Buffer.from(pngData).toString("base64"), {
            encoding: FileSystem.EncodingType.Base64,
          })

          if (__DEV__) {
            console.tron.log(`File saved to ${filePath}`)
          }

          // Use MediaLibrary to create an asset
          await MediaLibrary.createAssetAsync(filePath)
        } else {
          console.error("Failed to encode PNG data")
        }
      } catch (error) {
        if (__DEV__) {
          console.tron.log("error")
          console.tron.log(error)
        }
      }
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($container)}>
        <View style={{ height: 500 }}>
          <FretboardPosition
            ref={canvasRef}
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

        <View style={themed($buttonStack)}>
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
              <MaterialIcons name="camera" color={colors.palette.secondary400} size={22} />
            </Button>
          </View>
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
                style={[themed($button), inversion === "first" ? themed($selectedButton) : {}]}
                textStyle={inversion === "first" ? themed($selectedButtonText) : {}}
                preset="default"
                onPress={() => {
                  setInversion("first")
                }}
              >
                1st
              </Button>
              <Button
                style={[themed($button), inversion === "second" ? themed($selectedButton) : {}]}
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
              style={[themed($button), selectedStringSet === 4 ? themed($selectedButton) : {}]}
              textStyle={[selectedStringSet === 4 ? themed($selectedButtonText) : {}]}
              preset="default"
              onPress={() => {
                setSelectedStringSet(4)
              }}
            >
              4
            </Button>
            <Button
              style={[themed($button), selectedStringSet === 3 ? themed($selectedButton) : {}]}
              textStyle={selectedStringSet === 3 ? themed($selectedButtonText) : {}}
              preset="default"
              onPress={() => {
                setSelectedStringSet(3)
              }}
            >
              3
            </Button>
            <Button
              style={[themed($button), selectedStringSet === 2 ? themed($selectedButton) : {}]}
              textStyle={selectedStringSet === 2 ? themed($selectedButtonText) : {}}
              preset="default"
              onPress={() => {
                setSelectedStringSet(2)
              }}
            >
              2
            </Button>
            <Button
              style={[themed($button), selectedStringSet === 1 ? themed($selectedButton) : {}]}
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
      </View>
    </Screen>
  )
}

const $label: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
  fontWeight: "bold",
  color: colors.palette.secondary500,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
  flexBasis: "70%",
  alignItems: "center",
  justifyContent: "center",
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
