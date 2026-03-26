"use client";

import { Space, Typography } from "antd";
import { getCalendarEventAccent } from "@/lib/theme";

const { Text } = Typography;

const LEGEND_ROWS: { property: string; label: string }[] = [
  { property: "Villa 1", label: "Ocean A" },
  { property: "Villa 2", label: "Hillside B" },
  { property: "Homestay 1", label: "Homestay C" },
];

export default function CalendarLegend() {
  return (
    <Space size={20} wrap style={{ alignItems: "center" }}>
      {LEGEND_ROWS.map((row) => {
        const accent = getCalendarEventAccent(row.property);
        return (
          <Space key={row.label} size={8} align="center">
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
