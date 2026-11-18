"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * 問い合わせフォームの入口で「ご用件」を選んでもらい、営業・売り込みはフォーム本体を出さずにお断りする。
 * - 選択値は hidden の purpose としてサーバーにも送る（サーバー側でも判定）
 * - 営業を選んだ人には、受け付けない旨と唯一の窓口（郵送）を案内する
 */
const PURPOSES = [
  { value: "new", label: "警備のご依頼・お見積り（新規）", sub: "工事・イベント・施設などの警備" },
  { value: "existing", label: "既存のお取引・進行中の案件", sub: "配置の変更、追加、請求などのご連絡" },
  { value: "recruit", label: "採用・求人について", sub: "応募・見学・条件の質問" },
  { value: "sales", label: "商品・サービスのご提案（営業）", sub: "広告、システム、人材、代理店など" },
] as const;

type Purpose = (typeof PURPOSES)[number]["value"];

export function InquiryGate({ children, recruitHref = "/recruit" }: { children: ReactNode; recruitHref?: string }) {
  const [purpose, setPurpose] = useState<Purpose | "">("");

  return (
    <>
      <fieldset className="grid gap-3 rounded-sm border border-line bg-surface p-5 sm:p-6">
        <legend className="px-1 text-[15px] font-bold text-heading">ご用件<span className="num ml-2 rounded-sm bg-engi px-1.5 py-0.5 text-[10.5px] font-bold text-white">必須</span></legend>
        <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="ご用件">
          {PURPOSES.map((p) => (
            <label key={p.value} className="flex cursor-pointer items-start gap-2.5 rounded-sm border border-line bg-bg px-3.5 py-3 text-[14.5px] has-[:checked]:border-action has-[:checked]:bg-accent-soft">
              <input type="radio" name="purpose" value={p.value} checked={purpose === p.value} onChange={() => setPurpose(p.value)} className="mt-1 h-4 w-4 accent-[var(--action)]" />
              <span><span className="block font-bold text-heading">{p.label}</span><span className="block text-[12.5px] text-muted">{p.sub}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      {purpose === "sales" && (
        <div className="rounded-sm border border-line bg-bg p-5 sm:p-6" role="status">
          <p className="text-[16px] font-bold text-heading">商品・サービスのご提案は、このフォームでは受け付けていません</p>
          <p className="mt-2 text-[14.5px] leading-[1.9] text-ink">
            お問い合わせフォームと代表電話は、警備のご依頼・採用のご連絡専用です。ご提案は郵送でのみお受けし、必要と判断した場合に限りこちらからご連絡します。フォーム・電話・メールでのご提案には返信いたしませんので、ご了承ください。
          </p>
          <p className="num mt-3 text-[14px] text-ink">郵送先：{site.address.full}　{site.name} 宛</p>
        </div>
      )}

      {purpose === "recruit" && (
        <div className="rounded-sm border border-line bg-bg p-5 sm:p-6" role="status">
          <p className="text-[16px] font-bold text-heading">採用のご連絡は、採用ページからお願いします</p>
          <p className="mt-2 text-[14.5px] leading-[1.9] text-ink">LINEで「話を聞きたい」と送るだけでも大丈夫です。応募フォームは採用ページにあります。</p>
          <Link href={recruitHref} className="mt-3 inline-flex items-center gap-1 text-[14.5px] font-bold text-action">採用情報を見る →</Link>
        </div>
      )}

      {purpose === "existing" && (
        <div className="rounded-sm border border-line bg-bg p-5 sm:p-6" role="status">
          <p className="text-[15px] font-bold text-heading">お取引中の案件は、お電話・LINEが早く届きます</p>
          <p className="mt-1 text-[14px] leading-[1.9] text-ink">配置の変更・追加は <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num font-bold underline underline-offset-4">{site.tel}</a>（24時間）か法人LINEへ。フォームからでも構いません（下に続きます）。</p>
        </div>
      )}

      {(purpose === "new" || purpose === "existing") && children}
    </>
  );
}
