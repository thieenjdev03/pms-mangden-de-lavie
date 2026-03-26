"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Card, ConfigProvider, FloatButton, Spin, Typography, message } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookingModal, { type BookingModalPrefill } from "@/components/booking/BookingModal";
import CalendarFilterBar from "@/components/calendar/CalendarFilterBar";
import CalendarPageHeader from "@/components/calendar/CalendarPageHeader";
import CalendarSection from "@/components/calendar/CalendarSection";
import CalendarSummaryCards from "@/components/calendar/CalendarSummaryCards";
import QRModal from "@/components/payment/QRModal";
import type { CalendarOccupancyFilter, CalendarProperty, CalendarViewMode } from "@/lib/calendarFilters";
import {
  CALENDAR_PROPERTIES,
  filterBookingsByOccupancy,
  filterBookingsForRooms,
  getRoomsForProperties,
} from "@/lib/calendarFilters";
import { hasRoomBookingConflict } from "@/lib/bookingConflict";
import type { Booking, CreateBookingPayload } from "@/lib/data";
import { colors } from "@/lib/theme";

dayjs.locale("vi");

const CalendarShell = dynamic(() => import("@/components/calendar/CalendarSection"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 48, textAlign: "center" }}>
      <Spin size="large" />
    </div>
  ),
});

const { Text } = Typography;

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<CalendarProperty[]>([
    ...CALENDAR_PROPERTIES,
  ]);
  const [occupancyFilter, setOccupancyFilter] = useState<CalendarOccupancyFilter>("all");
  const [calendarView, setCalendarView] = useState<CalendarViewMode>("dayGridMonth");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingModalPrefill | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrAmount, setQrAmount] = useState(0);
  const [qrContent, setQrContent] = useState("");
  const [lastSynced, setLastSynced] = useState(() => dayjs().format("HH:mm"));

  const roomsInScope = useMemo(
    () => getRoomsForProperties(selectedProperties),
    [selectedProperties],
  );

  const filteredBookings = useMemo(() => {
    const forRooms = filterBookingsForRooms(bookings, roomsInScope);
    return filterBookingsByOccupancy(forRooms, occupancyFilter);
  }, [bookings, roomsInScope, occupancyFilter]);

  const vacantRoomsToday = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const busy = new Set(
      bookings
        .filter((b) => b.status !== "cancelled")
        .filter((b) => b.checkin <= today && b.checkout > today)
        .map((b) => b.roomId),
    );
    return roomsInScope.filter((r) => !busy.has(r.id)).length;
  }, [bookings, roomsInScope]);

  const refreshBookings = useCallback(() => {
    void fetch("/api/bookings")
      .then((res) => res.json())
      .then((data: Booking[]) => {
        setBookings(data);
        setLastSynced(dayjs().format("HH:mm"));
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/bookings")
      .then((res) => res.json())
      .then((data: Booking[]) => {
        if (!cancelled) {
          setBookings(data);
          setLastSynced(dayjs().format("HH:mm"));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
    refreshBookings();
    return json.booking;
  };

  const onAfterCreate = (booking: Booking) => {
    const amount =
      booking.deposit != null && booking.deposit > 0
        ? booking.deposit
        : Math.round(booking.total * 0.3);
    setQrAmount(amount);
    setQrContent(`BOOK-${booking.id}`);
    setQrOpen(true);
  };

  const onEventDatesChange = async (
    bookingId: string,
    checkin: string,
    checkout: string,
  ): Promise<boolean> => {
    const b = bookings.find((x) => x.id === bookingId);
    if (!b) return false;
    if (hasRoomBookingConflict(b.roomId, checkin, checkout, bookings, bookingId)) {
      message.error("Phòng đã được đặt trong khoảng thời gian này");
      return false;
    }
    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkin, checkout }),
    });
    if (!res.ok) {
      message.error("Không thể cập nhật đặt phòng");
      return false;
    }
    refreshBookings();
    return true;
  };

  const openNewBooking = useCallback(() => {
    const checkin = dayjs().format("YYYY-MM-DD");
    const checkout = dayjs().add(1, "day").format("YYYY-MM-DD");
    setPrefill({ checkin, checkout });
    setBookingModalOpen(true);
  }, []);

  return (
    <ConfigProvider locale={viVN}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 24,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <CalendarPageHeader vacantRoomsToday={vacantRoomsToday} updatedAtLabel={lastSynced} />

        <CalendarFilterBar
          selectedProperties={selectedProperties}
          onPropertiesChange={setSelectedProperties}
          occupancyFilter={occupancyFilter}
          onOccupancyFilterChange={setOccupancyFilter}
          calendarView={calendarView}
          onCalendarViewChange={setCalendarView}
        />

        <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 13 }}>
          Bấm ngày hoặc kéo khoảng thời gian để tạo đặt phòng. Kéo / kéo dài sự kiện để đổi ngày.
          {occupancyFilter === "vacant"
            ? " Chế độ Trống: ẩn booking để chọn ngày trống."
            : null}
          {occupancyFilter === "occupied"
            ? " Đang thuê: chỉ booking có ngày lưu trú gồm hôm nay."
            : null}
        </Text>

        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            boxShadow: "none",
          }}
          styles={{ body: { padding: 16 } }}
        >
          <CalendarShell
            bookings={filteredBookings}
            calendarView={calendarView}
            onSelectRange={({ checkin, checkout }) => {
              setPrefill({ checkin, checkout });
              setBookingModalOpen(true);
            }}
            onEventDatesChange={onEventDatesChange}
          />
        </Card>

        <CalendarSummaryCards />
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip="Tạo đặt phòng"
        onClick={openNewBooking}
        style={{ right: 32, bottom: 32 }}
      />

      <BookingModal
        open={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setPrefill(null);
        }}
        initialPrefill={prefill}
        onCreateBooking={onCreateBooking}
        onAfterCreate={onAfterCreate}
        roomsInScope={roomsInScope}
        vietnamese
      />
      <QRModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        amount={qrAmount}
        transferContent={qrContent}
        vietnamese
      />
    </ConfigProvider>
  );
}
