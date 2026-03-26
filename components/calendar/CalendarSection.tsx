"use client";

import BookingCalendar from "@/components/calendar/BookingCalendar";
import CalendarLegend from "@/components/calendar/CalendarLegend";
import type { Booking } from "@/lib/data";
import type { CalendarViewMode } from "@/lib/calendarFilters";

type CalendarSectionProps = {
  bookings: Booking[];
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
  calendarView,
  onSelectRange,
  onEventDatesChange,
}: CalendarSectionProps) {
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
        <CalendarLegend />
      </div>
      <BookingCalendar
        bookings={bookings}
        calendarView={calendarView}
        onSelectRange={onSelectRange}
        onEventDatesChange={onEventDatesChange}
      />
    </div>
  );
}
