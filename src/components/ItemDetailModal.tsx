"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ItemList from "../components/ItemList"
import type { Item } from "../components/ItemList"

interface ItemDetailModalProps {
  visible: boolean
  onClose: () => void
  tableName: string
  items: Item[]
  onCompleteItems: (itemIds: string[]) => void
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ visible, onClose, tableName, items, onCompleteItems }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleToggleSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }

  const handleCompleteSelected = () => {
    if (selectedItems.length > 0) {
      onCompleteItems(selectedItems)
      setSelectedItems([])
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chi tiết {tableName}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
              <MaterialIcons
                name={selectedItems.length === items.length ? "check-box" : "check-box-outline-blank"}
                size={20}
                color="#5c6bc0"
              />
              <Text style={styles.selectAllText}>
                {selectedItems.length === items.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.completeButton, selectedItems.length === 0 && styles.disabledButton]}
              onPress={handleCompleteSelected}
              disabled={selectedItems.length === 0}
            >
              <MaterialIcons name="check-circle" size={20} color="#fff" />
              <Text style={styles.completeButtonText}>Xong ({selectedItems.length})</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <ItemList
              items={items}
              showCheckbox={true}
              selectedItems={selectedItems}
              onToggleSelect={handleToggleSelect}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectAllButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  selectAllText: {
    marginLeft: 4,
    color: "#5c6bc0",
    fontSize: 14,
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 14,
  },
  modalContent: {
    flex: 1,
  },
})

export default ItemDetailModal

