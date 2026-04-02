"use client";

import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, FloatButton, Spin, Typography, message } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BookingModal, { type BookingModalPrefill } from "@/components/booking/BookingModal";
import CalendarFilterBar from "@/components/calendar/CalendarFilterBar";
import CalendarPageHeader from "@/components/calendar/CalendarPageHeader";
import CalendarSection from "@/components/calendar/CalendarSection";
import CalendarSummaryCards from "@/components/calendar/CalendarSummaryCards";
import QRModal from "@/components/payment/QRModal";
import { hasRoomBookingConflict } from "@/lib/bookingConflict";
import type {
  CalendarOccupancyFilter,
  CalendarProperty,
  CalendarViewMode,
} from "@/lib/calendarFilters";
import {
  buildCalendarAreaOptions,
  filterBookingsByOccupancy,
  filterBookingsForRooms,
  getRoomsForProperties,
} from "@/lib/calendarFilters";
import type { Booking, CreateBookingPayload, RoomWithVillaName, Villa } from "@/lib/data";

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
  const [villas, setVillas] = useState<Villa[]>([]);
  const [rooms, setRooms] = useState<RoomWithVillaName[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<CalendarProperty[]>([]);
  const villaListKeyRef = useRef<string | null>(null);
  const [occupancyFilter, setOccupancyFilter] = useState<CalendarOccupancyFilter>("all");
  const [calendarView, setCalendarView] = useState<CalendarViewMode>("dayGridMonth");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingModalPrefill | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrAmount, setQrAmount] = useState(0);
  const [qrContent, setQrContent] = useState("");
  const [lastSynced, setLastSynced] = useState(() => dayjs().format("HH:mm"));

  const allVillaIds = useMemo(() => villas.map((v) => v.id), [villas]);
  const villaListKey = allVillaIds.join("|");

  const areaOptions = useMemo(() => buildCalendarAreaOptions(villas), [villas]);

  useEffect(() => {
    const currentIds = villas.map((v) => v.id);
    if (currentIds.length === 0) return;

    if (villaListKeyRef.current === null) {
      setSelectedProperties(currentIds);
      villaListKeyRef.current = villaListKey;
      return;
    }

    const prevIds = villaListKeyRef.current.split("|").filter(Boolean);
    const prevSet = new Set(prevIds);
    const brandNewIds = currentIds.filter((id) => !prevSet.has(id));
    villaListKeyRef.current = villaListKey;

    setSelectedProperties((p) => {
      const valid = new Set(currentIds);
      let next = p.filter((id) => valid.has(id));
      if (next.length === 0) next = [...currentIds];
      for (const id of brandNewIds) {
        if (!next.includes(id)) next = [...next, id];
      }
      return next;
    });
  }, [villaListKey, villas]);

  const roomsInScope = useMemo(
    () => getRoomsForProperties(selectedProperties, rooms),
    [selectedProperties, rooms],
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
    void Promise.all([fetch("/api/bookings"), fetch("/api/villas"), fetch("/api/rooms")]).then(
      async ([rb, rv, rr]) => {
        const b = (await rb.json()) as Booking[];
        const v = (await rv.json()) as Villa[];
        const r = (await rr.json()) as RoomWithVillaName[];
        if (!cancelled) {
          setBookings(b);
          setVillas(v);
          setRooms(r);
          setLastSynced(dayjs().format("HH:mm"));
        }
      },
    );
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
          padding: "clamp(16px, 4vw, 24px)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <CalendarPageHeader vacantRoomsToday={vacantRoomsToday} updatedAtLabel={lastSynced} />

        <CalendarFilterBar
          areaOptions={areaOptions}
          allVillaIds={allVillaIds}
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

        <CalendarShell
          bookings={filteredBookings}
          rooms={rooms}
          villas={villas}
          calendarView={calendarView}
          onSelectRange={({ checkin, checkout }) => {
            setPrefill({ checkin, checkout });
            setBookingModalOpen(true);
          }}
          onEventDatesChange={onEventDatesChange}
        />

        <CalendarSummaryCards />
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip="Tạo đặt phòng"
        onClick={openNewBooking}
        style={{
          right: 16,
          bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        }}
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
        rooms={rooms}
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
