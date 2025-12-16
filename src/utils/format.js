export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "SAR" }).format(
    Number(n || 0)
  );
