import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Image, View, Text, StyleSheet } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

// Màn hình chính
import MainSelection from "../screens/MainSelection"

// Màn hình khu vực Bán Hàng
import HomeScreen from "../screens/Home"
import OrderScreen from "../screens/Order"
import OrderCompletedScreen from "../screens/OrderCompleted"
import AllOrderScreen from "../screens/AllOrder"
import CustomersScreen from "../screens/Customers"
import EmptyTableScreen from "../screens/EmptyTables"

// Màn hình khu vực Bếp/Bar
import KitchenScreen from "../screens/Kitchen"
import BarScreen from "../screens/Bar"
import GroupedItemsScreen from "../screens/GroupedItems"
import CompletedItemsScreen from "../screens/CompletedItems"
import AllItemsScreen from "../screens/AllItems"
import OccupiedTablesScreen from "../screens/OccupiedTables"
import WaitingTablesScreen from "../screens/WaitingTables"

// Định nghĩa kiểu cho RootStackParamList
type RootStackParamList = {
  MainSelection: undefined
  SalesArea: undefined
  KitchenBarArea: undefined
}

// Định nghĩa kiểu cho SalesStackParamList
type SalesStackParamList = {
  Home: undefined
  Order: undefined
  OrderCompleted: undefined
  AllOrders: undefined
  Customers: undefined
  EmptyTables: undefined
}

// Định nghĩa kiểu cho KitchenBarStackParamList
type KitchenBarStackParamList = {
  Kitchen: undefined
  Bar: undefined
  GroupedItems: { area: "kitchen" | "bar" }
  CompletedItems: { area: "kitchen" | "bar" }
  AllItems: { area: "kitchen" | "bar" }
  OccupiedTables: { area: "kitchen" | "bar" }
  EmptyTables: undefined
  WaitingTables: { area: "kitchen" | "bar" }
}

const RootStack = createStackNavigator<RootStackParamList>()
const SalesDrawer = createDrawerNavigator<SalesStackParamList>()
const KitchenBarDrawer = createDrawerNavigator<KitchenBarStackParamList>()

// Drawer Navigator cho khu vực Bán Hàng
const SalesAreaNavigator = () => {
  return (
    <SalesDrawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5c6bc0",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#fff",
          width: 280,
        },
        drawerActiveTintColor: "#5c6bc0",
        drawerInactiveTintColor: "#333",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} title="Khu vực Bán Hàng" />}
    >
      <SalesDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <SalesDrawer.Screen
        name="Order"
        component={OrderScreen}
        options={{
          title: "Tạo đơn hàng",
          drawerIcon: ({ color }) => <MaterialIcons name="add-shopping-cart" size={24} color={color} />,
        }}
      />
      <SalesDrawer.Screen
        name="OrderCompleted"
        component={OrderCompletedScreen}
        options={{
          title: "Đơn đã hoàn thành",
          drawerIcon: ({ color }) => <MaterialIcons name="check-circle" size={24} color={color} />,
        }}
      />
      <SalesDrawer.Screen
        name="AllOrders"
        component={AllOrderScreen}
        options={{
          title: "Tất cả đơn hàng",
          drawerIcon: ({ color }) => <MaterialIcons name="list" size={24} color={color} />,
        }}
      />
      <SalesDrawer.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          title: "Khách hàng",
          drawerIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
        }}
      />
      <SalesDrawer.Screen
        name="EmptyTables"
        component={EmptyTableScreen}
        options={{
          title: "Quản lý bàn",
          drawerIcon: ({ color }) => <MaterialIcons name="table-bar" size={24} color={color} />,
        }}
      />
    </SalesDrawer.Navigator>
  )
}

// Drawer Navigator cho khu vực Bếp/Bar
const KitchenBarAreaNavigator = () => {
  return (
    <KitchenBarDrawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff7043",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#fff",
          width: 280,
        },
        drawerActiveTintColor: "#ff7043",
        drawerInactiveTintColor: "#333",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} title="Khu vực Bếp/Bar" />}
    >
      <KitchenBarDrawer.Screen
        name="Kitchen"
        component={KitchenScreen}
        options={{
          title: "Khu vực Bếp",
          drawerIcon: ({ color }) => <MaterialIcons name="restaurant" size={24} color={color} />,
        }}
      />
      <KitchenBarDrawer.Screen
        name="Bar"
        component={BarScreen}
        options={{
          title: "Khu vực Bar",
          drawerIcon: ({ color }) => <MaterialIcons name="local-bar" size={24} color={color} />,
        }}
      />
      <KitchenBarDrawer.Screen
        name="GroupedItems"
        component={GroupedItemsScreen}
        options={{
          title: "Theo nhóm món",
          drawerIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
        }}
        initialParams={{ area: "kitchen" }}
      />
      <KitchenBarDrawer.Screen
        name="CompletedItems"
        component={CompletedItemsScreen}
        options={{
          title: "Món xong",
          drawerIcon: ({ color }) => <MaterialIcons name="check-circle" size={24} color={color} />,
        }}
        initialParams={{ area: "kitchen" }}
      />
      <KitchenBarDrawer.Screen
        name="AllItems"
        component={AllItemsScreen}
        options={{
          title: "Tất cả",
          drawerIcon: ({ color }) => <MaterialIcons name="view-list" size={24} color={color} />,
        }}
        initialParams={{ area: "kitchen" }}
      />
      <KitchenBarDrawer.Screen
        name="OccupiedTables"
        component={OccupiedTablesScreen}
        options={{
          title: "Có khách",
          drawerIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
        }}
        initialParams={{ area: "kitchen" }}
      />
      <KitchenBarDrawer.Screen
        name="EmptyTables"
        component={EmptyTableScreen}
        options={{
          title: "Bàn trống",
          drawerIcon: ({ color }) => <MaterialIcons name="event-seat" size={24} color={color} />,
        }}
      />
      <KitchenBarDrawer.Screen
        name="WaitingTables"
        component={WaitingTablesScreen}
        options={{
          title: "Bàn chờ",
          drawerIcon: ({ color }) => <MaterialIcons name="hourglass-top" size={24} color={color} />,
        }}
        initialParams={{ area: "kitchen" }}
      />
    </KitchenBarDrawer.Navigator>
  )
}

// Custom Drawer Content
interface CustomDrawerProps {
  title: string
}

const CustomDrawerContent = (props: any & CustomDrawerProps) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image source={require("../assets/Logo/logo.png")} style={styles.logo} />
        <Text style={styles.drawerTitle}>PMBH PhongBep</Text>
        <Text style={styles.drawerSubtitle}>{props.title}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  )
}

// Root Navigator
const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="MainSelection"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="MainSelection" component={MainSelection} />
        <RootStack.Screen name="SalesArea" component={SalesAreaNavigator} />
        <RootStack.Screen name="KitchenBarArea" component={KitchenBarAreaNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: "#5c6bc0",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
  drawerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
})

export default Navigation

