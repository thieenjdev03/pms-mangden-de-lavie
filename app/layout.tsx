import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import AntdAppTheme from "@/components/providers/AntdAppTheme";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homestay PMS — Quản lý homestay",
  description: "Hệ thống quản lý homestay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable} h-full`}>
      <body className="min-h-full font-body antialiased">
        <AntdRegistry>
          <AntdAppTheme>{children}</AntdAppTheme>
        </AntdRegistry>
      </body>
    </html>
  );
}
