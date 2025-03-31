"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import ItemList, { type Item } from "../components/ItemList"
import { generateMockItems, getCompletedItems } from "../data/mockData"

type RootStackParamList = {
  CompletedItems: { area: "kitchen" | "bar" }
}

type CompletedItemsScreenRouteProp = RouteProp<RootStackParamList, "CompletedItems">

const CompletedItemsScreen: React.FC = () => {
  const route = useRoute<CompletedItemsScreenRouteProp>()
  const { area } = route.params

  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    // Lấy dữ liệu mẫu
    const allItems = generateMockItems(area)
    // Lọc các món đã hoàn thành
    const completedItems = getCompletedItems(allItems)
    setItems(completedItems)
  }, [area])

  const handleUndoItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, isCompleted: false } : item))
        .filter((item) => item.isCompleted),
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{area === "kitchen" ? "Món ăn đã xong" : "Đồ uống đã xong"}</Text>
        <Text style={styles.itemCount}>{items.length} món</Text>
      </View>

      <ItemList items={items} onUndoItem={handleUndoItem} />
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
    color: "#4caf50",
    fontWeight: "bold",
  },
})

export default CompletedItemsScreen

