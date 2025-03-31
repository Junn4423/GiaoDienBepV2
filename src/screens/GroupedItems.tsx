"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import ItemList, { type Item } from "../components/ItemList"
import { generateMockItems, getPendingItems } from "../data/mockData"

type RootStackParamList = {
  GroupedItems: { area: "kitchen" | "bar" }
}

type GroupedItemsScreenRouteProp = RouteProp<RootStackParamList, "GroupedItems">

const GroupedItemsScreen: React.FC = () => {
  const route = useRoute<GroupedItemsScreenRouteProp>()
  const { area } = route.params

  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    // Lấy dữ liệu mẫu
    const allItems = generateMockItems(area)
    // Lọc các món chưa hoàn thành
    const pendingItems = getPendingItems(allItems)
    setItems(pendingItems)
  }, [area])

  const handleCompleteItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, isCompleted: true } : item))
        .filter((item) => !item.isCompleted),
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{area === "kitchen" ? "Món ăn ch�� làm" : "Đồ uống chờ làm"}</Text>
        <Text style={styles.itemCount}>{items.length} món</Text>
      </View>

      <ItemList items={items} onCompleteItem={handleCompleteItem} />
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
})

export default GroupedItemsScreen

