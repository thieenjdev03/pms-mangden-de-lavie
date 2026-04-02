import { landingLinks } from "@/lib/landingLinks";

type HeaderProps = {
  brandName?: string;
};

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.13 1.02 4.06 2.68 5.5L3.5 20.5l4.5-1.5A8.94 8.94 0 0012 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="15.5" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4h3l1.5 4-2 1.5c.8 2 2.2 3.8 4 4.5l1.5-2 4 1.5v3c0 .8-.6 1.5-1.4 1.6-.5.1-1 .1-1.5.1C10.4 18 6 13.6 6 8c0-.5 0-1 .1-1.5C6.2 5.7 6.8 5 7.6 5h-.1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header({ brandName = "Măng Đen De Lavie" }: HeaderProps) {
  return (
    <header className="flex w-full shrink-0 items-center justify-between px-5 py-5 md:px-8 md:py-6">
      <span className="font-heading text-sm font-medium tracking-wide text-heal-text-secondary">
        {brandName}
      </span>
      <div className="flex items-center gap-1">
        <a
          href={landingLinks.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full text-heal-text-secondary transition-colors hover:bg-white/50 hover:text-heal-accent"
          aria-label="Chat on Zalo"
        >
          <IconChat className="h-5 w-5" />
        </a>
        <a
          href={landingLinks.phoneTel}
          className="flex h-10 w-10 items-center justify-center rounded-full text-heal-text-secondary transition-colors hover:bg-white/50 hover:text-heal-accent"
          aria-label={`Gọi ${landingLinks.zaloDisplay}`}
        >
          <IconPhone className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
