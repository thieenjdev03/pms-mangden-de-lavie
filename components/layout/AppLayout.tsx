"use client";

import { Layout } from "antd";
import { useState } from "react";
import { colors } from "@/lib/theme";
import Header from "./Header";
import Sidebar from "./Sidebar";

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh", background: colors.background }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout style={{ background: colors.background }}>
        <Header />
        <Content
          style={{
            margin: 24,
            padding: 0,
            minHeight: 280,
            background: "transparent",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
