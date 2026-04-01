"use client";

import { Avatar, Button, Card, Col, Grid, Input, Row, Space, Typography, message } from "antd";
import { useCallback, useMemo, useState } from "react";
import type { CustomerRow, CustomerStatus } from "@/lib/customers";
import { INITIAL_CUSTOMERS } from "@/lib/customers";
import { colors } from "@/lib/theme";
import CustomerModal, { type CustomerFormValues } from "./CustomerModal";
import CustomerStats, { type CustomerStatsData } from "./CustomerStats";
import CustomerTable from "./CustomerTable";

const { Title, Paragraph, Text } = Typography;

const AVATAR_PALETTE = ["#1677FF", "#5B76B2", "#D45500", "#52C41A", "#722ED1", "#13C2C2", "#EB2F96", "#FA8C16"];

function nextCustomerId(rows: CustomerRow[]): string {
  const nums = rows
    .map((r) => parseInt(r.customerId.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `KH-${String(max + 1).padStart(3, "0")}`;
}

function pickAvatarColor(index: number): string {
  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

function buildStats(rows: CustomerRow[]): CustomerStatsData {
  const total = rows.length;
  const vip = rows.filter((r) => r.status === "vip").length;
  const avgSpend = total ? Math.round(rows.reduce((s, r) => s + r.totalSpend, 0) / total) : 0;
  const newThisMonth = rows.filter((r) => r.status === "new").length;
  return {
    total,
    totalTrend: "+12%",
    vip,
    vipTrend: "+8%",
    avgSpend,
    avgTrend: "Ổn định",
    newThisMonth,
    newTrend: "-5%",
  };
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editing, setEditing] = useState<CustomerRow | null>(null);

  const stats = useMemo(() => buildStats(customers), [customers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
        c.email.toLowerCase().includes(q),
    );
  }, [customers, search]);

  const openAdd = () => {
    setModalMode("add");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (row: CustomerRow) => {
    setModalMode("edit");
    setEditing(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = useCallback(
    (values: CustomerFormValues) => {
      if (modalMode === "add") {
        setCustomers((prev) => {
          const row: CustomerRow = {
            key: `k-${Date.now()}`,
            customerId: nextCustomerId(prev),
            name: values.name.trim(),
            phone: values.phone?.trim() ?? "",
            email: values.email?.trim() ?? "",
            bookingCount: 0,
            totalSpend: 0,
            status: values.status,
            notes: values.notes?.trim(),
            avatarColor: pickAvatarColor(prev.length),
          };
          return [...prev, row];
        });
        message.success("Đã thêm khách hàng");
      } else if (editing) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.key === editing.key
              ? {
                  ...c,
                  name: values.name.trim(),
                  phone: values.phone?.trim() ?? "",
                  email: values.email?.trim() ?? "",
                  status: values.status as CustomerStatus,
                  notes: values.notes?.trim(),
                }
              : c,
          ),
        );
        message.success("Đã cập nhật khách hàng");
      }
      closeModal();
    },
    [modalMode, editing],
  );

  const handleDelete = (row: CustomerRow) => {
    setCustomers((prev) => prev.filter((c) => c.key !== row.key));
    message.success("Đã xóa khách hàng");
  };

  const handleExport = () => {
    message.success("Đã xuất báo cáo (demo)");
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: `0 0 8px`, color: colors.textPrimary }}>
          Quản lý khách hàng
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0, maxWidth: 640 }}>
          Lưu trữ và quản lý thông tin khách hàng chuyên sâu cho hệ thống nghỉ dưỡng.
        </Paragraph>
      </div>

      <CustomerStats data={stats} />

      <Card
        bordered={false}
        style={{
          borderRadius: 14,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
          marginBottom: 24,
        }}
        styles={{ body: { padding: "clamp(16px, 4vw, 24px)" } }}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Space
            direction={isMobile ? "vertical" : "horizontal"}
            wrap
            style={{ width: "100%", justifyContent: isMobile ? "stretch" : "space-between" }}
            size="middle"
          >
            <Input.Search
              placeholder="Tìm tên, số điện thoại..."
              allowClear
              style={{ maxWidth: isMobile ? "100%" : 360, width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Space wrap style={isMobile ? { width: "100%" } : undefined}>
              <Button onClick={handleExport} block={isMobile}>
                Xuất báo cáo
              </Button>
              <Button type="primary" onClick={openAdd} block={isMobile}>
                Thêm khách hàng
              </Button>
            </Space>
          </Space>
          <CustomerTable dataSource={filtered} onEdit={openEdit} onDelete={handleDelete} />
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title="Ưu đãi khách VIP"
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
              height: "100%",
            }}
          >
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
              Tự động áp dụng giảm giá và quà tặng cho khách VIP khi đặt phòng lần tiếp theo.
            </Paragraph>
            <Button type="default">Cấu hình tự động</Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Báo cáo khách hàng mới"
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
              height: "100%",
            }}
          >
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
              Theo dõi xu hướng đăng ký và lượt đặt đầu tiên trong tháng.
            </Paragraph>
            {customers.some((c) => c.status === "new") ? (
              <Avatar.Group max={{ count: 5 }}>
                {customers
                  .filter((c) => c.status === "new")
                  .map((c) => (
                    <Avatar key={c.key} style={{ backgroundColor: c.avatarColor }}>
                      {c.name.charAt(0)}
                    </Avatar>
                  ))}
              </Avatar.Group>
            ) : (
              <Text type="secondary">Chưa có khách mới</Text>
            )}
          </Card>
        </Col>
      </Row>

      <CustomerModal
        open={modalOpen}
        mode={modalMode}
        initial={editing}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
