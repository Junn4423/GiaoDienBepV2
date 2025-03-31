"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import ItemList, { type Item } from "../components/ItemList"
import TableGrid, { type Table } from "../components/TableGrid"
import AreaTabs from "../components/AreaTabs"
import ItemDetailModal from "../components/ItemDetailModal"
import {
  generateMockItems,
  generateMockTables,
  getPendingItems,
  getItemsByTable,
  getTablesByStatus,
} from "../data/mockData"

type RootStackParamList = {
  OccupiedTables: { area: "kitchen" | "bar" }
}

type OccupiedTablesScreenRouteProp = RouteProp<RootStackParamList, "OccupiedTables">

const OccupiedTablesScreen: React.FC = () => {
  const route = useRoute<OccupiedTablesScreenRouteProp>()
  const { area } = route.params

  const [pendingItems, setPendingItems] = useState<Item[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [selectedArea, setSelectedArea] = useState<"inside" | "outside">("inside")
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
  const [selectedTableItems, setSelectedTableItems] = useState<Item[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    // Lấy dữ liệu mẫu
    const allItems = generateMockItems(area)
    const allTables = generateMockTables()

    // Lọc các món chưa hoàn thành
    const pending = getPendingItems(allItems)
    setPendingItems(pending)

    // Lọc các bàn có khách
    const occupiedTables = getTablesByStatus(allTables, "occupied")
    setTables(occupiedTables)
  }, [area])

  const handleSelectTable = (tableId: string) => {
    const tableItems = getItemsByTable(pendingItems, tableId)
    const selectedTable = tables.find((table) => table.id === tableId)

    if (selectedTable && tableItems.length > 0) {
      setSelectedTableId(tableId)
      setSelectedTableItems(tableItems)
      setModalVisible(true)
    }
  }

  const handleCompleteItems = (itemIds: string[]) => {
    setPendingItems((prevItems) =>
      prevItems
        .map((item) => (itemIds.includes(item.id) ? { ...item, isCompleted: true } : item))
        .filter((item) => !item.isCompleted),
    )

    setModalVisible(false)
  }

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
        <TableGrid tables={tables} onSelectTable={handleSelectTable} selectedArea={selectedArea} />
      </View>

      <ItemDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tableName={tables.find((t) => t.id === selectedTableId)?.name || ""}
        items={selectedTableItems}
        onCompleteItems={handleCompleteItems}
      />
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

export default OccupiedTablesScreen

