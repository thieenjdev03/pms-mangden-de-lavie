import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  /** Defaults to true when href is http(s). */
  external?: boolean;
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h12m0 0l-4-4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Primary gradient CTA with hover scale/darken (CSS .landing-cta).
 */
export default function CTAButton({ href, children, external }: CTAButtonProps) {
  const isExternal =
    external ?? (href.startsWith("http://") || href.startsWith("https://"));

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="landing-cta font-body inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-medium text-white"
    >
      <span>{children}</span>
      <ArrowIcon className="h-4 w-4 shrink-0 md:h-[18px] md:w-[18px]" />
    </a>
  );
}
