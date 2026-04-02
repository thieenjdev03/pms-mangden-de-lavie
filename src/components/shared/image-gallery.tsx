"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type ImageGalleryProps = {
  images: string[];
  altBase: string;
  className?: string;
};

export function ImageGallery({ images, altBase, className }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const main = images[Math.min(active, images.length - 1)];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-heal-primary-100 shadow-inner">
        <Image
          src={main}
          alt={`${altBase} — ảnh ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority={active === 0}
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 ring-offset-2 transition-all",
                i === active ? "ring-heal-accent" : "ring-transparent opacity-80 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
