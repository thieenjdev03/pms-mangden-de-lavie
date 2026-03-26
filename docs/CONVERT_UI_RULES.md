You are a senior frontend engineer.

I am building a Property Management System (PMS) using:

* Next.js (App Router)
* Ant Design
* FullCalendar

---

## 🎯 Task

Implement the calendar page UI based on the provided design.

IMPORTANT:

* DO NOT create a new page structure
* MODIFY existing components
* Keep current layout (sidebar + header)

---

## 📸 Reference UI

Use the attached image as the design reference.

---

## 🧠 Requirements

### 1. Filter Bar

* Multi-select property (Ant Design Select, mode=multiple)
* Label: "Chọn khu"
* Add status filter:

  * Tất cả
  * Đang thuê
  * Trống

---

### 2. Calendar (FullCalendar)

* Show bookings as events
* Event title format:
  [Room] Guest Name

Example:
[V1-101] Nguyễn Văn A

---

### 3. Color System

* Each property has a unique color:

  * Ocean → blue
  * Hillside → purple
  * Homestay → orange

---

### 4. Booking Item

* Rounded corners
* Padding
* Clean text
* Tooltip on hover:

  * Phone
  * Check-in / Check-out
  * Total price

---

### 5. UX

* Click date → open booking modal
* Drag event → update date
* Highlight today

---

### 6. Code Requirements

* Use reusable components
* Clean structure
* Use TypeScript
* Follow existing code style

---

## 🧪 Output

* Update Calendar page
* Update filter logic
* Update event rendering
* Keep code minimal and clean
