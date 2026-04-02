"use client";

import BookingCalendar from "@/components/calendar/BookingCalendar";
import CalendarLegend from "@/components/calendar/CalendarLegend";
import type { Booking, RoomWithVillaName, Villa } from "@/lib/data";
import type { CalendarViewMode } from "@/lib/calendarFilters";

type CalendarSectionProps = {
  bookings: Booking[];
  rooms: RoomWithVillaName[];
  villas: Villa[];
  calendarView: CalendarViewMode;
  onSelectRange: (range: { checkin: string; checkout: string }) => void;
  onEventDatesChange: (
    bookingId: string,
    checkin: string,
    checkout: string,
  ) => Promise<boolean>;
};

export default function CalendarSection({
  bookings,
  rooms,
  villas,
  calendarView,
  onSelectRange,
  onEventDatesChange,
}: CalendarSectionProps) {
  const legendItems = villas.map((v) => ({
    villaId: v.id,
    label: v.shortLabel ?? v.name,
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 12,
          minHeight: 32,
        }}
      >
        <CalendarLegend items={legendItems} />
      </div>
      <BookingCalendar
        bookings={bookings}
        rooms={rooms}
        calendarView={calendarView}
        onSelectRange={onSelectRange}
        onEventDatesChange={onEventDatesChange}
      />
    </div>
  );
}
