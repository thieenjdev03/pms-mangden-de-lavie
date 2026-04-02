import Link from "next/link";
import { landingLinks } from "@/lib/landingLinks";

export const metadata = {
  title: "Sắp ra mắt — Măng Đen De Lavie",
  description:
    "Website chính thức của Măng Đen De Lavie đang được hoàn thiện. Liên hệ đặt phòng qua Zalo.",
};

export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-heal-neutral-light px-6">
      {/* Subtle background rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="block h-[600px] w-[600px] rounded-full border border-heal-primary-200/40" />
        <span className="absolute block h-[420px] w-[420px] rounded-full border border-heal-primary-300/30" />
        <span className="absolute block h-[240px] w-[240px] rounded-full border border-heal-primary-400/20" />
      </div>

      {/* Content card */}
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-6 text-center">
        {/* Brand mark */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-heal-primary-500">
            Măng Đen
          </span>
          <h1 className="font-heading text-4xl font-semibold text-heal-accent sm:text-5xl">
            De Lavie
          </h1>
        </div>

        {/* Pine divider */}
        <svg
          aria-hidden
          viewBox="0 0 80 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 text-heal-primary-400"
        >
          <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1" />
          <circle cx="40" cy="6" r="3" fill="currentColor" />
          <line x1="48" y1="6" x2="80" y2="6" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Main message */}
        <div className="space-y-3">
          <p className="font-heading text-2xl font-medium text-heal-text sm:text-3xl">
            Website đang được hoàn thiện
          </p>
          <p className="text-base leading-relaxed text-heal-text-secondary">
            Chúng tôi đang xây dựng không gian trực tuyến xứng với từng góc villa. Trong lúc đó,
            hãy nhắn Zalo để được tư vấn và đặt phòng ngay.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={landingLinks.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-heal-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-heal-accent-hover"
          >
            {/* Zalo icon (simple chat bubble) */}
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M10 2a8 8 0 0 0-6.93 11.97L2 18l4.15-1.07A8 8 0 1 0 10 2Z" />
            </svg>
            Nhắn Zalo ngay
          </a>

          <a
            href={landingLinks.phoneTel}
            className="inline-flex items-center gap-2 rounded-full border border-heal-primary-300 bg-white px-6 py-3 text-sm font-semibold text-heal-accent shadow-sm transition hover:border-heal-accent hover:bg-heal-primary-50"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V16a2 2 0 0 1-2 2h-1C7.716 18 2 12.284 2 5V4a2 2 0 0 1 2-1h-.001Z"
                clipRule="evenodd"
              />
            </svg>
            {landingLinks.zaloDisplay}
          </a>
        </div>

        {/* Facebook link */}
        <a
          href={landingLinks.fanpage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-heal-text-muted underline-offset-4 hover:text-heal-accent hover:underline"
        >
          Xem thêm trên Facebook →
        </a>
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4 px-6 text-xs text-heal-text-muted">
        <span>© {new Date().getFullYear()} Măng Đen De Lavie</span>
        <span aria-hidden>·</span>
        <Link href="/login" className="hover:text-heal-accent">
          Quản trị
        </Link>
        {/* Dev convenience link — remove before go-live */}
        <span aria-hidden>·</span>
        <Link href="/preview" className="hover:text-heal-accent">
          Preview website
        </Link>
      </div>
    </div>
  );
}
