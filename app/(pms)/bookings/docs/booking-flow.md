You are a senior frontend engineer. Help me implement a Booking system UI using Next.js (App Router) and Ant Design.

## 🎯 Goal

Implement:

1. Booking Modal (create booking)
2. Connect with CalendarGrid
3. Generate QR payment (VietQR)

---

## 📦 Context

I already have:

* CalendarGrid component (rooms + dates)
* Data:

  * rooms[]
  * bookings[]

---

## 🧱 Step 1: Create BookingModal Component

File: components/booking/BookingModal.tsx

Use:

* Ant Design Modal
* Form
* Input
* Select
* DatePicker
* InputNumber

### Fields:

* Room (Select from rooms)
* Guest Name
* Phone
* Checkin (DatePicker)
* Checkout (DatePicker)
* Total (InputNumber)
* Deposit (InputNumber)

### Requirements:

* Validate required fields
* On submit → call onCreateBooking(data)

---

## 🧱 Step 2: Booking State Management

In parent page:

* Maintain bookings state (useState)
* When create booking → push into bookings

---

## 🧱 Step 3: Connect Calendar Click → Open Modal

In CalendarGrid:

* When user clicks a cell:

  * open BookingModal
  * prefill:

    * roomId
    * checkin date

---

## 🧱 Step 4: Conflict Check (IMPORTANT)

Before saving booking:

```ts
newCheckin < existingCheckout &&
newCheckout > existingCheckin
```

If conflict:

* show Ant Design message.error("Room already booked")

---

## 🧱 Step 5: QR Payment Modal

File: components/payment/QRModal.tsx

Use:

* Modal
* Image
* Button (copy)

---

## Generate QR:

```ts
const qrUrl = `https://img.vietqr.io/image/MB-123456789-compact.png?amount=${amount}&addInfo=${content}&accountName=NGUYEN VAN A`
```

---

## Show:

* QR code
* Amount
* Transfer content

---

## 🧱 Step 6: After Booking Created

Flow:

1. Save booking
2. Close booking modal
3. Open QR modal

---

## 🧠 Step 7: UX Rules

* Autofill room & date from calendar click
* Default stay = 1 day
* Deposit auto = 30% of total (optional)
* Fast input (no unnecessary fields)

---

## 🧪 Output Required

Generate:

1. BookingModal component
2. QRModal component
3. Integration example in page.tsx
4. Updated CalendarGrid click handler

Keep code simple, clean, and runnable.
