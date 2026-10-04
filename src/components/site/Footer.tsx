import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { Hyoshiki } from "./Hyoshiki";
import { footerLinks, site } from "@/content/site";

/** 全ページ共通フッター。認定（標識）・住所・各事業リンク。 */
export function Footer() {
  const groups: Array<{ title: string; links: ReadonlyArray<{ href: string; label: string }> }> = [
    { title: "警備サービス（2号）", links: footerLinks.services },
    { title: "身辺警護（4号）", links: footerLinks.protection },
    { title: "OUクリーンサービス", links: footerLinks.cleaning },
    { title: "会社・採用", links: footerLinks.company },
  ];
  return (
    <footer className="border-t border-line bg-surface" data-theme="guard">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo id="ou-footer" />
            <p className="mt-4 max-w-[40ch] text-[13.5px] leading-[1.8] text-muted">{site.address.full}</p>
            <dl className="mt-4 grid gap-1.5 text-[13.5px]">
              <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">電話</dt><dd><a href={`tel:${site.tel.replace(/-/g, "")}`} className="num font-semibold text-ink">{site.telDisplay}</a><span className="ml-2 text-muted">24時間受付</span></dd></div>
              <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">FAX</dt><dd className="num text-ink">{site.fax}</dd></div>
              <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">警備</dt><dd className="num break-all text-ink">{site.email.security}</dd></div>
              <div className="flex gap-3"><dt className="w-14 shrink-0 text-muted">清掃</dt><dd className="num break-all text-ink">{site.email.cleaning}</dd></div>
            </dl>
            <div className="mt-5">
              <p className="mb-2 text-[12.5px] font-bold text-heading">警備業法第6条に基づく標識</p>
              <Hyoshiki compact />
              <p className="mt-2 text-[12px] text-muted">業務区分：{site.license.categories.join("／")}</p>
              <Link href="/legal" className="mt-1 inline-flex items-center gap-1 text-[12.5px] font-semibold text-action">警備業に関する表示 <Icon name="arrow" size={14} /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-[13px] font-bold text-heading">{g.title}</p>
                <ul className="mt-3 grid gap-2">
                  {g.links.map((l) => <li key={l.href}><Link href={l.href} className="text-[13.5px] text-muted hover:text-ink">{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="num">© {new Date().getFullYear()} {site.name}</p>
          <p>{site.slogan} — {site.mission}</p>
        </div>
      </Container>
    </footer>
  );
}
