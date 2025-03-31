import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  Kitchen: undefined
  Bar: undefined
  GroupedItems: { area: "kitchen" | "bar" }
  CompletedItems: { area: "kitchen" | "bar" }
  AllItems: { area: "kitchen" | "bar" }
  OccupiedTables: { area: "kitchen" | "bar" }
  EmptyTables: { area: "kitchen" | "bar" }
  WaitingTables: { area: "kitchen" | "bar" }
}

type NavigationProp = StackNavigationProp<RootStackParamList>

const BarScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>()
  const rootNavigation = useNavigation()

  const navigateToKitchen = () => {
    navigation.navigate("Kitchen")
  }

  const navigateToMainSelection = () => {
    rootNavigation.navigate("MainSelection" as never)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToMainSelection} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Khu vực Bar</Text>
          <TouchableOpacity style={styles.switchButton} onPress={navigateToKitchen}>
            <MaterialIcons name="swap-horiz" size={20} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 4 }}>Về Bếp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("GroupedItems", { area: "bar" })}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="local-bar" size={32} color="#ff7043" />
            </View>
            <Text style={styles.menuText}>Theo nhóm món</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("CompletedItems", { area: "bar" })}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="check-circle" size={32} color="#4caf50" />
            </View>
            <Text style={styles.menuText}>Món xong</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("AllItems", { area: "bar" })}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="view-list" size={32} color="#ff9800" />
            </View>
            <Text style={styles.menuText}>Tất cả</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("OccupiedTables", { area: "bar" })}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="people" size={32} color="#2196f3" />
            </View>
            <Text style={styles.menuText}>Có khách</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("EmptyTables", { area: "bar" })}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="event-seat" size={32} color="#9c27b0" />
            </View>
            <Text style={styles.menuText}>Bàn trống</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("WaitingTables", { area: "bar" })}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="hourglass-top" size={32} color="#f44336" />
            </View>
            <Text style={styles.menuText}>Bàn chờ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Món chờ</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Món xong</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Bàn đang phục vụ</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5c6bc0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  menuItem: {
    width: "33.33%",
    padding: 8,
  },
  menuIcon: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    elevation: 2,
  },
  menuText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    width: "30%",
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff7043",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
})

export default BarScreen

