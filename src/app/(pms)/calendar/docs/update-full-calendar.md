You are a senior frontend engineer.

Implement a calendar booking page UI based on the provided design.

---

## ⚠️ IMPORTANT RULES

* DO NOT create a new layout
* MODIFY existing layout (sidebar + header)
* Use Ant Design + FullCalendar
* Follow existing theme system
* Use Vietnamese UI text

---

## 🎯 Goal

Build a calendar booking page similar to the design with:
Improve UI:
- better spacing
- align header and filters
- improve calendar event readability
- make layout more balanced

* filter bar
* calendar month view
* booking blocks
* summary cards

---

## 🧩 1. Top Section (Header Area)

Create a section:

* Title: "Quản lý lịch đặt phòng"

* Sub info:

  * "12 phòng trống hôm nay"
  * "Cập nhật lúc 09:45"

---

## 🧩 2. Filter Bar

Use Ant Design components:

### Include:

* Segmented control:

  * "Tất cả"
  * "Đang thuê"
  * "Trống"

* View switch:

  * Tháng / Tuần / Ngày

* Multi-select dropdown:
  Label: "Khu vực"
  Options:

  * Villa Ocean
  * Hillside
  * Homestay

---

## 🧩 3. Calendar Section

Use FullCalendar (dayGridMonth)

---

### Config:

* locale: "vi"
* selectable: true
* editable: true

---

### Event UI:

* Format:
  [Room] Guest name

Example:
[V1-101] Nguyễn Văn A

---

### Styling:

* Rounded events
* Padding
* Use property color:

Ocean → blue
Hillside → purple
Homestay → orange

---

### Interaction:

* Click date → open booking modal
* Drag → update booking
* Resize → update duration

---

## 🧩 4. Overflow Handling

If too many events in a day:

* show "+X more"

---

## 🧩 5. Today Highlight

* Highlight current day with border or background

---

## 🧩 6. Legend (Top Right)

Show property colors:

* Ocean A (blue)
* Hillside B (purple)
* Homestay C (orange)

---

## 🧩 7. Summary Cards (Bottom)

Use Ant Design Card:

* Doanh thu dự kiến
* Tỷ lệ lấp đầy
* Yêu cầu bảo trì

---

## 🧩 8. Floating Action Button

Bottom right:

* "+" button
* Action: create booking

---

## 🎨 UI Requirements

* Clean dashboard style
* Proper spacing (16–24px)
* Rounded corners
* Soft shadows

---

## ⚙️ Code Requirements

* Use reusable components
* Split into:

  * CalendarSection
  * FilterBar
  * SummaryCards
* Keep code clean

---

## 🧪 Output

* Update calendar page
* Implement FullCalendar
* Add filter logic
* Add event styling

