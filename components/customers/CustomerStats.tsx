"use client";

import { Card, Col, Row, Tag, Typography } from "antd";
import { colors } from "@/lib/theme";

const { Text } = Typography;

export type CustomerStatsData = {
  total: number;
  totalTrend: string;
  vip: number;
  vipTrend: string;
  avgSpend: number;
  avgTrend: string;
  newThisMonth: number;
  newTrend: string;
};

function formatVndShort(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(".", ",")} tr`;
  }
  return new Intl.NumberFormat("vi-VN").format(n);
}

type CustomerStatsProps = {
  data: CustomerStatsData;
};

export default function CustomerStats({ data }: CustomerStatsProps) {
  const cards = [
    {
      title: "Tổng khách hàng",
      value: String(data.total),
      trend: data.totalTrend,
      trendPositive: data.totalTrend.startsWith("+"),
    },
    {
      title: "Khách hàng VIP",
      value: String(data.vip),
      trend: data.vipTrend,
      trendPositive: data.vipTrend.startsWith("+"),
    },
    {
      title: "Chi tiêu trung bình",
      value: `${formatVndShort(data.avgSpend)} ₫`,
      trend: data.avgTrend,
      trendPositive: data.avgTrend.startsWith("+"),
    },
    {
      title: "Khách mới (tháng)",
      value: String(data.newThisMonth),
      trend: data.newTrend,
      trendPositive: data.newTrend.startsWith("+"),
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      {cards.map((c) => (
        <Col xs={24} sm={12} xl={6} key={c.title}>
          <Card
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
            }}
            styles={{ body: { padding: "20px 20px" } }}
          >
            <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 8 }}>
              {c.title}
            </Text>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: colors.textPrimary,
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              {c.value}
            </div>
            <Tag
              color={c.trend === "Ổn định" ? "default" : c.trendPositive ? "success" : "error"}
              style={{ margin: 0, borderRadius: 6 }}
            >
              {c.trend}
            </Tag>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
