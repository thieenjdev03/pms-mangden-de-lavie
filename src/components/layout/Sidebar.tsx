"use client";

import { Layout } from "antd";
import { colors } from "@/lib/theme";
import SidebarNavContent from "./SidebarNavContent";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={260}
      theme="light"
      style={{
        overflow: "hidden",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        borderRight: `1px solid ${colors.border}`,
      }}
    >
      <SidebarNavContent collapsed={collapsed} />
    </Sider>
  );
}
