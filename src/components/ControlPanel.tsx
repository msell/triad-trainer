import { FC, Dispatch, SetStateAction } from "react"
import { View, StyleSheet, ScrollView, useColorScheme } from "react-native"
import { Button, Text, Switch } from "@/components"
import { colors, colorsDark } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { NoteDisplay } from "@/app"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Picker from "react-native-dropdown-picker"
import { useAppTheme } from "@/utils/useAppTheme"

interface ControlPanelProps {
  selectedNote: string
  selectedChordType: ChordType
  chordTypes: ChordType[]
  setSelectedChordType: Dispatch<SetStateAction<ChordType>>
  setChordTypes: Dispatch<SetStateAction<ChordType[]>>
  openChordTypeDD: boolean
  setOpenChordTypeDD: Dispatch<SetStateAction<boolean>>
  inversion: Inversion
  setInversion: Dispatch<SetStateAction<Inversion>>
  selectedStringSet: StringSet
  setSelectedStringSet: Dispatch<SetStateAction<StringSet>>
  noteDisplay: NoteDisplay
  setNoteDisplay: Dispatch<SetStateAction<NoteDisplay>>
  pulseRoot: boolean
  setPulseRoot: Dispatch<SetStateAction<boolean>>
  onNotePress: () => void
  onSnapshot: () => void
}

const ControlPanel: FC<ControlPanelProps> = ({
  selectedNote,
  selectedChordType,
  chordTypes,
  setSelectedChordType,
  setChordTypes,
  openChordTypeDD,
  setOpenChordTypeDD,
  inversion,
  setInversion,
  selectedStringSet,
  setSelectedStringSet,
  noteDisplay,
  setNoteDisplay,
  pulseRoot,
  setPulseRoot,
  onNotePress,
  onSnapshot,
}) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const { theme } = useAppTheme()

  // Select the appropriate color palette based on the theme
  const palette = isDarkMode ? colorsDark.palette : colors.palette

  // Define high contrast colors for dark mode
  const buttonBgColor = isDarkMode ? palette.neutral300 : palette.neutral100
  const buttonBorderColor = isDarkMode ? palette.secondary200 : palette.secondary300
  const selectedBgColor = isDarkMode ? palette.secondary200 : palette.secondary500
  const selectedTextColor = isDarkMode ? palette.neutral900 : palette.neutral100
  const textColor = isDarkMode ? palette.neutral900 : palette.secondary500
  const containerBgColor = isDarkMode ? palette.neutral400 : palette.neutral200
  const iconColor = isDarkMode ? palette.secondary200 : palette.secondary400

  return (
    <View style={[styles.container, { backgroundColor: containerBgColor }]}>
      {/* Top row with chord selection and camera button */}
      <View style={styles.topRow}>
        <Button
          preset="default"
          style={[styles.noteButton, { backgroundColor: selectedBgColor }]}
          textStyle={[styles.noteButtonText, { color: selectedTextColor }]}
          onPress={onNotePress}
        >
          {selectedNote}
        </Button>
        <View style={styles.pickerContainer}>
          <Picker
            open={openChordTypeDD}
            setOpen={setOpenChordTypeDD}
            value={selectedChordType}
            items={chordTypes.map((chordType) => ({ label: chordType, value: chordType }))}
            setValue={setSelectedChordType}
            setItems={setChordTypes}
            style={[
              styles.picker,
              { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
            ]}
            labelStyle={[styles.pickerLabel, { color: textColor }]}
            dropDownContainerStyle={[
              styles.dropDownContainer,
              { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
            ]}
            textStyle={{ color: textColor }}
          />
        </View>
        <Button
          preset="default"
          style={[
            styles.cameraButton,
            { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
          ]}
          onPress={onSnapshot}
        >
          <MaterialIcons name="photo-camera" color={iconColor} size={24} />
        </Button>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Inversion controls */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Inversion</Text>
          <View style={styles.buttonRow}>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                inversion === "root" ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={inversion === "root" ? { color: selectedTextColor } : { color: textColor }}
              preset="default"
              onPress={() => setInversion("root")}
            >
              Root
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                inversion === "first" ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                inversion === "first" ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setInversion("first")}
            >
              1st
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                inversion === "second" ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                inversion === "second" ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setInversion("second")}
            >
              2nd
            </Button>
          </View>
        </View>

        {/* String Set controls */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>String Set</Text>
          <View style={styles.buttonRow}>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                selectedStringSet === 4 ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                selectedStringSet === 4 ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setSelectedStringSet(4)}
            >
              4
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                selectedStringSet === 3 ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                selectedStringSet === 3 ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setSelectedStringSet(3)}
            >
              3
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                selectedStringSet === 2 ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                selectedStringSet === 2 ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setSelectedStringSet(2)}
            >
              2
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                selectedStringSet === 1 ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                selectedStringSet === 1 ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setSelectedStringSet(1)}
            >
              1
            </Button>
          </View>
        </View>

        {/* Note Display controls */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Note Display</Text>
          <View style={styles.buttonRow}>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                noteDisplay === "scaleDegree" ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                noteDisplay === "scaleDegree" ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setNoteDisplay("scaleDegree")}
            >
              Scale Degree
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                noteDisplay === "noteName" ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                noteDisplay === "noteName" ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setNoteDisplay("noteName")}
            >
              Note
            </Button>
            <Button
              style={[
                styles.button,
                { backgroundColor: buttonBgColor, borderColor: buttonBorderColor },
                noteDisplay === "none" ? { backgroundColor: selectedBgColor } : {},
              ]}
              textStyle={
                noteDisplay === "none" ? { color: selectedTextColor } : { color: textColor }
              }
              preset="default"
              onPress={() => setNoteDisplay("none")}
            >
              None
            </Button>
          </View>
        </View>

        {/* Pulse Root toggle */}
        <View style={styles.switchRow}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Pulse Root</Text>
          <Switch value={pulseRoot} onValueChange={setPulseRoot} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    width: "100%",
  },
  cameraButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dropDownContainer: {
    borderWidth: 1,
  },
  noteButton: {
    alignItems: "center",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    width: 60,
  },
  noteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
  },
  pickerContainer: {
    flex: 1,
    zIndex: 1000,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContainer: {
    maxHeight: 320,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
})

export default ControlPanel
