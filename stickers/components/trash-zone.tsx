import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function TrashZone({ visible }: { visible: boolean }) {
  return (
    <View
      pointerEvents="none"
      style={[styles.trash, { opacity: visible ? 1 : 0 }]}
    >
      <Ionicons name="trash-outline" size={26} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  trash: {
    position: "absolute",
    top: 40,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 999,
  },
});
