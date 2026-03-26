"use client";

import { Card, ConfigProvider, Typography } from "antd";
import viVN from "antd/locale/vi_VN";
import { useCallback, useEffect, useState } from "react";
import BookingTable from "@/components/booking/BookingTable";
import type { Booking } from "@/lib/data";

const { Title } = Typography;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const load = useCallback(() => {
    void fetch("/api/bookings")
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data));
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/bookings")
      .then((res) => res.json())
      .then((data: Booking[]) => {
        if (!cancelled) setBookings(data);
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
        styles={{ body: { padding: 24 } }}
      >
        <Title level={4} style={{ marginTop: 0 }}>
          Danh sách đặt phòng
        </Title>
        <BookingTable bookings={bookings} onRefresh={load} />
      </Card>
    </ConfigProvider>
  );
}
