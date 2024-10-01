export function sumBalance(param: { "50kr"?: number; "1000kr"?: number }) {
  return 1000 * (param["1000kr"] || 0) + 50 * (param["50kr"] || 0);
}
