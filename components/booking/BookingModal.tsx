"use client";

import { DatePicker, Form, Input, InputNumber, Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import type { Booking, CreateBookingPayload, Room } from "@/lib/data";
import { rooms as allRooms } from "@/lib/data";

export type BookingModalPrefill = {
  /** When omitted (e.g. range select on FullCalendar), user picks room in the form. */
  roomId?: string;
  checkin: string;
  /** Exclusive checkout date (FullCalendar all-day `end`); defaults to check-in + 1 day. */
  checkout?: string;
};

const copyVi = {
  title: "Đặt phòng mới",
  save: "Lưu",
  room: "Phòng",
  roomPh: "Chọn phòng",
  roomRequired: "Vui lòng chọn phòng",
  guest: "Tên khách",
  guestPh: "Họ tên khách",
  guestRequired: "Nhập tên khách",
  phone: "Số điện thoại",
  phonePh: "Số điện thoại",
  phoneRequired: "Nhập số điện thoại",
  checkin: "Ngày nhận phòng",
  checkinRequired: "Chọn ngày nhận phòng",
  checkout: "Ngày trả phòng",
  checkoutRequired: "Chọn ngày trả phòng",
  total: "Tổng tiền (VNĐ)",
  totalPh: "Tổng tiền",
  totalRequired: "Nhập tổng tiền",
  deposit: "Tiền cọc (VNĐ)",
  depositPh: "Tiền cọc (30% tổng)",
  success: "Đã tạo đặt phòng",
  errorSave: "Không thể lưu đặt phòng",
};

const copyEn = {
  title: "New booking",
  save: "Save",
  room: "Room",
  roomPh: "Room",
  roomRequired: "Select a room",
  guest: "Guest name",
  guestPh: "Guest name",
  guestRequired: "Enter guest name",
  phone: "Phone",
  phonePh: "Phone",
  phoneRequired: "Enter phone",
  checkin: "Check-in",
  checkinRequired: "Select check-in",
  checkout: "Check-out",
  checkoutRequired: "Select check-out",
  total: "Total (VND)",
  totalPh: "Total",
  totalRequired: "Enter total",
  deposit: "Deposit (VND)",
  depositPh: "Deposit (30% of total)",
  success: "Booking created",
  errorSave: "Could not save booking",
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  onCreateBooking: (data: CreateBookingPayload) => Promise<Booking>;
  onAfterCreate?: (booking: Booking) => void;
  initialPrefill?: BookingModalPrefill | null;
  /** Only these rooms in the dropdown (e.g. current property). Omit = all rooms. */
  roomsInScope?: Room[];
  /** UI language; default Vietnamese per product requirement. */
  vietnamese?: boolean;
};

type FormValues = {
  roomId: string;
  guest: string;
  phone: string;
  checkin: dayjs.Dayjs;
  checkout: dayjs.Dayjs;
  total: number;
  deposit?: number;
};

export default function BookingModal({
  open,
  onClose,
  onCreateBooking,
  onAfterCreate,
  initialPrefill,
  roomsInScope,
  vietnamese = true,
}: BookingModalProps) {
  const [form] = Form.useForm<FormValues>();
  const t = vietnamese ? copyVi : copyEn;
  const roomOptions = useMemo(
    () => (roomsInScope && roomsInScope.length > 0 ? roomsInScope : allRooms),
    [roomsInScope],
  );

  useEffect(() => {
    if (!open) return;
    if (initialPrefill?.checkin) {
      const ci = dayjs(initialPrefill.checkin);
      const co = initialPrefill.checkout
        ? dayjs(initialPrefill.checkout)
        : ci.add(1, "day");
      form.setFieldsValue({
        roomId: initialPrefill.roomId,
        checkin: ci,
        checkout: co,
        guest: undefined,
        phone: undefined,
        total: undefined,
        deposit: undefined,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        checkin: dayjs(),
        checkout: dayjs().add(1, "day"),
      });
    }
  }, [open, initialPrefill, form]);

  const submit = async () => {
    try {
      const v = await form.validateFields();
      const payload: CreateBookingPayload = {
        roomId: v.roomId,
        guest: v.guest,
        phone: v.phone,
        checkin: v.checkin.format("YYYY-MM-DD"),
        checkout: v.checkout.format("YYYY-MM-DD"),
        total: v.total,
        deposit: v.deposit,
      };
      const created = await onCreateBooking(payload);
      message.success(t.success);
      form.resetFields();
      onClose();
      onAfterCreate?.(created);
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in e) return;
      if (e instanceof Error && e.message === "conflict") return;
      message.error(t.errorSave);
    }
  };

  return (
    <Modal
      title={t.title}
      open={open}
      onCancel={onClose}
      onOk={submit}
      okText={t.save}
      destroyOnClose
      width={480}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 16 }}
        onValuesChange={(changed) => {
          if ("total" in changed && changed.total != null) {
            const n = Number(changed.total);
            if (!Number.isNaN(n) && n > 0) {
              form.setFieldValue("deposit", Math.round(n * 0.3));
            }
          }
        }}
      >
        <Form.Item
          name="roomId"
          label={t.room}
          rules={[{ required: true, message: t.roomRequired }]}
        >
          <Select
            placeholder={t.roomPh}
            options={roomOptions.map((r) => ({
              value: r.id,
              label: `${r.name} — ${r.property}`,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="guest"
          label={t.guest}
          rules={[{ required: true, message: t.guestRequired }]}
        >
          <Input placeholder={t.guestPh} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t.phone}
          rules={[{ required: true, message: t.phoneRequired }]}
        >
          <Input placeholder={t.phonePh} />
        </Form.Item>
        <Form.Item
          name="checkin"
          label={t.checkin}
          rules={[{ required: true, message: t.checkinRequired }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="checkout"
          label={t.checkout}
          rules={[{ required: true, message: t.checkoutRequired }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="total"
          label={t.total}
          rules={[{ required: true, message: t.totalRequired }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder={t.totalPh} />
        </Form.Item>
        <Form.Item name="deposit" label={t.deposit}>
          <InputNumber min={0} style={{ width: "100%" }} placeholder={t.depositPh} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
