"use client";

import Link from "next/link";
import { useState } from "react";
import { properties } from "@/data/mock/properties";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { landingLinks } from "@/lib/landingLinks";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-heal-primary-200/60 bg-heal-neutral-light/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-6">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-heal-accent">
          Măng Đen De Lavie
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Chính">
          <Link
            href="/"
            className="text-sm font-medium text-heal-text-secondary transition-colors hover:text-heal-accent"
          >
            Trang chủ
          </Link>
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-heal-text-secondary transition-colors hover:text-heal-accent"
            >
              Cơ sở
              <span className="text-xs" aria-hidden>
                ▾
              </span>
            </button>
            <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-xl border border-heal-primary-200/80 bg-white py-2 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              {properties.map((p) => (
                <Link
                  key={p.id}
                  href={`/properties/${p.slug}`}
                  className="block px-4 py-2.5 text-sm text-heal-text hover:bg-heal-primary-50"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/#lien-he"
            className="text-sm font-medium text-heal-text-secondary transition-colors hover:text-heal-accent"
          >
            Liên hệ
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href={landingLinks.zalo} target="_blank" rel="noopener noreferrer">
              Đặt phòng
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-heal-primary-200 px-3 py-2 text-sm font-medium text-heal-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-heal-primary-200/60 bg-white px-4 py-4 md:hidden",
          !open && "hidden",
        )}
      >
        <div className="flex flex-col gap-3">
          <Link href="/" className="text-sm font-medium" onClick={() => setOpen(false)}>
            Trang chủ
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-heal-text-muted">Cơ sở</p>
          {properties.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.slug}`}
              className="pl-2 text-sm text-heal-text-secondary"
              onClick={() => setOpen(false)}
            >
              {p.name}
            </Link>
          ))}
          <Link href="/#lien-he" className="text-sm font-medium" onClick={() => setOpen(false)}>
            Liên hệ
          </Link>
          <Button asChild className="w-full">
            <Link href={landingLinks.zalo} target="_blank" rel="noopener noreferrer">
              Đặt phòng qua Zalo
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
