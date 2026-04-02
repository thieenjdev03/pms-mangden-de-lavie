"use client";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Grid, Input, Select, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { hasRoomBookingConflict } from "@/lib/bookingConflict";
import type { Booking, CreateBookingPayload, RoomWithVillaName } from "@/lib/data";
import { formatVnd } from "@/lib/utils/format-price";
import BookingModal from "./BookingModal";

type Row = Booking & { roomLabel: string };

const statusColor: Record<string, string> = {
  confirmed: "green",
  pending: "gold",
  cancelled: "default",
};

const statusLabelVi: Record<string, string> = {
  confirmed: "Đã xác nhận",
  pending: "Chờ",
  cancelled: "Đã hủy",
};

type BookingTableProps = {
  bookings: Booking[];
  rooms: RoomWithVillaName[];
  onRefresh: () => void;
};

export default function BookingTable({ bookings, rooms, onRefresh }: BookingTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;

  const data: Row[] = useMemo(() => {
    return bookings.map((b) => {
      const room = rooms.find((r) => r.id === b.roomId);
      return {
        ...b,
        roomLabel: room?.label ?? b.roomId,
      };
    });
  }, [bookings, rooms]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      if (status !== "all" && row.status !== status) return false;
      if (!q) return true;
      return (
        row.guest.toLowerCase().includes(q) ||
        row.phone.includes(q) ||
        row.roomLabel.toLowerCase().includes(q)
      );
    });
  }, [data, search, status]);

  const columns: ColumnsType<Row> = [
    { title: "Phòng", dataIndex: "roomLabel", key: "room", width: 160 },
    { title: "Khách", dataIndex: "guest", key: "guest" },
    { title: "Điện thoại", dataIndex: "phone", key: "phone", width: 130 },
    { title: "Nhận phòng", dataIndex: "checkin", key: "checkin", width: 110 },
    { title: "Trả phòng", dataIndex: "checkout", key: "checkout", width: 110 },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: 130,
      render: (v: number) => formatVnd(v),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (s: string) => (
        <Tag color={statusColor[s] ?? "default"}>{statusLabelVi[s] ?? s}</Tag>
      ),
    },
  ];

  const onCreateBooking = async (data: CreateBookingPayload): Promise<Booking> => {
    if (hasRoomBookingConflict(data.roomId, data.checkin, data.checkout, bookings)) {
      message.error("Phòng đã được đặt trong khoảng thời gian này");
      throw new Error("conflict");
    }
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, status: "confirmed" }),
    });
    if (!res.ok) throw new Error("request failed");
    const json = (await res.json()) as { booking: Booking };
    onRefresh();
    return json.booking;
  };

  return (
    <>
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        wrap
        style={{ marginBottom: 16, width: "100%" }}
        size="middle"
      >
        <Input
          allowClear
          placeholder="Tìm khách, SĐT, phòng"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: isMobile ? "100%" : 280, maxWidth: "100%" }}
        />
        <Select
          value={status}
          onChange={setStatus}
          style={{ width: isMobile ? "100%" : 180, maxWidth: "100%" }}
          options={[
            { value: "all", label: "Mọi trạng thái" },
            { value: "confirmed", label: "Đã xác nhận" },
            { value: "pending", label: "Chờ" },
            { value: "cancelled", label: "Đã hủy" },
          ]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
          block={isMobile}
        >
          Đặt phòng mới
        </Button>
      </Space>
      <Table<Row>
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        pagination={{
          pageSize: 10,
          showSizeChanger: !isMobile,
        }}
        scroll={{ x: 900 }}
      />
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPrefill={null}
        onCreateBooking={onCreateBooking}
        rooms={rooms}
        vietnamese
      />
    </>
  );
}
