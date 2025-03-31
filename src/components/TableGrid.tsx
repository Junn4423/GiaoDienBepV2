import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export interface Table {
  id: string
  name: string
  area: "inside" | "outside"
  status: "empty" | "occupied" | "waiting"
  totalAmount: number
  startTime: string
  elapsedTime: string
  pendingItems: number // Số món đang chờ
}

interface TableGridProps {
  tables: Table[]
  onSelectTable: (tableId: string) => void
  selectedArea: "inside" | "outside"
  numColumns?: number
}

const TableGrid: React.FC<TableGridProps> = ({ tables, onSelectTable, selectedArea, numColumns = 3 }) => {
  const filteredTables = tables.filter((table) => table.area === selectedArea)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "empty":
        return "#4caf50" // Green
      case "occupied":
        return "#2196f3" // Blue
      case "waiting":
        return "#ff9800" // Orange
      default:
        return "#999"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "empty":
        return "check-circle"
      case "occupied":
        return "people"
      case "waiting":
        return "hourglass-top"
      default:
        return "help"
    }
  }

  const renderTable = ({ item }: { item: Table }) => (
    <TouchableOpacity
      style={[
        styles.tableCard,
        { backgroundColor: getStatusColor(item.status) + "20", borderColor: getStatusColor(item.status) },
      ]}
      onPress={() => onSelectTable(item.id)}
    >
      <View style={styles.tableTop}>
        <MaterialIcons name={getStatusIcon(item.status)} size={16} color={getStatusColor(item.status)} />
        <Text style={styles.tableName}>{item.name}</Text>
      </View>

      <View style={styles.tableContent}>
        <View style={styles.tableInner}>
          <Text style={styles.tableAmount}>{item.totalAmount.toLocaleString()}đ</Text>
          <Text style={styles.tableTime}>{item.elapsedTime}</Text>
          {item.pendingItems > 0 && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>{item.pendingItems}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={filteredTables}
      renderItem={renderTable}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  tableCard: {
    width: (width - 48) / 3,
    height: (width - 48) / 3,
    margin: 4,
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    justifyContent: "space-between",
  },
  tableTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  tableContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableInner: {
    width: "90%",
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    position: "relative",
  },
  tableAmount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tableTime: {
    fontSize: 10,
    color: "#666",
  },
  pendingBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f44336",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pendingText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
})

export default TableGrid

