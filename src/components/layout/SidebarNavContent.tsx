"use client";

import {
  AppstoreOutlined,
  BankOutlined,
  CalendarOutlined,
  DashboardOutlined,
  DollarOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Divider, Menu, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MenuProps } from "antd";
import { logout } from "@/lib/auth";
import { colors } from "@/lib/theme";

export type SidebarNavContentProps = {
  /** Desktop sider collapsed: compact brand and footer labels */
  collapsed?: boolean;
  /** Close mobile drawer after navigation */
  onAfterNavigate?: () => void;
};

const navItems: MenuProps["items"] = [
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
    key: "/villas",
    icon: <AppstoreOutlined />,
    label: <Link href="/villas">Quản lý villa</Link>,
  },
  {
    key: "/bookings",
    icon: <HomeOutlined />,
    label: <Link href="/bookings">Đặt phòng</Link>,
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

export default function SidebarNavContent({
  collapsed = false,
  onAfterNavigate,
}: SidebarNavContentProps) {
  const pathname = usePathname() || "/dashboard";
  const router = useRouter();
  const selectedKey = pathname === "/dashboard" ? "/dashboard" : pathname;

  const handleNavigate = () => {
    onAfterNavigate?.();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Link
        href="/dashboard"
        onClick={handleNavigate}
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
          items={navItems}
          onClick={handleNavigate}
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
          style={{ borderRadius: 10, height: 44, fontWeight: 600 }}
          onClick={() => {
            handleNavigate();
            router.push("/bookings");
          }}
        >
          {collapsed ? "+" : "+ Đặt phòng mới"}
        </Button>
        <Divider style={{ margin: "16px 0" }} />
        <Button
          type="text"
          block
          icon={<QuestionCircleOutlined />}
          onClick={() => message.info("Trợ giúp (demo)")}
          style={{
            justifyContent: collapsed ? "center" : "flex-start",
            color: colors.textSecondary,
          }}
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
            handleNavigate();
            router.push("/");
          }}
          style={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >
          {!collapsed ? "Đăng xuất" : null}
        </Button>
      </div>
    </div>
  );
}
