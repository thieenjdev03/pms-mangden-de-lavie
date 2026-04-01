"use client";

import { Typography } from "antd";
import { colors } from "@/lib/theme";

const { Title, Paragraph } = Typography;

export default function SettingsPage() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 24,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Title level={4} style={{ marginTop: 0, color: colors.textPrimary }}>
        Cài đặt
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 0 }}>
        Cài đặt hệ thống (demo — chưa kết nối dữ liệu).
      </Paragraph>
    </div>
  );
}
