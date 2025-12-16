import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { money } from "../../utils/format";

function SalesByRepCard({
  colors,
  title = "Total Sales by Sales Rep",
  rows = [],
}) {
  const hasRows = useMemo(() => rows.length > 0, [rows.length]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      </View>

      {/* Table Header */}
      <View style={[styles.tableHeader, { borderColor: colors.border }]}>
        <Text style={[styles.hCell, { color: colors.muted }]}>
          This Month
        </Text>
        <Text style={[styles.hCell, styles.rightText, { color: colors.muted }]}>
          Sales Rep
        </Text>
      </View>

      {/* Rows */}
      <View style={styles.rowsWrapper}>
        {hasRows ? (
          rows.map((r, idx) => (
            <View
              key={`${r?.name ?? "rep"}-${idx}`}
              style={[
                styles.row,
                { borderBottomColor: colors.border },
                idx === rows.length - 1 && styles.lastRow,
              ]}
            >
              <Text style={[styles.cellLeft, { color: colors.text }]}>
                {money(r?.value ?? 0)}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.cellRight, { color: colors.text }]}
              >
                {r?.name ?? "—"}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            No data found.
          </Text>
        )}
      </View>
    </View>
  );
}

export default memo(SalesByRepCard);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hCell: {
    fontSize: 12,
    fontWeight: "800",
  },
  rowsWrapper: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cellLeft: {
    fontSize: 14,
    fontWeight: "800",
  },
  cellRight: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "right",
    maxWidth: "60%",
  },
  rightText: {
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 18,
  },
});
