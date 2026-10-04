import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "応募を受け付けました",
  robots: { index: false, follow: false },
  alternates: { canonical: "/recruit/entry/thanks" },
};

export default function RecruitThanksPage() {
  return (
    <div data-theme="recruit">
      <Section>
        <div className="mx-auto max-w-[60ch]">
          <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Thank you</p>
          <h1 className="mt-3 text-[28px] font-bold leading-[1.35] sm:text-[36px]">応募を受け付けました</h1>
          <p className="mt-5 text-[15.5px] leading-[1.9] text-ink">ありがとうございます。採用担当から、2営業日以内にLINEまたは電話でご連絡し、カジュアル面談の日程をご相談します。知らない番号からの着信があるかもしれません。{site.tel} からの電話は私たちです。</p>
          <div className="mt-8 grid gap-3 rounded-sm border border-line bg-surface p-5 text-[14px]">
            <p className="font-bold text-heading">先に質問したい・急いでいる場合</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button href={site.line.recruit} variant="secondary"><Icon name="line" size={18} />採用LINEで聞く</Button>
              <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span></Button>
            </div>
            <p className="text-[12.5px] text-muted">お電話は「採用の件で」とお伝えください。{site.hours}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-[14px] font-bold text-action">
            <Link href="/recruit" className="inline-flex items-center gap-1">採用情報へ戻る <Icon name="arrow" size={16} /></Link>
            <Link href="/recruit/faq" className="inline-flex items-center gap-1">採用FAQ <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
