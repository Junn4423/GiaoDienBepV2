import { SafeAreaView, StatusBar } from "react-native"
import Navigation from "./src/navigation/Navigation"

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#5c6bc0" />
      <Navigation />
    </SafeAreaView>
  )
}

export default App

