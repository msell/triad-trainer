import { FC, Dispatch, SetStateAction } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Button, Text, Switch } from "@/components"
import { colors } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { NoteDisplay } from "@/app"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Picker from "react-native-dropdown-picker"

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
  return (
    <View style={styles.container}>
      {/* Top row with chord selection and camera button */}
      <View style={styles.topRow}>
        <Button
          preset="default"
          style={styles.noteButton}
          textStyle={styles.noteButtonText}
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
            style={styles.picker}
            labelStyle={styles.pickerLabel}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>
        <Button preset="default" style={styles.cameraButton} onPress={onSnapshot}>
          <MaterialIcons name="photo-camera" color={colors.palette.secondary400} size={24} />
        </Button>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Inversion controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inversion</Text>
          <View style={styles.buttonRow}>
            <Button
              style={[
                styles.button,
                inversion === "root" ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={inversion === "root" ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setInversion("root")}
            >
              Root
            </Button>
            <Button
              style={[
                styles.button,
                inversion === "first" ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={inversion === "first" ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setInversion("first")}
            >
              1st
            </Button>
            <Button
              style={[
                styles.button,
                inversion === "second" ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={inversion === "second" ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setInversion("second")}
            >
              2nd
            </Button>
          </View>
        </View>

        {/* String Set controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>String Set</Text>
          <View style={styles.buttonRow}>
            <Button
              style={[
                styles.button,
                selectedStringSet === 4 ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={selectedStringSet === 4 ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setSelectedStringSet(4)}
            >
              4
            </Button>
            <Button
              style={[
                styles.button,
                selectedStringSet === 3 ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={selectedStringSet === 3 ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setSelectedStringSet(3)}
            >
              3
            </Button>
            <Button
              style={[
                styles.button,
                selectedStringSet === 2 ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={selectedStringSet === 2 ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setSelectedStringSet(2)}
            >
              2
            </Button>
            <Button
              style={[
                styles.button,
                selectedStringSet === 1 ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={selectedStringSet === 1 ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setSelectedStringSet(1)}
            >
              1
            </Button>
          </View>
        </View>

        {/* Note Display controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Note Display</Text>
          <View style={styles.buttonRow}>
            <Button
              style={[
                styles.button,
                noteDisplay === "scaleDegree"
                  ? { backgroundColor: colors.palette.secondary500 }
                  : {},
              ]}
              textStyle={noteDisplay === "scaleDegree" ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setNoteDisplay("scaleDegree")}
            >
              Scale Degree
            </Button>
            <Button
              style={[
                styles.button,
                noteDisplay === "noteName" ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={noteDisplay === "noteName" ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setNoteDisplay("noteName")}
            >
              Note
            </Button>
            <Button
              style={[
                styles.button,
                noteDisplay === "none" ? { backgroundColor: colors.palette.secondary500 } : {},
              ]}
              textStyle={noteDisplay === "none" ? { color: colors.palette.neutral100 } : {}}
              preset="default"
              onPress={() => setNoteDisplay("none")}
            >
              None
            </Button>
          </View>
        </View>

        {/* Pulse Root toggle */}
        <View style={styles.switchRow}>
          <Text style={styles.sectionTitle}>Pulse Root</Text>
          <Switch value={pulseRoot} onValueChange={setPulseRoot} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.secondary300,
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
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.secondary300,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: colors.palette.neutral800,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dropDownContainer: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.secondary300,
  },
  noteButton: {
    alignItems: "center",
    backgroundColor: colors.palette.secondary500,
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    width: 60,
  },
  noteButtonText: {
    color: colors.palette.neutral100,
    fontSize: 18,
  },
  picker: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.secondary300,
    borderRadius: 8,
    minHeight: 44,
  },
  pickerContainer: {
    flex: 1,
    zIndex: 1000,
  },
  pickerLabel: {
    color: colors.palette.secondary500,
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
    color: colors.palette.secondary500,
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
