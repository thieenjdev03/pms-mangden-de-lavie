"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Grid, Popconfirm, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import type { CustomerRow, CustomerStatus } from "@/lib/customers";
import { customerStatusLabel } from "@/lib/customers";
import { colors } from "@/lib/theme";
import { formatVnd } from "@/lib/utils";

const { Text } = Typography;

function statusTag(status: CustomerStatus) {
  if (status === "vip")
    return (
      <Tag color="success" style={{ margin: 0, borderRadius: 6 }}>
        {customerStatusLabel[status]}
      </Tag>
    );
  if (status === "normal")
    return (
      <Tag color="processing" style={{ margin: 0, borderRadius: 6 }}>
        {customerStatusLabel[status]}
      </Tag>
    );
  return (
    <Tag style={{ margin: 0, borderRadius: 6, color: colors.textSecondary, borderColor: colors.border }}>
      {customerStatusLabel[status]}
    </Tag>
  );
}

type CustomerTableProps = {
  dataSource: CustomerRow[];
  onEdit: (row: CustomerRow) => void;
  onDelete: (row: CustomerRow) => void;
};

export default function CustomerTable({ dataSource, onEdit, onDelete }: CustomerTableProps) {
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;

  const columns: ColumnsType<CustomerRow> = useMemo(() => {
    const compact: ColumnsType<CustomerRow> = [
      {
        title: "Khách hàng",
        key: "name",
        render: (_, row) => (
          <Space align="start" size={12}>
            <Avatar style={{ backgroundColor: row.avatarColor, flexShrink: 0 }}>{row.name.charAt(0)}</Avatar>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: colors.textPrimary }}>{row.name}</div>
              <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                {row.customerId}
              </Text>
              <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                {row.phone}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        title: "Trạng thái",
        key: "status",
        width: 120,
        render: (_, row) => statusTag(row.status),
      },
      {
        title: "Thao tác",
        key: "actions",
        width: 100,
        render: (_, row) => (
          <Space size={4}>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              aria-label="Sửa"
              onClick={() => onEdit(row)}
            />
            <Popconfirm
              title="Xóa khách hàng?"
              description="Thao tác này không thể hoàn tác."
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => onDelete(row)}
            >
              <Button type="text" size="small" danger icon={<DeleteOutlined />} aria-label="Xóa" />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    const full: ColumnsType<CustomerRow> = [
      {
        title: "Tên khách hàng",
        key: "name",
        render: (_, row) => (
          <Space align="start" size={12}>
            <Avatar style={{ backgroundColor: row.avatarColor, flexShrink: 0 }}>{row.name.charAt(0)}</Avatar>
            <div>
              <div style={{ fontWeight: 600, color: colors.textPrimary }}>{row.name}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {row.customerId}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        title: "Thông tin liên hệ",
        key: "contact",
        render: (_, row) => (
          <div>
            <div style={{ color: colors.textPrimary }}>{row.phone}</div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {row.email}
            </Text>
          </div>
        ),
      },
      {
        title: "Số lần đặt",
        dataIndex: "bookingCount",
        key: "bookingCount",
        width: 130,
        render: (n: number) => (
          <Tag
            color="blue"
            style={{
              margin: 0,
              borderRadius: 8,
              minWidth: 28,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {n}
          </Tag>
        ),
      },
      {
        title: "Tổng chi tiêu",
        dataIndex: "totalSpend",
        key: "totalSpend",
        width: 160,
        render: (v: number) => <span style={{ fontWeight: 600 }}>{formatVnd(v)}</span>,
      },
      {
        title: "Trạng thái",
        key: "status",
        width: 130,
        render: (_, row) => statusTag(row.status),
      },
      {
        title: "Hành động",
        key: "actions",
        width: 120,
        render: (_, row) => (
          <Space size={4}>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              aria-label="Sửa"
              onClick={() => onEdit(row)}
            />
            <Popconfirm
              title="Xóa khách hàng?"
              description="Thao tác này không thể hoàn tác."
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => onDelete(row)}
            >
              <Button type="text" size="small" danger icon={<DeleteOutlined />} aria-label="Xóa" />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return isMobile ? compact : full;
  }, [isMobile, onEdit, onDelete]);

  return (
    <Table<CustomerRow>
      columns={columns}
      dataSource={dataSource}
      rowKey="key"
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} trên ${total} khách hàng`,
      }}
      size="middle"
      scroll={{ x: isMobile ? 520 : "max-content" }}
    />
  );
}
