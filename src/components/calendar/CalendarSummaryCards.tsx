"use client";

import { FileTextOutlined, LineChartOutlined, StarFilled } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { colors } from "@/lib/theme";

const { Text } = Typography;

/** Bottom summary strip — static mock values per calendar UI spec. */
const SUMMARY = [
  {
    key: "revenue",
    title: "DOANH THU DỰ KIẾN",
    value: "1.250.000.000đ",
    icon: <LineChartOutlined style={{ fontSize: 22, color: "#fff" }} />,
    iconBg: colors.primary,
  },
  {
    key: "occupancy",
    title: "TỶ LỆ LẤP ĐẦY",
    value: "84.2%",
    icon: <StarFilled style={{ fontSize: 22, color: "#fff" }} />,
    iconBg: "#722ED1",
  },
  {
    key: "maintenance",
    title: "YÊU CẦU BẢO TRÌ",
    value: "04 đơn",
    icon: <FileTextOutlined style={{ fontSize: 22, color: "#fff" }} />,
    iconBg: colors.tertiary,
  },
] as const;

export default function CalendarSummaryCards() {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
      {SUMMARY.map((item) => (
        <Col xs={24} md={8} key={item.key}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
            }}
            styles={{ body: { padding: "18px 20px" } }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: item.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <div>
                <Text
                  type="secondary"
                  style={{ fontSize: 11, letterSpacing: "0.06em", fontWeight: 600 }}
                >
                  {item.title}
                </Text>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary }}>
                  {item.value}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
