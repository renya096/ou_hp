import { ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { recruitFacts, honestPoints } from "@/content/recruit";

export function RecruitContactBand({ title, lead, note }: { title: string; lead: string; note?: React.ReactNode }) {
  return (
    <ContactBand
      title={title}
      lead={lead}
      variant="recruit"
      formHref="/recruit/entry"
      formLabel="応募フォーム"
      lineHref={site.line.recruit}
      lineLabel="LINEで『話を聞きたい』と送る"
      note={note ?? <>カジュアル面談は{recruitFacts.casualInterview.join("・")}。話を聞いてから決めてください。</>}
    />
  );
}

/** 「スマホで完結」：実際のLINE公式アカウント（隊員用）のメニュー画面。 */
export function PhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div className="rounded-[28px] border border-line bg-bg p-3 shadow-[0_1px_0_var(--line)]">
        <div className="overflow-hidden rounded-[20px] bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-[12.5px] font-bold text-heading">株式会社OU警備保障（Work）</span>
            <span className="num inline-flex items-center gap-1 text-[11px] font-semibold text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />LINE</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/recruit/line-richmenu.webp" alt="隊員用LINEのメニュー画面：シフトを出す・勤務指示・出発前確認・上番・下番・日払い申請の6つのボタン" width={800} height={620} loading="lazy" className="block w-full" />
        </div>
      </div>
      <p className="mt-2 text-center text-[11.5px] text-muted">実際の隊員用LINEの画面です。</p>
    </div>
  );
}

/** 正直に伝えること */
export function HonestList() {
  return (
    <div className="grid gap-4">
      {honestPoints.map((h, i) => (
        <article key={h.title} className="grid gap-4 rounded-sm border border-line bg-bg p-5 sm:grid-cols-[48px_1fr] sm:p-6">
          <span className="num text-[13px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-8">
            <div>
              <h3 className="text-[17px] font-bold">{h.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.8] text-ink">{h.body}</p>
            </div>
            <div className="rounded-sm bg-surface px-4 py-3">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">会社がやること</p>
              <p className="mt-1 text-[13.5px] leading-[1.8] text-ink">{h.how}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** カジュアル面談 */
export function CasualInterview() {
  return (
    <div className="grid gap-6 rounded-sm border border-line bg-bg p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div>
        <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Casual interview</p>
        <h3 className="mt-2 text-[22px] font-bold leading-[1.35] sm:text-[26px]">応募の前に、話だけ聞いてください。</h3>
        <p className="mt-3 max-w-[56ch] text-[14.5px] leading-[1.9] text-ink">カジュアル面談は選考ではありません。条件・現場・大変さを私たちから先にお話しする30分です。聞いて「合わない」と思ったら、そのまま辞退してください。それで構いません。</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {recruitFacts.casualInterview.map((t) => <li key={t} className="rounded-sm border border-line bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink">{t}</li>)}
        </ul>
      </div>
      <div className="grid gap-3">
        <Button href={site.line.recruit} size="lg"><Icon name="line" size={20} />LINEで「話を聞きたい」と送る</Button>
        <Button href="/recruit/entry" variant="secondary" size="lg"><Icon name="doc" size={20} />フォームで面談を申し込む</Button>
        <p className="text-center text-[12.5px] text-muted">2営業日以内にLINEまたは電話でご連絡します</p>
      </div>
    </div>
  );
}
