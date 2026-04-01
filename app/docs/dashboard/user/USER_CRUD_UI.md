You are a senior frontend engineer.

Implement the Customer Management UI based on the provided design screenshots.

---

## ⚠️ IMPORTANT RULES

* DO NOT create a new layout
* MODIFY existing layout (sidebar + header)
* Use Ant Design
* Use TypeScript
* Use existing theme (colors, spacing)
* All UI text must be Vietnamese

---

## 🎯 Goal

Implement a full Customer Management page with:

1. Dashboard stats
2. Search & actions
3. Customer table
4. Add/Edit customer modal

---

## 🧩 1. Header Section

Title:
"Quản lý khách hàng"

Description:
"Lưu trữ và quản lý thông tin khách hàng chuyên sâu cho hệ thống nghỉ dưỡng."

---

## 🧩 2. Statistic Cards (Top Row)

Create 4 cards using Ant Design Card:

* Tổng khách hàng
* Khách hàng VIP
* Chi tiêu trung bình
* Khách mới (tháng)

Each card includes:

* Large number
* Small status badge (e.g. +12%, ổn định, -5%)

---

## 🧩 3. Action Bar

Include:

* Search input:
  placeholder: "Tìm tên, số điện thoại..."

* Buttons:

  * "Xuất báo cáo"
  * "Thêm khách hàng" (primary button)

---

## 🧩 4. Customer Table

Use Ant Design Table

---

### Columns:

1. Tên khách hàng

* Avatar (circle)
* Name (bold)
* ID (small text)

2. Thông tin liên hệ

* Phone
* Email

3. Số lần đặt (badge style)

4. Tổng chi tiêu (formatted VND)

5. Trạng thái (Tag)

6. Hành động (edit / delete)

---

## 🧩 5. Status Styling

Use Tag:

* VIP → green
* Bình thường → blue
* Mới → gray

---

## 🧩 6. Pagination

* Bottom right
* Show page numbers
* Show "Hiển thị 1-10 trên X khách hàng"

---

## 🧩 7. Bottom Section (Extra Cards)

Create 2 cards:

---

### Card 1: Ưu đãi khách VIP

* Title
* Description
* Button: "Cấu hình tự động"

---

### Card 2: Báo cáo khách hàng mới

* Title
* Description
* Avatar group

---

## 🧩 8. Add Customer Modal

Use Ant Design Modal + Form

---

### Fields:

* Tên khách hàng (required)
* Số điện thoại
* Email
* Tag khách hàng (Select)
* Ghi chú (Textarea)

---

### Buttons:

* Hủy
* Lưu (primary)

---

## 🧩 9. UX Behavior

* Click "Thêm khách hàng" → open modal
* Submit → update table
* No page reload

---

## 🎨 UI Requirements

* Match spacing from design
* Clean layout
* Rounded components
* Soft shadows

---

## 🧪 Code Structure

Split into components:

* CustomerPage
* CustomerStats
* CustomerTable
* CustomerModal

---

## 🧪 Output

* Full page UI
* Modal form working
* Clean reusable code
