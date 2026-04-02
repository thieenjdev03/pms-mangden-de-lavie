"use client";

import {
  BellOutlined,
  HomeOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Input,
  Layout,
  Select,
  Segmented,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { colors } from "@/lib/theme";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

type HeaderPeriod = "today" | "month" | "cleaning";

const periodOptions: { label: string; value: HeaderPeriod }[] = [
  { label: "Hôm nay", value: "today" },
  { label: "Tháng này", value: "month" },
  { label: "Chờ dọn dẹp", value: "cleaning" },
];

export type HeaderProps = {
  isMobile?: boolean;
  onOpenMobileNav?: () => void;
};

export default function Header({ isMobile = false, onOpenMobileNav }: HeaderProps) {
  const router = useRouter();
  const [period, setPeriod] = useState<HeaderPeriod>("today");

  if (isMobile) {
    return (
      <AntHeader
        style={{
          padding: "10px 12px",
          background: "#fff",
          borderBottom: `1px solid ${colors.border}`,
          height: "auto",
          minHeight: 56,
          lineHeight: "normal",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={() => onOpenMobileNav?.()}
            aria-label="Mở menu"
            style={{ flexShrink: 0, width: 40, height: 40 }}
          />
          <Select<HeaderPeriod>
            value={period}
            onChange={setPeriod}
            options={periodOptions}
            style={{ flex: 1, minWidth: 0 }}
            popupMatchSelectWidth={false}
          />
          <Button
            type="primary"
            size="small"
            icon={<HomeOutlined />}
            style={{ borderRadius: 8, flexShrink: 0 }}
            onClick={() => router.push("/villas")}
            aria-label="Quản lý villa"
          />
          <Badge dot color={colors.tertiary}>
            <BellOutlined style={{ fontSize: 20, color: colors.textSecondary, cursor: "pointer" }} />
          </Badge>
          <Avatar
            size={36}
            icon={<UserOutlined />}
            style={{ flexShrink: 0, backgroundColor: colors.secondary }}
          />
        </div>
        <Input
          allowClear
          placeholder="Tìm kiếm booking, khách hàng…"
          prefix={<SearchOutlined style={{ color: colors.textSecondary }} />}
          style={{
            width: "100%",
            borderRadius: 10,
          }}
        />
      </AntHeader>
    );
  }

  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        borderBottom: `1px solid ${colors.border}`,
        height: 72,
        lineHeight: "normal",
        flexWrap: "wrap",
      }}
    >
      <Space size={20} wrap style={{ flex: 1, minWidth: 0 }}>
        <Input
          allowClear
          placeholder="Tìm kiếm booking, khách hàng…"
          prefix={<SearchOutlined style={{ color: colors.textSecondary }} />}
          style={{
            maxWidth: 320,
            width: "100%",
            borderRadius: 10,
          }}
        />
        <Segmented<HeaderPeriod>
          value={period}
          onChange={setPeriod}
          options={periodOptions}
        />
      </Space>

      <Space size={16} align="center" style={{ flexShrink: 0 }}>
        <Button
          type="primary"
          style={{ borderRadius: 10 }}
          onClick={() => router.push("/villas")}
        >
          Quản lý villa
        </Button>
        <Badge dot color={colors.tertiary}>
          <BellOutlined style={{ fontSize: 20, color: colors.textSecondary, cursor: "pointer" }} />
        </Badge>
        <Space align="center" size={12}>
          <Avatar
            size={44}
            icon={<UserOutlined />}
            style={{ flexShrink: 0, backgroundColor: colors.secondary }}
          />
          <div style={{ lineHeight: 1.35 }}>
            <div style={{ fontWeight: 600, color: colors.textPrimary }}>Admin Lux</div>
            <Text type="secondary" style={{ fontSize: 11, letterSpacing: "0.02em" }}>
              QUẢN TRỊ VIÊN
            </Text>
          </div>
        </Space>
      </Space>
    </AntHeader>
  );
}
