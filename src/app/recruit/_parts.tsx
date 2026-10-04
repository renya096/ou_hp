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

/** 「スマホで完結」の抽象UIモック。実画面ではなくCSSで描いたダミー。 */
export function PhoneMock() {
  const rows = [
    { icon: "clock" as const, title: "出勤", sub: "7:28 現場到着を報告", state: "済" },
    { icon: "clock" as const, title: "退勤", sub: "16:31 作業終了を報告", state: "済" },
    { icon: "wallet" as const, title: "日払い申請", sub: "本日分を申請 → 当日中に振込", state: "申請" },
  ];
  return (
    <div className="mx-auto w-full max-w-[320px]" role="img" aria-label="スマホ画面のイメージ：出勤・退勤・日払い申請の3つのボタンがLINE上で完結する">
      <div className="rounded-[28px] border border-line bg-bg p-3 shadow-[0_1px_0_var(--line)]">
        <div className="rounded-[20px] bg-surface p-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="num text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">OU 勤怠</span>
            <span className="num inline-flex items-center gap-1 text-[11px] font-semibold text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />LINE</span>
          </div>
          <p className="num mt-3 text-[11px] text-muted">10.02（木）　◯◯市内 道路工事</p>
          <ul className="mt-3 grid gap-2">
            {rows.map((r) => (
              <li key={r.title} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-sm border border-line bg-bg px-3 py-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={r.icon} size={18} /></span>
                <span><span className="block text-[13.5px] font-bold text-heading">{r.title}</span><span className="num block text-[11.5px] text-muted">{r.sub}</span></span>
                <span className={`num rounded-sm px-2 py-1 text-[11px] font-bold ${r.state === "済" ? "bg-surface-2 text-muted" : "bg-action text-action-ink"}`}>{r.state}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-sm border border-dashed border-line px-3 py-2 text-[11.5px] leading-[1.6] text-muted">
            振込手数料は本人負担。申請しない日は通常の給与日に支払い。
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[11.5px] text-muted">画面はイメージです。実際の操作はLINEのトーク上で行います。</p>
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
