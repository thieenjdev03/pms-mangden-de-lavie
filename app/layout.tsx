import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AntdAppTheme from "@/components/providers/AntdAppTheme";
import AppLayout from "@/components/layout/AppLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        <AntdRegistry>
          <AntdAppTheme>
            <AppLayout>{children}</AppLayout>
          </AntdAppTheme>
        </AntdRegistry>
      </body>
    </html>
  );
}
