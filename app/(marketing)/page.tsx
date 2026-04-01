import CTAButton from "@/components/landing/CTAButton";
import Footer from "@/components/landing/Footer";
import GlassCard from "@/components/landing/GlassCard";
import Header from "@/components/landing/Header";
import { IconAlbum, IconFacebook, IconZaloChat } from "@/components/landing/landingIcons";
import LandingBanner from "@/components/landing/LandingBanner";
import PageWrapper from "@/components/landing/PageWrapper";
import SecondaryOutlineLink from "@/components/landing/SecondaryOutlineLink";
import VillaPosterGrid from "@/components/landing/VillaPosterGrid";
import { landingLinks } from "@/lib/landingLinks";

function LeafIcon() {
  return (
    <svg
      className="h-7 w-7 text-heal-accent"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 4C10 8 6 14 6 20c0 5 4 8 10 8s10-3 10-8c0-6-4-12-10-16z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M16 8v16M12 14c2 2 4 2 8 0"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <PageWrapper>
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-10 md:gap-10 md:px-6 md:py-12">
        <LandingBanner />

        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-heal-primary-100/90 ring-1 ring-heal-primary-200/80"
              aria-hidden
            >
              <LeafIcon />
            </div>

            <p className="font-body mb-5 inline-flex rounded-full border border-heal-primary-200/80 bg-heal-primary-50/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-heal-primary-700 md:text-[11px]">
              Coming soon
            </p>

            <h1 className="type-h1 text-heal-text">Măng Đen De Lavie</h1>

            <p className="font-heading mt-5 max-w-md text-lg font-normal italic leading-relaxed tracking-normal text-heal-text-muted md:text-xl">
              Đang bận… chill một chút.
            </p>

            <p className="font-body mt-10 max-w-md text-base leading-relaxed text-heal-text-secondary">
              Tụi mình đang chuẩn bị một không gian thật xinh để bạn có thể dễ dàng chọn căn villa phù hợp
              nhất.
            </p>

            <p className="font-body mt-6 max-w-md text-base font-medium leading-relaxed text-heal-highlight">
              Trong lúc chờ, biết đâu bạn đang cần một chuyến đi để &quot;heal&quot; lại chính mình.
            </p>

            <VillaPosterGrid />

            {/* Album */}
            <div className="mt-12 w-full max-w-md">
              <p className="font-body mb-3 text-xs font-medium uppercase tracking-wider text-heal-text-muted">
                Góc nhỏ cho bạn
              </p>
              <a
                href={landingLinks.albumDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body group inline-flex items-center gap-2 text-base font-medium text-heal-primary-700 transition-colors hover:text-heal-accent hover:underline hover:underline-offset-4"
              >
                <IconAlbum className="h-5 w-5 shrink-0 text-heal-primary-500 transition-colors group-hover:text-heal-accent" />
                <span>📸 Xem album villa</span>
              </a>
            </div>

            {/* Contact */}
            <div className="font-body mt-12 w-full max-w-md border-t border-heal-primary-200/50 pt-12 text-left">
              <p className="mb-5 text-center text-xs font-medium uppercase tracking-wider text-heal-text-muted">
                Muốn trò chuyện nhẹ nhàng?
              </p>
              <ul className="space-y-4 text-base leading-relaxed text-heal-text-secondary">
                <li>
                  <a
                    href={landingLinks.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:text-heal-accent"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-heal-primary-100/80 text-heal-primary-700 transition-colors group-hover:bg-heal-primary-200/90 group-hover:text-heal-accent">
                      <IconZaloChat className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="type-small block text-heal-text-muted">Zalo</span>
                      <span className="font-medium text-heal-text group-hover:underline group-hover:underline-offset-2">
                        {landingLinks.zaloDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={landingLinks.fanpage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:text-heal-accent"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-heal-primary-100/80 text-heal-primary-700 transition-colors group-hover:bg-heal-primary-200/90 group-hover:text-heal-accent">
                      <IconFacebook className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="type-small block text-heal-text-muted">Fanpage</span>
                      <span className="font-medium text-heal-text group-hover:underline group-hover:underline-offset-2">
                        facebook.com/Mangdendalavie
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex w-full max-w-md flex-col items-center gap-3 px-2">
              <CTAButton href={landingLinks.zalo}>Liên hệ đặt phòng</CTAButton>
              <SecondaryOutlineLink href={landingLinks.albumDrive} icon={<IconAlbum className="h-4 w-4" />}>
                Xem album villa
              </SecondaryOutlineLink>
            </div>
          </div>
        </GlassCard>
      </main>

      <Footer />
    </PageWrapper>
  );
}
