import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Măng Đen De Lavie — Sắp ra mắt",
  description: "Không gian nghỉ dưỡng đang được chuẩn bị.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full">{children}</div>;
}
