"use client";

import { Drawer, Grid, Layout } from "antd";
import { useEffect, useState } from "react";
import { colors } from "@/lib/theme";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SidebarNavContent from "./SidebarNavContent";

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;

  useEffect(() => {
    if (!isMobile) setMobileNavOpen(false);
  }, [isMobile]);

  const contentMargin = isMobile ? 12 : 24;

  return (
    <Layout style={{ minHeight: "100vh", background: colors.background }}>
      {!isMobile ? <Sidebar collapsed={collapsed} onCollapse={setCollapsed} /> : null}

      <Drawer
        title={null}
        placement="left"
        width={288}
        open={isMobile && mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        styles={{
          body: { padding: 0 },
        }}
        destroyOnClose={false}
      >
        <SidebarNavContent onAfterNavigate={() => setMobileNavOpen(false)} />
      </Drawer>

      <Layout style={{ background: colors.background }}>
        <Header
          isMobile={isMobile}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <Content
          style={{
            margin: contentMargin,
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
