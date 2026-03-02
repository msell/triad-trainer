import { ChipGroup } from "@/components/ChipGroup"
import { NoteChipRow } from "@/components/NoteChipRow"
import { SegmentedControl } from "@/components/SegmentedControl"
import { typography } from "@/theme"
import { ChordType, Inversion, StringSet } from "@/types"
import { MaterialIcons } from "@expo/vector-icons"
import { Dispatch, SetStateAction } from "react"
import { Pressable, ScrollView, View, ViewStyle, TextStyle, Text } from "react-native"

export type NoteDisplay = "none" | "scaleDegree" | "noteName"

interface Props {
  selectedNote: string
  onNoteSelect: (note: string) => void
  selectedChordType: ChordType
  onChordTypeSelect: (chordType: ChordType) => void
  inversion: Inversion
  setInversion: Dispatch<SetStateAction<Inversion>>
  selectedStringSet: StringSet
  setSelectedStringSet: Dispatch<SetStateAction<StringSet>>
  noteDisplay: NoteDisplay
  setNoteDisplay: Dispatch<SetStateAction<NoteDisplay>>
  pulseRoot: boolean
  setPulseRoot: Dispatch<SetStateAction<boolean>>
  onSnapshot: () => void
  bottomInset: number
}

const CHORD_TYPE_OPTIONS = [
  { label: "Maj", value: "major" as ChordType },
  { label: "Min", value: "minor" as ChordType },
  { label: "Dim", value: "diminished" as ChordType },
  { label: "Aug", value: "augmented" as ChordType },
]

const INVERSION_OPTIONS = [
  { label: "R", value: "root" as Inversion },
  { label: "1st", value: "first" as Inversion },
  { label: "2nd", value: "second" as Inversion },
]

const STRING_SET_OPTIONS = [
  { label: "4", value: 4 as StringSet },
  { label: "3", value: 3 as StringSet },
  { label: "2", value: 2 as StringSet },
  { label: "1", value: 1 as StringSet },
]

const NOTE_DISPLAY_OPTIONS = [
  { label: "Deg", value: "scaleDegree" as NoteDisplay },
  { label: "Note", value: "noteName" as NoteDisplay },
  { label: "None", value: "none" as NoteDisplay },
]

export const InlineControlPanel = ({
  selectedNote,
  onNoteSelect,
  selectedChordType,
  onChordTypeSelect,
  inversion,
  setInversion,
  selectedStringSet,
  setSelectedStringSet,
  noteDisplay,
  setNoteDisplay,
  pulseRoot,
  setPulseRoot,
  onSnapshot,
  bottomInset,
}: Props) => {
  return (
    <ScrollView
      style={$container}
      contentContainerStyle={{ paddingBottom: bottomInset + 8 }}
      showsVerticalScrollIndicator={false}
    >
      <NoteChipRow selectedNote={selectedNote} onNoteSelect={onNoteSelect} />

      <View style={$padded}>
        <SegmentedControl
          options={CHORD_TYPE_OPTIONS}
          selected={selectedChordType}
          onSelect={onChordTypeSelect}
        />

        <View style={$splitRow}>
          <ChipGroup
            label="INVERSION"
            options={INVERSION_OPTIONS}
            selected={inversion}
            onSelect={(v) => setInversion(v as Inversion)}
          />
          <View style={$splitDivider} />
          <ChipGroup
            label="STRINGS"
            options={STRING_SET_OPTIONS}
            selected={selectedStringSet}
            onSelect={(v) => setSelectedStringSet(v as StringSet)}
          />
        </View>

        <View style={$splitRow}>
          <ChipGroup
            label="DISPLAY"
            options={NOTE_DISPLAY_OPTIONS}
            selected={noteDisplay}
            onSelect={(v) => setNoteDisplay(v as NoteDisplay)}
          />
          <View style={$splitDivider} />
          <View style={$actionGroup}>
            <Text style={$actionLabel}>ACTIONS</Text>
            <View style={$actionRow}>
              <Pressable
                style={[$actionChip, pulseRoot ? $actionChipActive : $actionChipInactive]}
                onPress={() => setPulseRoot((p) => !p)}
              >
                <Text style={[
                  $actionChipText,
                  pulseRoot ? $actionChipTextActive : $actionChipTextInactive,
                ]}>
                  Pulse
                </Text>
              </Pressable>
              <Pressable style={[$actionChip, $actionChipInactive]} onPress={onSnapshot}>
                <MaterialIcons name="photo-camera" size={16} color="#BCC0D6" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const $container: ViewStyle = {
  flexGrow: 0,
  backgroundColor: "rgba(20,18,40,0.6)",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  paddingTop: 14,
  gap: 12,
}

const $padded: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 4,
  gap: 12,
}

const $splitRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
}

const $splitDivider: ViewStyle = {
  width: 16,
}

const $actionGroup: ViewStyle = {
  flex: 1,
}

const $actionLabel: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 11,
  color: "#9196B9",
  textTransform: "uppercase",
  letterSpacing: 1.5,
  marginBottom: 6,
}

const $actionRow: ViewStyle = {
  flexDirection: "row",
  gap: 6,
}

const $actionChip: ViewStyle = {
  flex: 1,
  height: 32,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
}

const $actionChipActive: ViewStyle = {
  backgroundColor: "#41476E",
}

const $actionChipInactive: ViewStyle = {
  backgroundColor: "rgba(255,255,255,0.08)",
}

const $actionChipText: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 13,
}

const $actionChipTextActive: TextStyle = {
  color: "#FFFFFF",
}

const $actionChipTextInactive: TextStyle = {
  color: "#BCC0D6",
}
