"use client";

import type { EventInput } from "@fullcalendar/core";
import viLocale from "@fullcalendar/core/locales/vi";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import { Grid, Tooltip } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import type { Booking, RoomWithVillaName } from "@/lib/data";
import type { CalendarViewMode } from "@/lib/calendarFilters";
import { getCalendarEventAccent } from "@/lib/theme";

export function mapBookingsToEvents(
  bookings: Booking[],
  roomList: RoomWithVillaName[],
): EventInput[] {
  return bookings
    .filter((b) => b.status !== "cancelled")
    .map((b) => {
      const room = roomList.find((r) => r.id === b.roomId);
      const roomLabel = room?.label ?? b.roomId;
      const villaId = room?.villaId ?? "";
      const accent = getCalendarEventAccent(villaId);
      return {
        id: b.id,
        title: `[${roomLabel}] ${b.guest}`,
        start: b.checkin,
        end: b.checkout,
        allDay: true,
        classNames: ["calendar-event-pill"],
        extendedProps: { booking: b, roomLabel, villaId, accent },
      };
    });
}

function toDateOnly(d: Date): string {
  return dayjs(d).format("YYYY-MM-DD");
}

function formatVnd(n: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(n);
}

type BookingCalendarProps = {
  bookings: Booking[];
  rooms: RoomWithVillaName[];
  calendarView: CalendarViewMode;
  onSelectRange: (range: { checkin: string; checkout: string }) => void;
  onEventDatesChange: (
    bookingId: string,
    checkin: string,
    checkout: string,
  ) => Promise<boolean>;
};

export default function BookingCalendar({
  bookings,
  rooms,
  calendarView,
  onSelectRange,
  onEventDatesChange,
}: BookingCalendarProps) {
  const calRef = useRef<FullCalendar>(null);
  const events = useMemo(() => mapBookingsToEvents(bookings, rooms), [bookings, rooms]);
  const todayStr = dayjs().format("YYYY-MM-DD");
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;

  const contentHeight = useMemo(() => {
    if (isMobile) {
      return calendarView === "dayGridMonth" ? 440 : 400;
    }
    return calendarView === "dayGridMonth" ? 580 : 520;
  }, [isMobile, calendarView]);

  useEffect(() => {
    const api = calRef.current?.getApi();
    if (!api) return;
    const current = api.view.type;
    if (current !== calendarView) {
      api.changeView(calendarView);
    }
  }, [calendarView]);

  return (
    <div className="booking-calendar-card">
      <div className="booking-calendar-wrap">
        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={calendarView}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          locales={[viLocale]}
          locale="vi"
          buttonText={{
            today: "Hôm nay",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày",
          }}
          height="auto"
          contentHeight={contentHeight}
          selectable
          selectMirror
          editable
          eventResizableFromStart
          dayMaxEvents={3}
          moreLinkText={(num) => `+${num} nữa`}
          events={events}
          dayHeaderClassNames={(arg) => {
            const d = arg.date.getDay();
            return d === 0 || d === 6 ? ["calendar-weekend-header"] : [];
          }}
          dayCellClassNames={(arg) => {
            const d = dayjs(arg.date).format("YYYY-MM-DD");
            return d === todayStr ? ["calendar-cell-today"] : [];
          }}
          eventDidMount={(info) => {
            const accent = info.event.extendedProps.accent as string | undefined;
            if (accent) {
              info.el.style.setProperty("--event-accent", accent);
            }
          }}
          dateClick={(info) => {
            const checkin = info.dateStr;
            const checkout = dayjs(info.dateStr).add(1, "day").format("YYYY-MM-DD");
            onSelectRange({ checkin, checkout });
          }}
          select={(info) => {
            const checkin = info.startStr.slice(0, 10);
            const checkout = info.endStr.slice(0, 10);
            info.view.calendar.unselect();
            onSelectRange({ checkin, checkout });
          }}
          eventContent={(arg) => {
            const booking = arg.event.extendedProps.booking as Booking | undefined;
            const inner = (
              <div className="fc-event-main-frame" style={{ overflow: "hidden", minWidth: 0 }}>
                <div className="fc-event-title-container">
                  <div className="fc-event-title fc-sticky">{arg.event.title}</div>
                </div>
              </div>
            );
            if (!booking) return inner;
            const tip = (
              <div style={{ lineHeight: 1.65, maxWidth: 280 }}>
                <div>Điện thoại: {booking.phone}</div>
                <div>
                  Nhận phòng / Trả phòng: {booking.checkin} → {booking.checkout}
                </div>
                <div>Tổng tiền: {formatVnd(booking.total)}</div>
              </div>
            );
            return (
              <Tooltip title={tip} mouseEnterDelay={0.35} placement="topLeft">
                {inner}
              </Tooltip>
            );
          }}
          eventDrop={async (info) => {
            const id = info.event.id;
            const start = info.event.start;
            if (!start) {
              info.revert();
              return;
            }
            const checkin = toDateOnly(start);
            const endDate =
              info.event.end ?? dayjs(start).add(1, "day").toDate();
            const checkout = toDateOnly(endDate);
            const ok = await onEventDatesChange(id, checkin, checkout);
            if (!ok) info.revert();
          }}
          eventResize={async (info) => {
            const id = info.event.id;
            const start = info.event.start;
            const end = info.event.end;
            if (!start || !end) {
              info.revert();
              return;
            }
            const checkin = toDateOnly(start);
            const checkout = toDateOnly(end);
            const ok = await onEventDatesChange(id, checkin, checkout);
            if (!ok) info.revert();
          }}
        />
      </div>
    </div>
  );
}
