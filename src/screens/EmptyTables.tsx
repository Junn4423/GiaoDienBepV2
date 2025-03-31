"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import ItemList, { type Item } from "../components/ItemList"
import TableGrid, { type Table } from "../components/TableGrid"
import AreaTabs from "../components/AreaTabs"
import { generateMockItems, generateMockTables, getPendingItems, getTablesByStatus } from "../data/mockData"

type RootStackParamList = {
  EmptyTables: { area: "kitchen" | "bar" }
}

type EmptyTablesScreenRouteProp = RouteProp<RootStackParamList, "EmptyTables">

const EmptyTablesScreen: React.FC = () => {
  const route = useRoute<EmptyTablesScreenRouteProp>()
  const { area } = route.params

  const [pendingItems, setPendingItems] = useState<Item[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [selectedArea, setSelectedArea] = useState<"inside" | "outside">("inside")

  useEffect(() => {
    // Lấy dữ liệu mẫu
    const allItems = generateMockItems(area)
    const allTables = generateMockTables()

    // Lọc các món chưa hoàn thành
    const pending = getPendingItems(allItems)
    setPendingItems(pending)

    // Lọc các bàn trống
    const emptyTables = getTablesByStatus(allTables, "empty")
    setTables(emptyTables)
  }, [area])

  const handleCompleteItem = (itemId: string) => {
    setPendingItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, isCompleted: true } : item))
        .filter((item) => !item.isCompleted),
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pendingItemsContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{area === "kitchen" ? "Món ăn chờ làm" : "Đồ uống chờ làm"}</Text>
          <Text style={styles.itemCount}>{pendingItems.length} món</Text>
        </View>

        <ItemList items={pendingItems} onCompleteItem={handleCompleteItem} />
      </View>

      <AreaTabs selectedArea={selectedArea} onSelectArea={setSelectedArea} />

      <View style={styles.tablesContainer}>
        <TableGrid
          tables={tables}
          onSelectTable={() => {}} // Bàn trống không có hành động khi chọn
          selectedArea={selectedArea}
        />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemCount: {
    fontSize: 14,
    color: "#5c6bc0",
    fontWeight: "bold",
  },
  pendingItemsContainer: {
    height: "30%",
  },
  tablesContainer: {
    flex: 1,
  },
})

export default EmptyTablesScreen

