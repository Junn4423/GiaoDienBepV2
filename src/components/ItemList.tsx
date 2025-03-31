import type React from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export interface Item {
  id: string
  name: string
  code: string
  quantity: number
  orderTime: string
  note?: string
  isCompleted: boolean
  tableId: string
  tableName: string
  elapsedTime: string
  type: "food" | "drink" // Thêm loại món để phân biệt món ăn và đồ uống
}

interface ItemListProps {
  items: Item[]
  onCompleteItem?: (itemId: string) => void
  onUndoItem?: (itemId: string) => void
  showCheckbox?: boolean
  selectedItems?: string[]
  onToggleSelect?: (itemId: string) => void
  buttonText?: string
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onCompleteItem,
  onUndoItem,
  showCheckbox = false,
  selectedItems = [],
  onToggleSelect,
  buttonText = "Xong",
}) => {
  const renderItem = ({ item, index }: { item: Item; index: number }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemIndex}>{index + 1}</Text>

      {onCompleteItem && !item.isCompleted && (
        <TouchableOpacity style={styles.actionButton} onPress={() => onCompleteItem(item.id)}>
          <Text style={styles.actionButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}

      {onUndoItem && item.isCompleted && (
        <TouchableOpacity style={[styles.actionButton, styles.undoButton]} onPress={() => onUndoItem(item.id)}>
          <Text style={styles.actionButtonText}>Hoàn lại</Text>
        </TouchableOpacity>
      )}

      {showCheckbox && (
        <TouchableOpacity style={styles.checkbox} onPress={() => onToggleSelect && onToggleSelect(item.id)}>
          {selectedItems.includes(item.id) ? (
            <MaterialIcons name="check-box" size={24} color="#5c6bc0" />
          ) : (
            <MaterialIcons name="check-box-outline-blank" size={24} color="#999" />
          )}
        </TouchableOpacity>
      )}

      <Text style={styles.tableText}>{item.tableName}</Text>
      <Text style={styles.timeText}>{item.orderTime}</Text>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={[styles.typeIndicator, item.type === "food" ? styles.foodIndicator : styles.drinkIndicator]}>
          <MaterialIcons name={item.type === "food" ? "restaurant" : "local-bar"} size={12} color="#fff" />
        </View>
      </View>
      <Text style={styles.codeText}>Mã SP: {item.code}</Text>
      <Text style={styles.quantityText}>Số lượng: x{item.quantity}</Text>

      {!item.isCompleted && <Text style={styles.elapsedTimeText}>Thời gian: {item.elapsedTime}</Text>}

      {item.note && (
        <View style={styles.noteContainer}>
          <MaterialIcons name="note" size={16} color="#666" />
          <Text style={styles.noteText}>Ghi chú: {item.note}</Text>
        </View>
      )}
    </View>
  )

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  itemRow: {
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemIndex: {
    position: "absolute",
    top: 12,
    left: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    width: 24,
    textAlign: "center",
  },
  actionButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#4caf50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    elevation: 2,
  },
  undoButton: {
    backgroundColor: "#ff9800",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkbox: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  tableText: {
    marginLeft: 30,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  timeText: {
    marginLeft: 30,
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  nameContainer: {
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
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
  foodIndicator: {
    backgroundColor: "#5c6bc0",
  },
  drinkIndicator: {
    backgroundColor: "#ff7043",
  },
  codeText: {
    marginLeft: 30,
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  quantityText: {
    marginLeft: 30,
    fontSize: 14,
    fontWeight: "bold",
    color: "#5c6bc0",
    marginBottom: 4,
  },
  elapsedTimeText: {
    marginLeft: 30,
    fontSize: 12,
    color: "#f44336",
    fontWeight: "bold",
    marginBottom: 4,
  },
  noteContainer: {
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  noteText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
})

export default ItemList

