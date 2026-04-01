"use client";

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import viVN from "antd/locale/vi_VN";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import type { Expense } from "@/lib/data";
import { expenseTypeOptions, propertyOptions } from "@/lib/data";
import { formatVnd } from "@/lib/utils";

const { Title } = Typography;

const expenseTypeLabelVi: Record<string, string> = {
  Utilities: "Tiện ích",
  Supplies: "Vật tư",
  Maintenance: "Bảo trì",
  Other: "Khác",
};

type FormValues = {
  date: dayjs.Dayjs;
  property: string;
  type: string;
  amount: number;
};

export default function ExpensesPage() {
  const [rows, setRows] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<FormValues>();

  const load = useCallback(() => {
    void fetch("/api/expenses")
      .then((res) => res.json())
      .then((data: Expense[]) => setRows(data));
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/expenses")
      .then((res) => res.json())
      .then((data: Expense[]) => {
        if (!cancelled) setRows(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const columns: ColumnsType<Expense> = [
    { title: "Ngày", dataIndex: "date", key: "date", width: 120 },
    { title: "Khu / Cơ sở", dataIndex: "property", key: "property" },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 140,
      render: (t: string) => expenseTypeLabelVi[t] ?? t,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      width: 140,
      render: (v: number) => formatVnd(v),
    },
  ];

  const submit = async () => {
    try {
      const v = await form.validateFields();
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: v.date.format("YYYY-MM-DD"),
          property: v.property,
          type: v.type,
          amount: v.amount,
        }),
      });
      if (!res.ok) throw new Error("failed");
      message.success("Đã thêm chi phí");
      setOpen(false);
      form.resetFields();
      load();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in e) return;
      message.error("Không thể lưu chi phí");
    }
  };

  return (
    <ConfigProvider locale={viVN}>
      <Card
        bordered={false}
        style={{
          borderRadius: 14,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        }}
        styles={{ body: { padding: 24 } }}
      >
        <Space style={{ marginBottom: 16 }} align="center">
          <Title level={4} style={{ margin: 0 }}>
            Doanh thu & chi phí
          </Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
            Thêm chi phí
          </Button>
        </Space>
        <Table<Expense>
          rowKey="id"
          columns={columns}
          dataSource={[...rows].sort((a, b) => b.date.localeCompare(a.date))}
          pagination={{ pageSize: 10 }}
        />
        <Modal
          title="Thêm chi phí"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={submit}
          okText="Lưu"
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: 16 }}
            initialValues={{ date: dayjs() }}
          >
            <Form.Item
              name="date"
              label="Ngày"
              rules={[{ required: true, message: "Chọn ngày" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              name="property"
              label="Khu / Cơ sở"
              rules={[{ required: true, message: "Chọn khu" }]}
            >
              <Select
                options={propertyOptions.map((p) => ({ value: p, label: p }))}
                placeholder="Chọn khu"
              />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại"
              rules={[{ required: true, message: "Chọn loại" }]}
            >
              <Select
                options={expenseTypeOptions.map((t) => ({
                  value: t,
                  label: expenseTypeLabelVi[t] ?? t,
                }))}
                placeholder="Loại chi phí"
              />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Số tiền (VNĐ)"
              rules={[{ required: true, message: "Nhập số tiền" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} placeholder="Số tiền" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </ConfigProvider>
  );
}
