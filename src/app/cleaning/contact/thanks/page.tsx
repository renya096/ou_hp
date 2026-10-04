import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "送信を受け付けました（清掃）",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cleaning/contact/thanks" },
};

export default function CleaningThanksPage() {
  return (
    <div data-theme="clean">
      <Section>
        <div className="mx-auto max-w-[60ch]">
          <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Thank you</p>
          <h1 className="mt-3 text-[28px] font-bold leading-[1.35] sm:text-[36px]">送信を受け付けました</h1>
          <p className="mt-5 text-[15.5px] leading-[1.9] text-ink">ありがとうございます。清掃担当（OUクリーンサービス）から、営業時間内は原則30分以内に一次回答します。現地確認の日程は、ご希望の連絡手段でご相談します。</p>
          <div className="mt-8 grid gap-3 rounded-sm border border-line bg-surface p-5 text-[14px]">
            <p className="font-bold text-heading">お急ぎの場合・写真を追加で送りたい場合</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span></Button>
              <Button href={site.line.business} variant="secondary"><Icon name="line" size={18} />LINEで写真を送る</Button>
            </div>
            <p className="text-[12.5px] text-muted">{site.hours}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[14px] font-bold text-action">
            <Link href="/cleaning" className="inline-flex items-center gap-1">OUクリーンサービスへ戻る <Icon name="arrow" size={16} /></Link>
            <Link href="/" className="inline-flex items-center gap-1">トップページ <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
