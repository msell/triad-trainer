/* eslint-disable react-native/no-inline-styles */
import { Button, Screen, Text } from "@/components"
import { Triad } from "@/components/Triad"
import { $styles, ThemedStyle, typography } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { useAppTheme } from "@/utils/useAppTheme"

import { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import Picker from "react-native-dropdown-picker"
import { chromaticScale } from "@/constants"
export default function WelcomeScreen() {
  const { themed } = useAppTheme()
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

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($container)}>
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
                fontFamily: typography.fun.normal,
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
                fontFamily: typography.fun.normal,
              }}
            />
          </View>
        </View>
        <Triad
          chord={selectedNote}
          chordType={selectedChordType}
          inversion={inversion}
          stringSet={selectedStringSet}
        />
        <View style={themed($buttonStack)}>
          <Text>Inversion</Text>
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
        <View style={themed($buttonStack)}>
          <Text>String Set</Text>
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

const $container: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
  flexBasis: "70%",
  alignItems: "center",
  justifyContent: "center",
})

const $row: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  width: "90%",
  columnGap: 10,
  marginBottom: 10,
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
  marginTop: spacing.sm,
  width: "90%",
  alignItems: "center",
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
