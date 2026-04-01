"use client";

import {
  ArrowUpOutlined,
  CheckCircleFilled,
  DollarOutlined,
  ExclamationCircleFilled,
  HomeOutlined,
  LoadingOutlined,
  PlusOutlined,
  RiseOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  FloatButton,
  Grid,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  MOCK_CLEANING_ROWS,
  MOCK_GREETING_SUB,
  MOCK_KPIS,
  MOCK_REVENUE_BARS,
  MOCK_UPCOMING_BOOKINGS,
  type MockUpcomingBooking,
} from "@/lib/dashboardMock";
import { colors } from "@/lib/theme";

const { Title, Text } = Typography;

const kpiIconMap: Record<string, ReactNode> = {
  revenue: <DollarOutlined style={{ color: "#fff", fontSize: 20 }} />,
  occupancy: <RiseOutlined style={{ color: "#fff", fontSize: 20 }} />,
  newBookings: <HomeOutlined style={{ color: "#fff", fontSize: 20 }} />,
  guests: <TeamOutlined style={{ color: "#fff", fontSize: 20 }} />,
};

function greetingLine(): string {
  const h = new Date().getHours();
  if (h < 12) return "Chào buổi sáng, Admin!";
  if (h < 18) return "Chào buổi chiều, Admin!";
  return "Chào buổi tối, Admin!";
}

function cleaningIcon(status: (typeof MOCK_CLEANING_ROWS)[number]["status"]) {
  if (status === "ready")
    return <CheckCircleFilled style={{ color: "#52C41A", fontSize: 18 }} />;
  if (status === "waiting")
    return <ExclamationCircleFilled style={{ color: "#FF4D4F", fontSize: 18 }} />;
  return <LoadingOutlined style={{ color: "#AD6800", fontSize: 18 }} />;
}

const statusTag = (s: MockUpcomingBooking["status"]) => {
  if (s === "deposited")
    return (
      <Tag color="processing" style={{ margin: 0, fontWeight: 600 }}>
        ĐÃ CỌC
      </Tag>
    );
  if (s === "paid")
    return (
      <Tag color="success" style={{ margin: 0, fontWeight: 600 }}>
        THANH TOÁN
      </Tag>
    );
  return (
    <Tag color="error" style={{ margin: 0, fontWeight: 600 }}>
      XÁC NHẬN
    </Tag>
  );
};

export default function DashboardOverview() {
  const router = useRouter();
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;

  const columns: ColumnsType<MockUpcomingBooking> = useMemo(
    () => [
      {
        title: "KHÁCH HÀNG",
        dataIndex: "guest",
        key: "guest",
        render: (_, row) => (
          <Space align="start" size={12}>
            <Avatar style={{ backgroundColor: row.avatarColor, flexShrink: 0 }}>
              {row.guest.charAt(0)}
            </Avatar>
            <div>
              <div style={{ fontWeight: 600, color: colors.textPrimary }}>{row.guest}</div>
              <Text type="secondary" style={{ fontSize: 13 }}>
                {row.email}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        title: "NGÀY NHẬN PHÒNG",
        dataIndex: "arrival",
        key: "arrival",
        width: 200,
      },
      {
        title: "LOẠI PHÒNG",
        dataIndex: "room",
        key: "room",
        ellipsis: true,
      },
      {
        title: "SỐ KHÁCH",
        dataIndex: "guests",
        key: "guests",
        width: 110,
        render: (n: number) => `${n} người`,
      },
      {
        title: "TRẠNG THÁI",
        key: "status",
        width: 140,
        render: (_, row) => statusTag(row.status),
      },
      {
        title: "THAO TÁC",
        key: "action",
        width: 100,
        render: () => (
          <Button type="link" size="small" style={{ padding: 0 }}>
            Chi tiết
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: `0 0 8px`, color: colors.textPrimary }}>
          {greetingLine()}
        </Title>
        <Space size={24} wrap>
          <Text type="secondary">
            <ArrowUpOutlined style={{ marginRight: 6, color: colors.primary }} />
            {MOCK_GREETING_SUB.newCheckIns} lượt check-in mới
          </Text>
          <Text type="secondary">
            Hôm nay có {MOCK_GREETING_SUB.roomsNeedCleaning} phòng cần dọn dẹp
          </Text>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {MOCK_KPIS.map((kpi) => (
          <Col xs={24} sm={12} xl={6} key={kpi.key}>
            <Card
              bordered={false}
              style={{
                borderRadius: 14,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
              }}
              styles={{ body: { padding: "20px 20px" } }}
            >
              <Space align="start" size={14}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: kpi.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {kpiIconMap[kpi.key]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {kpi.title}
                  </Text>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: colors.textPrimary,
                      lineHeight: 1.3,
                    }}
                  >
                    {kpi.value}
                  </div>
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>{kpi.hint}</Text>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title="Biểu đồ Doanh thu"
            bordered={false}
            extra={
              <Space>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  7 ngày gần nhất
                </Text>
                <Button size="small" type="default">
                  Tháng này
                </Button>
              </Space>
            }
            style={{
              borderRadius: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 8,
                minHeight: 220,
                paddingTop: 16,
              }}
            >
              {MOCK_REVENUE_BARS.map((bar) => (
                <div
                  key={bar.label}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 44,
                      height: bar.height,
                      borderRadius: 8,
                      background: bar.active ? colors.primary : "rgba(22, 119, 255, 0.2)",
                      transition: "background 0.2s",
                    }}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {bar.label}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Trạng thái dọn dẹp"
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
              height: "100%",
            }}
            styles={{ body: { paddingBottom: 12 } }}
          >
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {MOCK_CLEANING_ROWS.map((row) => (
                <div
                  key={row.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "4px 0",
                  }}
                >
                  {cleaningIcon(row.status)}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: colors.textPrimary }}>{row.name}</div>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {row.statusLabel}
                    </Text>
                  </div>
                </div>
              ))}
            </Space>
            <Button block style={{ marginTop: 16 }} href="/bookings">
              Xem tất cả phòng
            </Button>
          </Card>
        </Col>
      </Row>

      <Card
        title="Booking sắp đến"
        bordered={false}
        style={{
          borderRadius: 14,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
          position: "relative",
        }}
        styles={{
          header: {
            flexWrap: "wrap",
            rowGap: 8,
            alignItems: "flex-start",
          },
        }}
        extra={
          <Space wrap size="small">
            <Button size="small" type="primary">
              Hôm nay
            </Button>
            <Button size="small">Ngày mai</Button>
          </Space>
        }
      >
        <Table<MockUpcomingBooking>
          columns={columns}
          dataSource={MOCK_UPCOMING_BOOKINGS}
          pagination={false}
          size="middle"
          scroll={{ x: 960 }}
        />
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/bookings" style={{ color: colors.primary, fontWeight: 500 }}>
            Xem toàn bộ danh sách đặt phòng
          </Link>
        </div>
      </Card>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip="Đặt phòng mới"
        onClick={() => router.push("/bookings")}
        style={{
          right: isMobile ? 16 : 48,
          bottom: isMobile ? "calc(16px + env(safe-area-inset-bottom, 0px))" : 48,
        }}
      />
    </div>
  );
}
