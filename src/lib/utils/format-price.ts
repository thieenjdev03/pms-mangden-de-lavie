/** VND display for marketing (no decimals). */
export function formatPriceVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Alias for PMS tables — same formatting. */
export const formatVnd = formatPriceVnd;

/** Short label for cards: "từ 1,2tr" style optional — keep explicit VND for clarity. */
export function formatPriceFromLabel(amount: number): string {
  return `Từ ${formatPriceVnd(amount)}`;
}
