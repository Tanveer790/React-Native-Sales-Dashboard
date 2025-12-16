const en = {
  dashboard: "Dashboard",
  today: "Today",
  week: "This Week",
  month: "This Month",
  year: "This Year",
  totalSales: "Total Sales",
  orders: "Orders",
  itemsSales: "Items Sales",
  theme: "Theme",
};

let current = en; // later i18n switch

export const t = (key) => current[key] ?? key;
