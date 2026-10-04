import type { Metadata } from "next";
import Link from "next/link";
import { Container, Button, Note } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import { protection } from "@/content/protection";
import { LegalNote } from "../../_components/shared";

export const metadata: Metadata = {
  title: "ご相談を受け付けました",
  robots: { index: false, follow: false },
  alternates: { canonical: "/protection/contact/thanks" },
};

export default function ProtectionThanksPage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-[68ch]">
          <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Received</p>
          <h1 className="mt-3 font-serif text-[30px] font-medium leading-[1.3] sm:text-[38px]">ご相談を受け付けました。</h1>
          <p className="mt-5 text-[15.5px] leading-[1.9] text-ink">担当者から、ご指定の連絡手段・時間帯にご連絡します。{protection.responseNote}です（夜間・休日のご送信は、翌営業日のご連絡になる場合があります）。ご指定の方法以外でご連絡することはありません。</p>
          <p className="mt-3 text-[14px] leading-[1.8] text-muted" lang="en">Thank you. Your request has been received. Our English-speaking coordinator will contact you by your preferred method, normally within 2 business hours.</p>

          <div className="mt-8 grid gap-3">
            <Note title="身の危険が差し迫っている場合" tone="accent">
              まず<a href="tel:110" className="num mx-1 font-bold text-ink underline underline-offset-4">110番</a>へ通報してください。私たちは警察の代わりにはなれません。
            </Note>
            <Note title="お急ぎの場合はお電話で">
              <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num text-[18px] font-bold text-ink">{site.telDisplay}</a>
              <span className="mt-1 block text-[13px] text-muted">{site.hours}。「身辺警護の件で」とお伝えください。</span>
            </Note>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={protection.path} variant="secondary">身辺警護のページへ戻る <Icon name="arrow" size={16} /></Button>
            <Link href="/" className="inline-flex min-h-[46px] items-center gap-1 px-2 text-[14px] font-bold text-ink underline-offset-4 hover:underline">トップページへ</Link>
          </div>
          <LegalNote className="mt-10" />
        </div>
      </Container>
    </div>
  );
}
