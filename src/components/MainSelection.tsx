import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  MainSelection: undefined
  SalesArea: undefined
  KitchenBarArea: undefined
}

type NavigationProp = StackNavigationProp<RootStackParamList, "MainSelection">

const MainSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5c6bc0" />

      <View style={styles.header}>
        <Image source={require("../assets/Logo/logo.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>PMBH PhongBep</Text>
        <Text style={styles.headerSubtitle}>Quản lý nhà hàng</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Chọn khu vực làm việc</Text>

        <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate("SalesArea")}>
          <View style={styles.areaIconContainer}>
            <MaterialIcons name="store" size={48} color="#5c6bc0" />
          </View>
          <View style={styles.areaTextContainer}>
            <Text style={styles.areaTitle}>Khu vực Bán Hàng</Text>
            <Text style={styles.areaDescription}>Quản lý đơn hàng, khách hàng, bàn và thanh toán</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate("KitchenBarArea")}>
          <View style={styles.areaIconContainer}>
            <MaterialIcons name="restaurant" size={48} color="#ff7043" />
          </View>
          <View style={styles.areaTextContainer}>
            <Text style={styles.areaTitle}>Khu vực Bếp/Bar</Text>
            <Text style={styles.areaDescription}>Quản lý món ăn, đồ uống và theo dõi trạng thái đơn hàng</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Phiên bản 1.0.0</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#5c6bc0",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  areaButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  areaIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(92, 107, 192, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  areaTextContainer: {
    flex: 1,
  },
  areaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  areaDescription: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
})

export default MainSelection

