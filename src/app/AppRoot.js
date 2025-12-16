import { SafeAreaView, StatusBar, Text } from "react-native";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";
import DashboardScreen from "../views/Dashboard/DashboardScreen";

function RootInner() {
  const { mode, colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />

      <Text style={{ color: colors.text, padding: 12, fontWeight: "700" }}>
        MY DASHBOARD LOADED
      </Text>

      <DashboardScreen />
    </SafeAreaView>
  );
}

export default function AppRoot() {
  return (
    <ThemeProvider>
      <RootInner />
    </ThemeProvider>
  );
}
