You are a senior frontend engineer. Help me implement a booking calendar using FullCalendar in a Next.js (App Router) project with Ant Design.

## 🎯 Goal

Replace custom calendar grid with FullCalendar to:

* Display bookings as blocks
* Support multiple rooms (group by room)
* Click to create booking
* Drag & resize booking

---

## 📦 Step 1: Install FullCalendar

Install:

* @fullcalendar/react
* @fullcalendar/daygrid
* @fullcalendar/timegrid
* @fullcalendar/interaction

---

## 🧱 Step 2: Create Calendar Component

File: components/calendar/BookingCalendar.tsx

---

## 🧠 Data Mapping

Bookings format:

{
id,
roomId,
guestName,
checkin,
checkout
}

---

## Convert to FullCalendar event:

{
id,
title: guestName,
start: checkin,
end: checkout
}

---

## 🧱 Step 3: Show Multiple Rooms

Use:

* resource-like grouping (fake by prefix title OR split view)

OR

Simplify MVP:

* show all bookings in one calendar
* prefix title:

Example:
"V1-101 - Nguyễn Văn A"

---

## 🧱 Step 4: Calendar Config

Use:

* dayGridMonth
* interaction plugin

Features:

* selectable: true
* editable: true
* eventResizableFromStart: true

---

## 🧱 Step 5: Click to Create Booking

Use:

select(info)

* open BookingModal
* prefill:

  * checkin = info.start
  * checkout = info.end

---

## 🧱 Step 6: Drag / Resize Booking

Use:

eventDrop
eventResize

Update booking state

---

## 🧱 Step 7: Vietnamese UI

Set:

* locale = "vi"
* buttonText:

  * today: "Hôm nay"
  * month: "Tháng"
  * week: "Tuần"

---

## 🧱 Step 8: Styling

* Use Ant Design container
* Add padding
* Clean UI

---

## 🧪 Output Required

Generate:

1. BookingCalendar component
2. Example integration with page
3. Mapping bookings → events
4. Handlers:

   * select
   * eventDrop
   * eventResize

Keep code simple and ready to run.
