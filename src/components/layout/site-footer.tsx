import Link from "next/link";
import { landingLinks } from "@/lib/landingLinks";

export function SiteFooter() {
  return (
    <footer className="border-t border-heal-primary-200/80 bg-heal-primary-50/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-semibold text-heal-accent">Măng Đen De Lavie</p>
            <p className="mt-3 text-sm leading-relaxed text-heal-text-secondary">
              Không gian nghỉ dưỡng ấm áp giữa thông xanh Măng Đen — CasaBlanca Villa và Sala Villa cho kỳ
              nghỉ chậm và lành.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-heal-text-muted">
              Liên kết
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/preview" className="text-heal-text-secondary hover:text-heal-accent">
                  Trang giới thiệu
                </Link>
              </li>
              <li>
                <a
                  href={landingLinks.albumDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heal-text-secondary hover:text-heal-accent"
                >
                  Album ảnh
                </a>
              </li>
              <li>
                <a
                  href={landingLinks.fanpage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heal-text-secondary hover:text-heal-accent"
                >
                  Fanpage
                </a>
              </li>
              <li>
                <Link href="/login" className="text-heal-text-secondary hover:text-heal-accent">
                  Đăng nhập quản trị
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-heal-text-muted">
              Liên hệ nhanh
            </p>
            <ul className="mt-4 space-y-2 text-sm text-heal-text-secondary">
              <li>Zalo: {landingLinks.zaloDisplay}</li>
              <li>
                <a href={landingLinks.zalo} className="hover:text-heal-accent">
                  Mở Zalo chat
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-heal-primary-200/60 pt-8 text-center text-xs text-heal-text-muted">
          © {new Date().getFullYear()} Măng Đen De Lavie. Giữ bản quyền nội dung & hình ảnh.
        </p>
      </div>
    </footer>
  );
}
