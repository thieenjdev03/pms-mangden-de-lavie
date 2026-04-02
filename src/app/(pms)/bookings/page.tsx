"use client";

import { Card, ConfigProvider, Typography } from "antd";
import viVN from "antd/locale/vi_VN";
import { useCallback, useEffect, useState } from "react";
import BookingTable from "@/components/booking/BookingTable";
import type { Booking, RoomWithVillaName } from "@/lib/data";

const { Title } = Typography;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<RoomWithVillaName[]>([]);

  const load = useCallback(() => {
    void Promise.all([fetch("/api/bookings"), fetch("/api/rooms")]).then(async ([rb, rr]) => {
      const b = (await rb.json()) as Booking[];
      const r = (await rr.json()) as RoomWithVillaName[];
      setBookings(b);
      setRooms(r);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([fetch("/api/bookings"), fetch("/api/rooms")]).then(async ([rb, rr]) => {
      const b = (await rb.json()) as Booking[];
      const r = (await rr.json()) as RoomWithVillaName[];
      if (!cancelled) {
        setBookings(b);
        setRooms(r);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ConfigProvider locale={viVN}>
      <Card
        bordered={false}
        style={{
          borderRadius: 14,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        }}
        styles={{ body: { padding: "clamp(16px, 4vw, 24px)" } }}
      >
        <Title level={4} style={{ marginTop: 0 }}>
          Đặt phòng
        </Title>
        <BookingTable bookings={bookings} rooms={rooms} onRefresh={load} />
      </Card>
    </ConfigProvider>
  );
}
