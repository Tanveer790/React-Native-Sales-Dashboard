export async function fetchDashboardSummary(range) {
  // range: "day" | "week" | "month" | "year"
  // later: API call here
  await new Promise((r) => setTimeout(r, 250));

  const base = {
    day: { sales: 12850, orders: 34 },
    week: { sales: 87420, orders: 210 },
    month: { sales: 312900, orders: 920 },
    year: { sales: 3820000, orders: 11420 },
  }[range];

  const topItems = [
    { name: "Item A", qty: 120, amount: base.sales * 0.22 },
    { name: "Item B", qty: 98, amount: base.sales * 0.18 },
    { name: "Item C", qty: 76, amount: base.sales * 0.14 },
    { name: "Item D", qty: 64, amount: base.sales * 0.12 },
  ];

  return { ...base, topItems };
}
