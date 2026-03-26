"use client";

import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Input, Layout, Segmented, Space, Typography, message } from "antd";
import { useState } from "react";
import { colors } from "@/lib/theme";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

type HeaderPeriod = "today" | "month" | "cleaning";

export default function Header() {
  const [period, setPeriod] = useState<HeaderPeriod>("today");

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
          options={[
            { label: "Hôm nay", value: "today" },
            { label: "Tháng này", value: "month" },
            { label: "Chờ dọn dẹp", value: "cleaning" },
          ]}
        />
      </Space>

      <Space size={16} align="center" style={{ flexShrink: 0 }}>
        <Button
          type="primary"
          style={{ borderRadius: 10 }}
          onClick={() => message.info("Thêm Villa (demo)")}
        >
          Thêm Villa
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
