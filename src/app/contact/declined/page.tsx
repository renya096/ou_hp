import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "商品・サービスのご提案について",
  robots: { index: false, follow: false },
  alternates: { canonical: "/contact/declined" },
};

/** 入口で「営業・提案」を選んで送信した場合の着地ページ。メールは送られていない */
export default function ContactDeclinedPage() {
  return (
    <Section>
      <div className="mx-auto max-w-[60ch]">
        <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Notice</p>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.35] sm:text-[36px]">商品・サービスのご提案は、フォームでは受け付けていません</h1>
        <p className="mt-5 text-[15.5px] leading-[1.9] text-ink">
          このフォームからの送信内容は、担当者には届いていません。お問い合わせフォームと代表電話は、警備のご依頼と採用のご連絡のための窓口です。ご提案は郵送でのみお受けし、必要と判断した場合に限りこちらからご連絡します。フォーム・電話・メールでのご提案には返信いたしませんので、ご了承ください。
        </p>
        <div className="mt-8 rounded-sm border border-line bg-surface p-5 text-[14.5px]">
          <p className="font-bold text-heading">ご提案の郵送先</p>
          <p className="num mt-1 text-ink">{site.address.full}</p>
          <p className="num text-ink">{site.name} 宛</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-[14px] font-bold text-action">
          <Link href="/contact" className="inline-flex items-center gap-1">警備のご依頼はこちら <Icon name="arrow" size={16} /></Link>
          <Link href="/" className="inline-flex items-center gap-1">トップページ <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </Section>
  );
}
