"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Dimensions, Alert } from "react-native"
import Layout from "../layout/_layout"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { generateMenuItems, type MenuItem } from "../data/mockData"

interface OrderItem extends MenuItem {
  quantity: number
  note?: string
}

const Order: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState("T01")
  const [customerName, setCustomerName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [cartExpanded, setCartExpanded] = useState(true)
  const [showMoreItems, setShowMoreItems] = useState(false)

  // Sample menu data
  const menuItems = generateMenuItems()

  const tables = Array.from({ length: 20 }, (_, i) => `T${(i + 1).toString().padStart(2, "0")}`)
  const categories = [
    { id: "all", name: "Tất cả", icon: "restaurant-menu" },
    { id: "main", name: "Chính", icon: "dinner-dining" },
    { id: "appetizer", name: "Khai vị", icon: "tapas" },
    { id: "drinks", name: "Đồ uống", icon: "local-bar" },
    { id: "dessert", name: "Tráng miệng", icon: "icecream" },
    { id: "side", name: "Món phụ", icon: "fastfood" },
  ]

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Hiển thị tất cả nếu showMoreItems = true, nếu không chỉ hiển thị 3 món
  const displayedItems = showMoreItems ? filteredItems : filteredItems.slice(0, 3)

  const addToOrder = (item: MenuItem) => {
    const existingItemIndex = orderItems.findIndex((orderItem) => orderItem.id === item.id)

    if (existingItemIndex !== -1) {
      const updatedItems = [...orderItems]
      updatedItems[existingItemIndex].quantity += 1
      setOrderItems(updatedItems)
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromOrder = (itemId: string) => {
    const existingItemIndex = orderItems.findIndex((item) => item.id === itemId)

    if (existingItemIndex !== -1) {
      const updatedItems = [...orderItems]
      if (updatedItems[existingItemIndex].quantity > 1) {
        updatedItems[existingItemIndex].quantity -= 1
      } else {
        updatedItems.splice(existingItemIndex, 1)
      }
      setOrderItems(updatedItems)
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleConfirmOrder = () => {
    if (!selectedTable || orderItems.length === 0) {
      return
    }

    // Phân loại món ăn và đồ uống
    const foodItems = orderItems.filter((item) => item.type === "food")
    const drinkItems = orderItems.filter((item) => item.type === "drink")

    let message = "Đơn hàng đã được gửi:\n"

    if (foodItems.length > 0) {
      message += "\nĐã gửi món ăn đến Bếp:"
      foodItems.forEach((item) => {
        message += `\n- ${item.quantity}x ${item.name}`
      })
    }

    if (drinkItems.length > 0) {
      message += "\n\nĐã gửi đồ uống đến Bar:"
      drinkItems.forEach((item) => {
        message += `\n- ${item.quantity}x ${item.name}`
      })
    }

    Alert.alert("Xác nhận đơn hàng", message, [{ text: "OK", onPress: () => setOrderItems([]) }])
  }

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => addToOrder(item)}>
      <Image source={item.image} style={styles.menuItemImage} />
      <View style={styles.menuItemDetails}>
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <View style={[styles.typeIndicator, item.type === "food" ? styles.foodIndicator : styles.drinkIndicator]}>
            <MaterialIcon name={item.type === "food" ? "restaurant" : "local-bar"} size={12} color="#fff" />
          </View>
        </View>
        <Text style={styles.menuItemPrice}>{item.price.toLocaleString()}đ</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addToOrder(item)}>
        <MaterialIcon name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Tạo đơn hàng mới</Text>

        <View style={styles.tableSelection}>
          <Text style={styles.sectionLabel}>Chọn bàn:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tableList}>
              {tables.map((table) => (
                <TouchableOpacity
                  key={table}
                  style={[styles.tableItem, selectedTable === table && styles.selectedTable]}
                  onPress={() => setSelectedTable(table)}
                >
                  <Text style={[styles.tableText, selectedTable === table && styles.selectedTableText]}>{table}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.sectionLabel}>Thông tin khách hàng:</Text>
          <TextInput
            style={styles.customerInput}
            placeholder="Tên khách hàng"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        <View style={styles.searchBar}>
          <MaterialIcon name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm món ăn..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
          <View style={styles.tabContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.tabItem, selectedCategory === category.id && styles.activeTabItem]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <MaterialIcon
                  name={category.icon}
                  size={16}
                  color={selectedCategory === category.id ? "#fff" : "#333"}
                />
                <Text style={[styles.tabText, selectedCategory === category.id && styles.activeTabText]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.menuListContainer}>
          {displayedItems.map((item) => renderMenuItem({ item }))}

          {filteredItems.length > 3 && (
            <TouchableOpacity style={styles.moreItemsButton} onPress={() => setShowMoreItems(!showMoreItems)}>
              <Text style={styles.moreItemsText}>
                {showMoreItems ? "Thu gọn" : `Xem thêm ${filteredItems.length - 3} món...`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.orderSection}>
          <View style={styles.orderHeader}>
            <Text style={styles.sectionLabel}>Đơn hàng ({orderItems.length} món)</Text>
            {orderItems.length > 0 && (
              <TouchableOpacity style={styles.collapseButton} onPress={() => setCartExpanded(!cartExpanded)}>
                <MaterialIcon name={cartExpanded ? "expand-less" : "expand-more"} size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {orderItems.length > 0 && cartExpanded ? (
            <ScrollView style={styles.orderListContainer} nestedScrollEnabled={true}>
              {orderItems.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <View style={styles.orderItemDetails}>
                    <View style={styles.orderItemHeader}>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <View
                        style={[
                          styles.typeIndicator,
                          item.type === "food" ? styles.foodIndicator : styles.drinkIndicator,
                          styles.smallIndicator,
                        ]}
                      >
                        <MaterialIcon name={item.type === "food" ? "restaurant" : "local-bar"} size={10} color="#fff" />
                      </View>
                    </View>
                    <Text style={styles.orderItemPrice}>{item.price.toLocaleString()}đ</Text>
                  </View>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => removeFromOrder(item.id)}>
                      <MaterialIcon name="remove" size={20} color="#d9534f" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => addToOrder(item)}>
                      <MaterialIcon name="add" size={20} color="#5cb85c" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : orderItems.length === 0 ? (
            <View style={styles.emptyOrder}>
              <MaterialIcon name="shopping-cart" size={24} color="#ddd" />
              <Text style={styles.emptyOrderText}>Chưa có món ăn nào được chọn</Text>
            </View>
          ) : null}

          <View style={styles.orderSummary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalAmount}>{calculateTotal().toLocaleString()}đ</Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, (!selectedTable || orderItems.length === 0) && styles.disabledButton]}
              disabled={!selectedTable || orderItems.length === 0}
              onPress={handleConfirmOrder}
            >
              <MaterialIcon name="check-circle" size={20} color="#fff" />
              <Text style={styles.confirmButtonText}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  tableSelection: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tableList: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  tableItem: {
    width: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedTable: {
    backgroundColor: "#5c6bc0",
    borderColor: "#5c6bc0",
  },
  tableText: {
    fontWeight: "bold",
    color: "#333",
  },
  selectedTableText: {
    color: "#fff",
  },
  customerInfo: {
    marginBottom: 8,
  },
  customerInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 14,
  },
  tabScrollView: {
    maxHeight: 36,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
    height: 36,
  },
  tabItem: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  activeTabItem: {
    backgroundColor: "#5c6bc0",
  },
  tabText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuListContainer: {
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuItemImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  menuItemDetails: {
    flex: 1,
    marginLeft: 8,
  },
  menuItemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  typeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  foodIndicator: {
    backgroundColor: "#5c6bc0",
  },
  drinkIndicator: {
    backgroundColor: "#ff7043",
  },
  menuItemPrice: {
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#5c6bc0",
    borderRadius: 18,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  moreItemsButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  moreItemsText: {
    color: "#5c6bc0",
    fontSize: 12,
    fontWeight: "bold",
  },
  orderSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  collapseButton: {
    padding: 4,
  },
  orderListContainer: {
    maxHeight: 150,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderItemName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  orderItemPrice: {
    fontSize: 10,
    color: "#666",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  emptyOrder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginBottom: 8,
  },
  emptyOrderText: {
    marginTop: 4,
    color: "#999",
    textAlign: "center",
    fontSize: 12,
  },
  orderSummary: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5c6bc0",
  },
  confirmButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5c6bc0",
    borderRadius: 8,
    paddingVertical: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
})

export default Order

