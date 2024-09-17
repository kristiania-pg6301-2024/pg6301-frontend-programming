export const billTypes = [
  { key: "1000kr", value: 1000, label: "1000-lapper" },
  { key: "500kr", value: 500, label: "500-lapper" },
  { key: "200kr", value: 200, label: "200-lapper" },
  { key: "100kr", value: 100, label: "100-lapper" },
  { key: "50kr", value: 50, label: "50-lapper" },
];
export const coinTypes = [
  { key: "20kr", value: 20, label: "20-kroning", gramsPerCoin: 9.9 },
  { key: "10kr", value: 10, label: "10-kroning", gramsPerCoin: 6.8 },
  { key: "5kr", value: 5, label: "5-kroning", gramsPerCoin: 7.85 },
  { key: "1kr", value: 1, label: "kronestykker", gramsPerCoin: 4.35 },
];

export function sumBalance(balance) {
  let result = 0;
  for (const denomination of billTypes) {
    if (denomination.key in balance) {
      result += denomination.value * balance[denomination.key];
    }
  }
  for (const denomination of coinTypes) {
    if (denomination.key in balance) {
      result += denomination.value * balance[denomination.key];
    }
  }
  return result;
}
