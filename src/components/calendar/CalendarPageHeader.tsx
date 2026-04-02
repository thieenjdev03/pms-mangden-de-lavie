"use client";

import { Space, Tag, Typography } from "antd";
import { colors } from "@/lib/theme";

const { Title, Text } = Typography;

type CalendarPageHeaderProps = {
  vacantRoomsToday: number;
  updatedAtLabel: string;
};

export default function CalendarPageHeader({
  vacantRoomsToday,
  updatedAtLabel,
}: CalendarPageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <div>
        <Title level={4} style={{ margin: "0 0 8px", color: colors.textPrimary }}>
          Quản lý lịch đặt phòng
        </Title>
        <Space size={12} wrap align="center">
          <Tag color="success" style={{ margin: 0, borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>
            {vacantRoomsToday} phòng trống hôm nay
          </Tag>
          <Text type="secondary" style={{ fontSize: 13, letterSpacing: "0.04em" }}>
            CẬP NHẬT LÚC {updatedAtLabel}
          </Text>
        </Space>
      </div>
    </div>
  );
}
