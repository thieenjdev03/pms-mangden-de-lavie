import Link from "next/link";
import { landingLinks } from "@/lib/landingLinks";

type FooterProps = {
  year?: number;
};

export default function Footer({ year = 2026 }: FooterProps) {
  return (
    <footer className="type-small mt-auto flex w-full flex-col items-center gap-3 px-5 py-6 text-center text-heal-text-muted md:flex-row md:justify-between md:px-8 md:text-left">
      <p className="order-2 font-body md:order-1">© {year} Măng Đen De Lavie. All rights reserved.</p>
      <nav
        className="font-body order-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:order-2 md:justify-end"
        aria-label="Footer"
      >
        <a href="#privacy" className="transition-colors hover:text-heal-accent">
          Privacy
        </a>
        <span className="text-heal-text-muted/50" aria-hidden>
          |
        </span>
        <a
          href={landingLinks.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-heal-accent hover:underline"
        >
          Contact
        </a>
        <span className="text-heal-text-muted/50" aria-hidden>
          |
        </span>
        <Link href="/login" className="transition-colors hover:text-heal-accent">
          Quản trị
        </Link>
      </nav>
    </footer>
  );
}
