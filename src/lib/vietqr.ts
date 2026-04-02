/** VietQR image URL (replace bank ID and account in production). */
export function getQR(amount: number, content: string): string {
  return `https://img.vietqr.io/image/MB-123456789-compact.png?amount=${amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent("NGUYEN VAN A")}`;
}
