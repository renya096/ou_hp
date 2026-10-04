import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "お見積りのご依頼を受け付けました",
  robots: { index: false, follow: false },
  alternates: { canonical: "/contact/thanks" },
};

export default function ContactThanksPage() {
  return (
    <Section>
      <div className="mx-auto max-w-[60ch]">
        <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Thank you</p>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.35] sm:text-[36px]">お見積りのご依頼を受け付けました</h1>
        <p className="mt-5 text-[15.5px] leading-[1.9] text-ink">ありがとうございます。営業時間内は原則30分以内に担当から一次回答し、お見積りは営業日内24時間以内にお届けします。夜間・休日にいただいたご依頼は、翌営業日の朝に順次ご連絡します。</p>
        <div className="mt-8 grid gap-3 rounded-sm border border-line bg-surface p-5 text-[14px]">
          <p className="font-bold text-heading">お急ぎの場合（当日・翌日の配置など）</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span></Button>
            <Button href={site.line.business} variant="secondary"><Icon name="line" size={18} />LINEで図面・写真を送る</Button>
          </div>
          <p className="text-[12.5px] text-muted">{site.hours}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-[14px] font-bold text-action">
          <Link href="/pricing" className="inline-flex items-center gap-1">料金の考え方 <Icon name="arrow" size={16} /></Link>
          <Link href="/works" className="inline-flex items-center gap-1">実績・対応事例 <Icon name="arrow" size={16} /></Link>
          <Link href="/" className="inline-flex items-center gap-1">トップページ <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </Section>
  );
}
