import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { money } from "../../utils/format";

export default function SalesTrendChart({
  colors,
  title,
  totalValue,
  labels = [],
  values = [],
}) {
  const data = useMemo(() => {
    return (values || []).map((v, i) => ({
      value: Number(v || 0),
      label: labels?.[i] ?? `Mo.${String(i + 1).padStart(2, "0")}`,
      dataPointColor: i === 6 ? "#22c55e" : colors.primary,
      dataPointRadius: i === 6 ? 7 : 5,
    }));
  }, [values, labels, colors.primary]);

  const maxVal = Math.max(...(values || [0]));
  const stepValue = maxVal > 0 ? Math.ceil(maxVal / 6 / 1000) * 1000 : 1000;

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.total, { color: colors.muted }]}>{totalValue}</Text>
      </View>

      <View
        style={[
          styles.chartBox,
          { backgroundColor: colors.bg, borderColor: colors.border },
        ]}
      >
        <LineChart
          data={data}
          areaChart
          curved
          hideRules={false}
          rulesColor={colors.border}
          yAxisColor={colors.border}
          xAxisColor={colors.border}
          yAxisTextStyle={{ color: colors.muted, fontSize: 11 }}
          xAxisLabelTextStyle={{
            color: colors.muted,
            fontSize: 11,
            transform: [{ rotate: "-45deg" }],
          }}
          thickness={3}
          color={colors.primary}
          startFillColor={colors.primary}
          endFillColor={colors.primary}
          startOpacity={0.18}
          endOpacity={0.02}
          height={210}
          initialSpacing={10}
          spacing={42}
          stepValue={stepValue}
          noOfSections={6}
          showDataPoint
          dataPointsColor={colors.primary}
          focusEnabled
          showTextOnFocus
          showStripOnFocus
          stripColor={colors.border}
          stripHeight={230}
          pointerConfig={{
            pointerStripWidth: 2,
            pointerStripColor: colors.border,
            pointerColor: colors.primary,
            radius: 6,
            pointerLabelWidth: 140,
            pointerLabelHeight: 70,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items) => {
              const it = items?.[0];
              if (!it) return null;

              return (
                <View style={[styles.tooltip, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.tooltipTitle, { color: colors.text }]}>
                    {it.label}
                  </Text>
                  <Text style={[styles.tooltipValue, { color: colors.muted }]}>
                    {money(it.value)}
                  </Text>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontWeight: "900", fontSize: 18 },
  total: { fontWeight: "800", fontSize: 14 },
  chartBox: {
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  tooltip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tooltipTitle: { fontWeight: "900", fontSize: 13, marginBottom: 6 },
  tooltipValue: { fontWeight: "800", fontSize: 12 },
});
