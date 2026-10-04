import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button } from "@/components/ui/primitives";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site, nav } from "@/content/site";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

const icons: Record<string, IconName> = { "/services": "baton", "/protection": "earpiece", "/cleaning": "broom", "/company": "report", "/recruit": "users" };

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-[68ch]">
        <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">404 Not Found</p>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.35] sm:text-[36px]">ページが見つかりません</h1>
        <p className="mt-5 text-[15.5px] leading-[1.9] text-ink">URLが変更されたか、ページが削除された可能性があります。お探しの内容は、以下のページからたどれます。お急ぎの場合はお電話ください。</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="flex items-center gap-3 rounded-sm border border-line bg-bg p-4 transition-colors hover:border-ink">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={icons[n.href] ?? "arrow"} size={20} /></span>
                <span className="text-[15px] font-bold text-ink">{n.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="flex items-center gap-3 rounded-sm border border-line bg-bg p-4 transition-colors hover:border-ink">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name="doc" size={20} /></span>
              <span className="text-[15px] font-bold text-ink">お見積り・ご相談</span>
            </Link>
          </li>
        </ul>
        <div className="mt-8 grid gap-3 rounded-sm border border-line bg-surface p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-[14px] font-bold text-heading">お電話でのご相談</p>
            <p className="text-[12.5px] text-muted">{site.hours}</p>
          </div>
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span></Button>
        </div>
        <div className="mt-8"><Link href="/" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">トップページへ戻る <Icon name="arrow" size={16} /></Link></div>
      </div>
    </Section>
  );
}
