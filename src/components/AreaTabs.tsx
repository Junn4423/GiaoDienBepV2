import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

interface AreaTabsProps {
  selectedArea: "inside" | "outside"
  onSelectArea: (area: "inside" | "outside") => void
}

const AreaTabs: React.FC<AreaTabsProps> = ({ selectedArea, onSelectArea }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selectedArea === "inside" && styles.selectedTab]}
        onPress={() => onSelectArea("inside")}
      >
        <MaterialIcons name="home" size={16} color={selectedArea === "inside" ? "#fff" : "#666"} />
        <Text style={[styles.tabText, selectedArea === "inside" && styles.selectedTabText]}>Khu Trong</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedArea === "outside" && styles.selectedTab]}
        onPress={() => onSelectArea("outside")}
      >
        <MaterialIcons name="deck" size={16} color={selectedArea === "outside" ? "#fff" : "#666"} />
        <Text style={[styles.tabText, selectedArea === "outside" && styles.selectedTabText]}>Khu Ngoài</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    margin: 8,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  selectedTab: {
    backgroundColor: "#5c6bc0",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  selectedTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default AreaTabs

