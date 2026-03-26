You are a senior frontend engineer. Help me setup a Next.js (App Router) project using Ant Design for a Property Management System (PMS).

## 🎯 Goal

Build a clean, scalable admin dashboard UI for managing:

* Rooms
* Bookings
* Calendar
* Payments (QR)
* Expenses
* Dashboard overview

This is an internal tool (desktop-first, no mobile needed).

---

## ⚙️ Tech Stack

* Next.js (App Router, TypeScript)
* Ant Design
* Dayjs
* Tailwind (optional, minimal usage)

---

## 📦 Step 1: Install & Setup Ant Design

* Install dependencies:

  * antd
  * @ant-design/icons
* Configure Ant Design in Next.js App Router
* Enable CSS properly (important for Next 13+)

---

## 🗂️ Step 2: Project Structure

Create this structure:

app/
layout.tsx
page.tsx (dashboard)

bookings/
page.tsx

calendar/
page.tsx

expenses/
page.tsx

components/
layout/
AppLayout.tsx
Sidebar.tsx
Header.tsx

booking/
BookingTable.tsx
BookingModal.tsx

calendar/
CalendarGrid.tsx

payment/
QRModal.tsx

lib/
data.ts
utils.ts

---

## 🧱 Step 3: Main Layout (IMPORTANT)

Build a dashboard layout using Ant Design Layout:

* Sidebar (Sider)
* Header
* Content

### Sidebar menu:

* Dashboard
* Calendar
* Bookings
* Expenses

### Requirements:

* Collapsible sidebar
* Highlight active route
* Clean spacing
* Desktop optimized

---

## 🖥️ Step 4: Dashboard Page

Create a simple dashboard using Ant Design components:

* Cards (Statistic):

  * Rooms occupied
  * Check-in today
  * Revenue today
  * Profit

Use:

* Card
* Row / Col
* Statistic

---

## 📅 Step 5: Calendar Page (IMPORTANT)

Create a custom calendar grid (NOT Antd calendar):

* Table-like layout:

  * Rows = Rooms
  * Columns = Dates (7 days)
* Use:

  * Table OR custom div grid
* Show:

  * Red cell → booked
  * Green cell → available

Add:

* Horizontal scroll
* Sticky header

---

## 📋 Step 6: Booking Management

Create BookingTable:

* Use Ant Design Table
* Columns:

  * Room
  * Guest
  * Phone
  * Checkin
  * Checkout
  * Total
  * Status

Add:

* Filters
* Search input
* Pagination

---

## 🧾 Step 7: Booking Modal

Use Ant Design Modal + Form:

Fields:

* Room (Select)
* Guest name
* Phone
* Checkin (DatePicker)
* Checkout (DatePicker)
* Total
* Deposit

Requirements:

* Validate required fields
* Submit → call API

---

## 💰 Step 8: QR Payment Modal

Create QRModal:

* Show QR image using:
  https://img.vietqr.io/image/{bank}-{account}-compact.png
* Show:

  * Amount
  * Transfer content
* Add:

  * Copy button

---

## 💸 Step 9: Expense Page

* Simple table
* Add expense form
* Fields:

  * Date
  * Property
  * Type
  * Amount

---

## 🎨 Step 10: UI/UX Rules

* Clean admin dashboard style
* Use spacing (padding 16–24px)
* Avoid clutter
* Use consistent colors:

  * Red = booked
  * Green = available

---

## 🚀 Output Required

Generate:

1. Ant Design setup code
2. AppLayout component
3. Sidebar + Header
4. Example Dashboard page
5. BookingTable basic
6. CalendarGrid basic

Keep code simple, clean, and ready to run.
