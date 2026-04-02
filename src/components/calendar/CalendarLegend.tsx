"use client";

import { Space, Typography } from "antd";
import { getCalendarEventAccent } from "@/lib/theme";

const { Text } = Typography;

export type CalendarLegendItem = { villaId: string; label: string };

type CalendarLegendProps = {
  items: CalendarLegendItem[];
};

export default function CalendarLegend({ items }: CalendarLegendProps) {
  if (items.length === 0) return null;
  return (
    <Space size={20} wrap style={{ alignItems: "center" }}>
      {items.map((row) => {
        const accent = getCalendarEventAccent(row.villaId);
        return (
          <Space key={row.villaId} size={8} align="center">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: accent,
                flexShrink: 0,
              }}
            />
            <Text style={{ fontSize: 13, color: accent, fontWeight: 600 }}>{row.label}</Text>
          </Space>
        );
      })}
    </Space>
  );
}
