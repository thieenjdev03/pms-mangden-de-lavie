# 🏡 Homestay PMS (Mini Property Management System)

## 🎯 Overview

This project is a lightweight internal web application to manage homestay/villa operations.

It is designed for:
- ~40 rooms
- Single location (Mang Den)
- Multiple properties (villa / homestay)
- Internal usage (PC / Laptop only)

---

## 🚀 Goals (MVP)

- Manage room availability
- Track bookings (check-in / checkout)
- Generate payment QR (VietQR)
- Track revenue & expenses
- Provide a simple dashboard

---

## 🧠 System Architecture

LOCATION (Mang Den)
   ↓
PROPERTY (villa / homestay)
   ↓
ROOM
   ↓
BOOKING
   ↓
EXPENSE

---

## 📦 Tech Stack

### Fast MVP (Recommended)
- Next.js (Fullstack)
- TypeScript
- TailwindCSS
- API Routes (no separate backend)

### Future Upgrade
- NestJS (backend)
- MongoDB
- Redis (optional)

---

## 📂 Project Structure

app/
 ├── page.tsx
 ├── calendar/
 ├── bookings/
 ├── api/
lib/
 ├── data.ts
 ├── utils.ts
components/
 ├── Calendar.tsx
 ├── BookingModal.tsx
 ├── QRModal.tsx

---

## 🗃️ Data Models

### Room
{
  id: string
  name: string
  propertyId: string
}

### Booking
{
  id: string
  roomId: string
  guestName: string
  phone: string
  checkin: Date
  checkout: Date
  total: number
  deposit: number
  paid: number
  status: "booked" | "checkin" | "checkout" | "cancel"
}

### Expense
{
  id: string
  propertyId: string
  date: Date
  type: string
  amount: number
}

---

## 📅 Core Feature: Calendar

- Rows = Rooms
- Columns = Dates
- Color:
  - Red → Occupied
  - Green → Available

---

## ⚙️ Core Logic

Booking Conflict:
newCheckin < existingCheckout && newCheckout > existingCheckin

Room Status:
if (today >= checkin && today < checkout) → occupied

Revenue:
revenue = sum(total)

Profit:
profit = revenue - expenses

Remaining:
remaining = total - paid

---

## 💰 Payment (QR)

Using VietQR

Example:
https://img.vietqr.io/image/MB-123456789-compact.png

---

## 🖥️ Features

### Must Have
- Room management
- Booking CRUD
- Calendar view
- Conflict check
- QR payment
- Expense tracking

### Nice to Have
- Click calendar → create booking
- Filter & search
- Highlight today

---

## 📊 Dashboard

- Rooms occupied today
- Check-in today
- Revenue today
- Profit

---

## 🚀 Development Plan

Phase 1:
- Setup project
- Booking + Calendar

Phase 2:
- QR Payment
- Booking modal

Phase 3:
- Expense + Dashboard

---

## ⚡ UX Principles

- Fast input
- No reload
- Calendar is main UI

---

## 🚨 Risks

- Double booking
- Data sai
- Không track chi phí

---

## 👊 Conclusion

Mini PMS system giúp thay thế Google Sheet và vận hành thực tế.
