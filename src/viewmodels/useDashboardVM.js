import { useEffect, useMemo, useState } from "react";
import { fetchDashboardSummary } from "../services/dashboardService";

export function useDashboardVM() {
  const [range, setRange] = useState("day");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ sales: 0, orders: 0, topItems: [] });

  const ranges = useMemo(
    () => [
      { key: "day", labelKey: "today" },
      { key: "week", labelKey: "week" },
      { key: "month", labelKey: "month" },
      { key: "year", labelKey: "year" },
    ],
    []
  );

  async function load() {
    setLoading(true);
    try {
      const res = await fetchDashboardSummary(range);
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [range]);

  return {
    range,
    setRange,
    ranges,
    loading,
    data,
    reload: load,
  };
}
