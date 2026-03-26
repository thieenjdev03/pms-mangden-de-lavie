You are a senior frontend engineer.

Implement a dashboard page UI based on the provided design.

Tech stack:

* Next.js (App Router)
* Ant Design
* Recharts
* TypeScript

IMPORTANT:

* Modify existing layout (sidebar + header)
* Do NOT create a new layout
* Follow clean admin dashboard style

---

## 🎯 Goal

Build a PMS dashboard page including:

1. Summary cards
2. Revenue chart
3. Cleaning status panel
4. Upcoming bookings table

---

## 🧩 Layout Structure

Top section:

* Greeting text: "Chào buổi sáng, Admin!"

---

## 📊 1. Summary Cards

Create 4 cards using Ant Design Card + Statistic:

* Doanh thu tháng
* Tỷ lệ lấp đầy
* Booking mới
* Khách đang ở

Each card:

* icon
* number
* small trend text

---

## 📈 2. Revenue Chart

Use Recharts BarChart

* X-axis: days of week
* Y-axis: revenue
* Highlight current day

Card title:
"Biểu đồ doanh thu"

---

## 🧹 3. Cleaning Status Panel

Right side card:

List villas:

* Villa A101 → Đang dọn
* Villa B205 → Đã sẵn sàng
* Homestay C02 → Chờ dọn

Use:

* Tag (status)
* Icon

---

## 📋 4. Upcoming Bookings Table

Use Ant Design Table

Columns:

* Khách hàng
* Ngày nhận phòng
* Loại phòng
* Số khách
* Trạng thái

Status:

* Đã cọc
* Thanh toán
* Xác nhận

---

## 🎨 UI Style

* Use spacing (16–24px)
* Rounded cards
* Soft shadows
* Clean layout

---

## ⚙️ Behavior

* Data is static mock
* No API needed
* Focus on UI only

---

## 🧪 Output

* Dashboard page component
* Cards component
* Chart component
* Table component
* Clean reusable structure
