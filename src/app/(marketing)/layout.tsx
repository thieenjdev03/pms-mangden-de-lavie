import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Măng Đen De Lavie — CasaBlanca & Sala Villa",
  description:
    "Hai villa tại Măng Đen: CasaBlanca Villa và Sala Villa — không gian lành, tiện nghi đầy đủ, đặt phòng qua Zalo.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-heal-neutral-light">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
