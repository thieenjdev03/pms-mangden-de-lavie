"use client";

import {
  BankOutlined,
  CalendarOutlined,
  DashboardOutlined,
  DollarOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { colors } from "@/lib/theme";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
};

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname() || "/dashboard";
  const router = useRouter();
  const selectedKey = pathname === "/dashboard" ? "/dashboard" : pathname;

  const items = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Tổng quan</Link>,
    },
    {
      key: "/calendar",
      icon: <CalendarOutlined />,
      label: <Link href="/calendar">Lịch đặt phòng</Link>,
    },
    {
      key: "/bookings",
      icon: <HomeOutlined />,
      label: <Link href="/bookings">Quản lý Villa</Link>,
    },
    {
      key: "/expenses",
      icon: <DollarOutlined />,
      label: <Link href="/expenses">Doanh thu</Link>,
    },
    {
      key: "/customers",
      icon: <TeamOutlined />,
      label: <Link href="/customers">Khách hàng</Link>,
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: <Link href="/settings">Cài đặt</Link>,
    },
  ];

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: collapsed ? "20px 12px" : "20px 20px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BankOutlined style={{ color: "#fff", fontSize: 22 }} />
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: colors.primary,
                  lineHeight: 1.25,
                }}
              >
                Quản lý Villa
              </div>
              <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>
                Premium PMS
              </div>
            </div>
          )}
        </Link>

        <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={items}
            style={{
              border: "none",
              padding: "0 10px",
              background: "transparent",
            }}
          />
        </div>

        <div style={{ padding: collapsed ? 12 : 16, flexShrink: 0 }}>
          <Button
            type="primary"
            block
            size="large"
            href="/bookings"
            style={{ borderRadius: 10, height: 44, fontWeight: 600 }}
          >
            {collapsed ? "+" : "+ Đặt phòng mới"}
          </Button>
          <Divider style={{ margin: "16px 0" }} />
          <Button
            type="text"
            block
            icon={<QuestionCircleOutlined />}
            onClick={() => message.info("Trợ giúp (demo)")}
            style={{ justifyContent: collapsed ? "center" : "flex-start", color: colors.textSecondary }}
          >
            {!collapsed ? "Trợ giúp" : null}
          </Button>
          <Button
            type="text"
            block
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              logout();
              router.push("/");
            }}
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            {!collapsed ? "Đăng xuất" : null}
          </Button>
        </div>
      </div>
    </Sider>
  );
}
