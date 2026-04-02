"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PropertyContact } from "@/types/accommodation";
import { cn } from "@/lib/cn";

type ContactButtonsProps = {
  contact: PropertyContact;
  className?: string;
  layout?: "row" | "stack";
  /** Light buttons for dark backgrounds (e.g. hero CTA strip). */
  onDark?: boolean;
};

function ZaloIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.48 2 2 6.05 2 10.5c0 2.42 1.14 4.58 2.92 6.02L4 22l5.67-2.96C10.43 19.34 11.2 19.5 12 19.5c5.52 0 10-4.05 10-8.5S17.52 2 12 2zm0 15.5c-.67 0-1.32-.09-1.94-.25l-.14-.04-2.98 1.55.63-2.9-.1-.16c-.5-.8-.78-1.73-.78-2.7 0-2.76 2.69-5 6-5s6 2.24 6 5-2.69 5-6 5z" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

export function ContactButtons({
  contact,
  className,
  layout = "row",
  onDark = false,
}: ContactButtonsProps) {
  const tel = `tel:${contact.phone.replace(/\s/g, "")}`;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-3",
        layout === "stack" && "flex-col items-stretch",
        className,
      )}
    >
      {contact.zaloUrl ? (
        <Button
          asChild
          variant={onDark ? "secondary" : "default"}
          size={layout === "stack" ? "lg" : "default"}
          className={
            onDark
              ? "border-0 bg-white text-heal-accent shadow-md hover:bg-heal-primary-50"
              : undefined
          }
        >
          <Link href={contact.zaloUrl} target="_blank" rel="noopener noreferrer">
            <ZaloIcon className="size-4" />
            Zalo
          </Link>
        </Button>
      ) : null}
      <Button
        asChild
        variant="outline"
        size={layout === "stack" ? "lg" : "default"}
        className={
          onDark
            ? "border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            : undefined
        }
      >
        <Link href={tel}>
          <PhoneIcon className="size-4" />
          Gọi {contact.phoneDisplay}
        </Link>
      </Button>
      {contact.facebookUrl ? (
        <Button
          asChild
          variant="outline"
          size={layout === "stack" ? "lg" : "default"}
          className={
            onDark
              ? "border-white/70 bg-transparent text-white hover:bg-white/15 hover:text-white"
              : undefined
          }
        >
          <Link href={contact.facebookUrl} target="_blank" rel="noopener noreferrer">
            Facebook
          </Link>
        </Button>
      ) : null}
      {contact.messengerUrl ? (
        <Button
          asChild
          variant="outline"
          size={layout === "stack" ? "lg" : "default"}
          className={
            onDark
              ? "border-white/70 bg-transparent text-white hover:bg-white/15 hover:text-white"
              : undefined
          }
        >
          <Link href={contact.messengerUrl} target="_blank" rel="noopener noreferrer">
            Messenger
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
