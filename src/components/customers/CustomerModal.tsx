"use client";

import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import type { CustomerRow, CustomerStatus } from "@/lib/customers";
import { customerStatusLabel } from "@/lib/customers";

const tagOptions = (Object.keys(customerStatusLabel) as CustomerStatus[]).map((v) => ({
  value: v,
  label: customerStatusLabel[v],
}));

export type CustomerFormValues = {
  name: string;
  phone?: string;
  email?: string;
  status: CustomerStatus;
  notes?: string;
};

type CustomerModalProps = {
  open: boolean;
  mode: "add" | "edit";
  initial?: CustomerRow | null;
  onCancel: () => void;
  onSubmit: (values: CustomerFormValues) => void;
};

export default function CustomerModal({
  open,
  mode,
  initial,
  onCancel,
  onSubmit,
}: CustomerModalProps) {
  const [form] = Form.useForm<CustomerFormValues>();

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && initial) {
      form.setFieldsValue({
        name: initial.name,
        phone: initial.phone,
        email: initial.email,
        status: initial.status,
        notes: initial.notes,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: "normal" });
    }
  }, [open, mode, initial, form]);

  const handleOk = async () => {
    try {
      const v = await form.validateFields();
      onSubmit(v);
    } catch {
      // validation errors — keep modal open
    }
  };

  return (
    <Modal
      title={mode === "add" ? "Thêm khách hàng" : "Sửa khách hàng"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Lưu"
      cancelText="Hủy"
      destroyOnClose
      centered
      width="min(480px, calc(100vw - 24px))"
      styles={{
        body: {
          maxHeight: "min(70vh, calc(100dvh - 220px))",
          overflowY: "auto",
          paddingTop: 16,
        },
      }}
    >
      <Form form={form} layout="vertical" requiredMark="optional">
        <Form.Item
          name="name"
          label="Tên khách hàng"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="Họ và tên" allowClear />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input placeholder="0xx xxx xxxx" allowClear />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Email không hợp lệ" }]}
        >
          <Input placeholder="email@example.com" allowClear />
        </Form.Item>
        <Form.Item name="status" label="Tag khách hàng" rules={[{ required: true }]}>
          <Select options={tagOptions} placeholder="Chọn tag" />
        </Form.Item>
        <Form.Item name="notes" label="Ghi chú">
          <Input.TextArea rows={3} placeholder="Ghi chú nội bộ..." showCount maxLength={500} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
