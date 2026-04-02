"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPriceVnd } from "@/lib/utils/format-price";
import type { PropertyContact, RoomTypeWithStats } from "@/types/accommodation";
import { cn } from "@/lib/cn";

type RoomTypeDetailModalProps = {
  room: RoomTypeWithStats;
  propertyName: string;
  contact: PropertyContact;
  trigger: React.ReactNode;
};

export function RoomTypeDetailModal({
  room,
  propertyName,
  contact,
  trigger,
}: RoomTypeDetailModalProps) {
  const [codesOpen, setCodesOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{room.name}</DialogTitle>
          <DialogDescription>
            {propertyName} · {room.areaSqm} m² · {room.bedInfo}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-heal-text-secondary">
          <p className="leading-relaxed">{room.description}</p>
          <div className="rounded-xl border border-heal-primary-200/80 bg-heal-primary-50/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-heal-text-muted">
              Giá tham khảo / đêm
            </p>
            <ul className="mt-2 space-y-1.5">
              <li className="flex justify-between gap-4">
                <span>Ngày thường</span>
                <span className="font-semibold text-heal-text">{formatPriceVnd(room.basePrice)}</span>
              </li>
              {room.weekendPrice != null ? (
                <li className="flex justify-between gap-4">
                  <span>Cuối tuần</span>
                  <span className="font-semibold text-heal-text">
                    {formatPriceVnd(room.weekendPrice)}
                  </span>
                </li>
              ) : null}
              {room.holidayPrice != null ? (
                <li className="flex justify-between gap-4">
                  <span>Ngày lễ</span>
                  <span className="font-semibold text-heal-text">
                    {formatPriceVnd(room.holidayPrice)}
                  </span>
                </li>
              ) : null}
            </ul>
            <p className="mt-3 text-xs text-heal-text-muted">
              Giá lễ có thể thay đổi theo từng đợt — vui lòng xác nhận khi đặt cọc.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-heal-text-muted">
              Tiện ích phòng
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {room.amenities.map((a) => (
                <li
                  key={a}
                  className="rounded-full bg-white px-3 py-1 text-xs ring-1 ring-heal-primary-200/80"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setCodesOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-xl border border-heal-primary-200/80 bg-white px-4 py-3 text-left text-sm font-medium text-heal-text transition-colors hover:bg-heal-primary-50/50"
            >
              <span>
                {room.availableRoomCount > 0
                  ? `Còn ${room.availableRoomCount} phòng trống`
                  : "Hiện không còn phòng trống (mock)"}
              </span>
              <span className="text-heal-text-muted" aria-hidden>
                {codesOpen ? "▴" : "▾"}
              </span>
            </button>
            <div
              className={cn(
                "mt-2 rounded-xl bg-heal-neutral-soft/80 px-4 py-3 text-xs text-heal-text-secondary",
                !codesOpen && "hidden",
              )}
            >
              <p className="font-medium text-heal-text">Mã phòng: {room.roomCodes.join(", ")}</p>
              <p className="mt-1">
                Mã phòng chỉ để tham khảo khi giao tiếp với lễ tân — hệ thống đặt phòng trực tuyến sẽ
                gắn vào từng đơn sau này.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-heal-primary-100 pt-4 sm:flex-row">
            {contact.zaloUrl ? (
              <Button asChild className="flex-1">
                <a href={contact.zaloUrl} target="_blank" rel="noopener noreferrer">
                  Đặt qua Zalo
                </a>
              </Button>
            ) : null}
            <Button asChild variant="outline" className="flex-1">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>Gọi {contact.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
