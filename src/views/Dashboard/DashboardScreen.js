import { useMemo } from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { t } from "../../localization/t";
import { useTheme } from "../../theme/ThemeProvider";
import { money } from "../../utils/format";
import { useDashboardVM } from "../../viewmodels/useDashboardVM";
import SalesByRepCard from "../components/SalesByRepCard";
import SalesTrendChart from "../components/SalesTrendChart";
import SegmentedTabs from "../components/SegmentedTabs";
import StatCard from "../components/StatCard";
import TopItemRow from "../components/TopItemRow";

const SPACING = 27;

export default function DashboardScreen() {
  const { colors, mode, toggle } = useTheme();
  const vm = useDashboardVM();

  // 1. Memoize dynamic styles to prevent child re-renders
  const cardStyle = useMemo(() => [
    styles.cardBase,
    {
      backgroundColor: `${colors.card}90`,
      borderColor: colors.border,
      shadowColor: colors.shadow,
    }
  ], [colors.card, colors.border, colors.shadow]);

  // 2. Logic for Sales Rep data (keep UI clean)
  const salesRepData = vm.data?.salesByRep || [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.kicker, { color: colors.primary }]}>
            {t("dashboard")}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Sales Overview
          </Text>
        </View>

        <Pressable
          onPress={toggle}
          style={({ pressed }) => [
            cardStyle,
            styles.themeToggle,
            { opacity: pressed ? 0.7 : 1 }
          ]}
        >
          <Text style={{ color: colors.primary, fontWeight: "700", fontSize: 18 }}>
            {mode === "dark" ? "☀️" : "🌙"}
          </Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={{ marginBottom: SPACING }}>
        <SegmentedTabs items={vm.ranges} value={vm.range} onChange={vm.setRange} t={t} />
      </View>

      {/* Stat Cards */}
      <View style={styles.statsRow}>
        <StatCard
          title={t("totalSales")}
          value={money(vm.data?.sales ?? 0)}
          subtitle={`Range: ${vm.range}`}
        />
        <StatCard
          title={t("number of sales")}
          value={String(vm.data?.orders ?? 0)}
          subtitle="Count"
        />
      </View>

      {/* Loading Overlay */}
      {vm.loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.muted }]}>
            FETCHING LATEST DATA...
          </Text>
        </View>
      )}

      {/* Top Items */}
      <View style={cardStyle}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("itemsSales")}
        </Text>
        {salesRepData.length > 0 ? (
          vm.data?.topItems?.map((it, idx) => (
            <TopItemRow
              key={`${it.name}-${idx}`}
              item={it}
              isLast={idx === vm.data.topItems.length - 1}
            />
          ))
        ) : (
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            No sales data found for this period.
          </Text>
        )}
      </View>

      {/* Annual Sales Chart */}
      <View style={[cardStyle, { marginTop: SPACING }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("annualSalesTotal")}
        </Text>
        <SalesTrendChart
          colors={colors}
          title={t("annualSalesTotal")}
          totalValue={money(vm.data?.annualTotal ?? 0)}
          labels={vm.data?.monthsLabels}
          values={vm.data?.monthsSales}
        />
      </View>

      {/* Sales Rep Card */}
      <View style={[cardStyle, { marginTop: SPACING }]}>
        <SalesByRepCard
          colors={colors}
          title="Total Sales by Sales Rep"
          rows={salesRepData}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING * 1.5,
  },
  kicker: {
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    fontWeight: "900",
    fontSize: 36,
    marginTop: 4,
  },
  cardBase: {
    borderRadius: 24,
    padding: SPACING,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  themeToggle: {
    padding: 12,
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: SPACING,
  },
  sectionTitle: {
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    marginVertical: SPACING,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: SPACING,
    fontSize: 14,
  },
});