4. FAKE DATABASE (CHẠY NGAY)

👉 Vì demo nhanh → chưa cần Mongo

lib/data.ts
export const rooms = [
  { id: "r1", name: "V1-101", property: "Villa 1" },
  { id: "r2", name: "V1-102", property: "Villa 1" },
  { id: "r3", name: "H1-01", property: "Homestay 1" },
];

export let bookings: any[] = [];
⚙️ 5. API ROUTES (NextJS)
🟢 Create booking

app/api/bookings/route.ts

import { bookings } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();

  bookings.push({
    id: Date.now().toString(),
    ...body,
  });

  return Response.json({ success: true });
}
🟢 Get bookings
export async function GET() {
  return Response.json(bookings);
}
📅 6. CALENDAR COMPONENT (CORE)
components/Calendar.tsx
"use client";

import dayjs from "dayjs";
import { rooms } from "@/lib/data";

const days = Array.from({ length: 7 }).map((_, i) =>
  dayjs().add(i, "day").format("DD/MM")
);

export default function Calendar({ bookings }: any) {
  return (
    <div className="overflow-auto">
      <table className="border w-full">
        <thead>
          <tr>
            <th>Room</th>
            {days.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>

              {days.map((d) => {
                const date = dayjs(d, "DD/MM");

                const isBooked = bookings.some(
                  (b: any) =>
                    b.roomId === room.id &&
                    date.isAfter(dayjs(b.checkin).subtract(1, "day")) &&
                    date.isBefore(dayjs(b.checkout))
                );

                return (
                  <td
                    key={d}
                    className={`h-10 ${
                      isBooked ? "bg-red-400" : "bg-green-200"
                    }`}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
🖥️ 7. MAIN PAGE
app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";

export default function Home() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Homestay PMS</h1>
      <Calendar bookings={bookings} />
    </div>
  );
}
💰 8. QR PAYMENT (SIÊU NHANH)
function generate QR
export const getQR = (amount: number, content: string) => {
  return `https://img.vietqr.io/image/MB-123456789-compact.png?amount=${amount}&addInfo=${content}&accountName=NGUYEN VAN A`;
};
render:
<img src={getQR(500000, "BOOK_V1-101")} />
⚡ 9. CHẠY PROJECT
MacOS
npm run dev
Windows
npm run dev
p
👉 mở:

http://localhost:3000
🎯 10. KẾT QUẢ SAU 1–2 GIỜ

👉 mày sẽ có:

calendar phòng
trạng thái đỏ / xanh
API booking
QR payment
🔥 11. NEXT STEP (sau demo)
🟢 cần làm tiếp:
modal tạo booking
conflict check
lưu DB thật (Mongo)
🔵 nâng cấp:
dashboard
expense
filter
👊 CHỐT

👉 Đây là setup:

nhanh nhất để có sản phẩm demo chạy được