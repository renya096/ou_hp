import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow, Button, Chip, cx } from "./primitives";
import { Icon, type IconName } from "./Icon";
import { CountUp, Reveal } from "./Reveal";
import { site } from "@/content/site";

/** 下層ページの先頭。eyebrow → H1 → lead → 事実チップ。 */
export function PageHero({ eyebrow, title, lead, chips, children, tone = "surface" }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; chips?: ReactNode[]; children?: ReactNode; tone?: "surface" | "bg";
}) {
  return (
    <header className={cx(tone === "surface" ? "bg-surface" : "bg-bg", "border-b border-line py-14 sm:py-20")}>
      <Container>
        <div className="max-w-[76ch]">
          {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
          <h1 className="text-[34px] font-black leading-[1.15] tracking-[-0.02em] sm:text-[52px]">{title}</h1>
          {lead && <p className="mt-5 text-[15.5px] leading-[1.9] text-ink sm:text-[17px]">{lead}</p>}
          {chips && chips.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{chips.map((c, i) => <Chip key={i}>{c}</Chip>)}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}

/** 数字タイル。巨大数字＋ラベル＋基準日。 */
export function StatTiles({ items, asOf = site.stats.asOf }: { items: Array<{ value: number; decimals?: number; suffix: string; label: string; note?: string }>; asOf?: string }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="border-t-[1.5px] border-ink/80 pt-4">
            <div className="text-[44px] font-black leading-none tracking-[-0.03em] text-heading sm:text-[60px]">
              <CountUp value={it.value} decimals={it.decimals ?? 0} />
              <span className="num ml-1 text-[15px] font-semibold text-muted">{it.suffix}</span>
            </div>
            <p className="mt-2 text-[13.5px] font-semibold text-ink">{it.label}</p>
            {it.note && <p className="mt-0.5 text-[12.5px] text-muted">{it.note}</p>}
          </div>
        ))}
      </div>
      <p className="num mt-2 text-right text-[12px] text-muted">{asOf}</p>
    </div>
  );
}

/** ピクト＋見出し＋本文のカード。リンク付きなら全体がリンク。 */
export function FeatureCard({ icon, title, body, href, meta }: { icon?: IconName; title: string; body: ReactNode; href?: string; meta?: string }) {
  const inner = (
    <>
      {icon && <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name={icon} size={24} /></span>}
      {meta && <p className="num mb-1 text-[12px] font-semibold tracking-wider text-muted">{meta}</p>}
      <h3 className="text-[18px] font-bold leading-snug tracking-[-0.01em]">{title}</h3>
      <div className="mt-2 text-[14px] leading-[1.8] text-muted">{body}</div>
      {href && <span className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold text-action">詳しく見る <Icon name="arrow" size={16} /></span>}
    </>
  );
  const cls = "flex h-full flex-col rounded-sm border border-transparent bg-card p-6 transition-[border-color,transform] duration-200";
  return href ? <Link href={href} className={cx(cls, "hover:-translate-y-0.5 hover:border-line motion-reduce:hover:translate-y-0")}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const c = cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={cx("grid gap-4", c)}>{children}</div>;
}

/** ご依頼の流れ。スクロールで線が伸び、番号が点灯する。 */
export function Steps({ items }: { items: Array<{ title: string; body: ReactNode; note?: string }> }) {
  return (
    <Reveal>
      <ol className="step-line relative grid gap-0 pl-0 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:gap-6 md:bg-none">
        {items.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[40px_1fr] gap-4 pb-8 md:block md:pb-0">
            <div className="flex flex-col items-center md:mb-4 md:flex-row md:gap-3">
              <span className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink bg-card text-[13px] font-bold text-ink">{String(i + 1).padStart(2, "0")}</span>
              {i < items.length - 1 && <span className="mt-2 w-0.5 flex-1 bg-line md:mt-0 md:h-0.5 md:w-auto md:flex-1" aria-hidden="true" />}
            </div>
            <div>
              <h3 className="text-[16px] font-bold leading-snug">{s.title}</h3>
              <div className="mt-1.5 text-[14px] leading-[1.8] text-muted">{s.body}</div>
              {s.note && <p className="num mt-1.5 text-[12.5px] text-accent">{s.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export type FaqItem = { q: string; a: ReactNode };
/** details/summary のFAQ。JSON-LD は呼び出し側で faqJsonLd() を使う。 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="faq group py-1">
          <summary className="flex items-start justify-between gap-4 py-4 text-[15.5px] font-bold leading-snug text-heading">
            <span><span className="num mr-2 text-accent">Q.</span>{it.q}</span>
            <Icon name="plus" size={20} className="faq-icon mt-1 shrink-0 text-muted" />
          </summary>
          <div className="pb-5 pl-7 text-[14.5px] leading-[1.9] text-ink">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/** 連絡先の帯。テーマごとに手段を変える。 */
export function ContactBand({
  title, lead, variant = "guard", formHref = "/contact", formLabel = "見積を依頼する", showLine = true, tel = site.tel, lineHref = site.line.business, lineLabel = "LINEで相談する", note,
}: {
  title: ReactNode; lead?: ReactNode; variant?: "guard" | "protect" | "clean" | "recruit"; formHref?: string; formLabel?: string; showLine?: boolean; tel?: string; lineHref?: string; lineLabel?: string; note?: ReactNode;
}) {
  return (
    <section className={cx("py-16 sm:py-20", variant === "protect" ? "bg-surface" : "bg-navy text-white")} data-theme={variant === "protect" ? "protect" : undefined}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className={cx("text-[30px] font-black leading-[1.2] tracking-[-0.02em] sm:text-[40px]", variant === "protect" ? "text-heading" : "text-white")}>{title}</h2>
            {lead && <p className={cx("mt-4 text-[15px] leading-[1.9]", variant === "protect" ? "text-muted" : "text-white/80")}>{lead}</p>}
            {note && <p className={cx("mt-4 text-[13px] leading-[1.8]", variant === "protect" ? "text-muted" : "text-white/70")}>{note}</p>}
          </div>
          <div className="grid gap-3">
            <Button href={formHref} size="lg" className={variant === "protect" ? "" : "bg-white text-navy hover:bg-white/90"}>
              <Icon name="doc" size={20} />{formLabel}
            </Button>
            <div className={cx("grid gap-3", showLine ? "sm:grid-cols-2" : "")}>
              <a href={`tel:${tel.replace(/-/g, "")}`} className={cx("inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] px-5 text-[16px] font-bold", variant === "protect" ? "border-line text-ink hover:border-ink" : "border-white/50 text-white hover:border-white")}>
                <Icon name="phone" size={20} /><span className="num">{tel}</span>
              </a>
              {showLine && (
                <a href={lineHref} target="_blank" rel="noopener noreferrer" className={cx("inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] px-5 text-[15px] font-bold", variant === "protect" ? "border-line text-ink hover:border-ink" : "border-white/50 text-white hover:border-white")}>
                  <Icon name="line" size={20} />{lineLabel}
                </a>
              )}
            </div>
            <p className={cx("num text-center text-[12.5px]", variant === "protect" ? "text-muted" : "text-white/70")}>{site.hours}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** 対応エリア：熊本 → 九州 → 全国 の同心円図。塗りが段階的に広がる。 */
export function AreaDiagram({ emphasis = "kumamoto" }: { emphasis?: "kumamoto" | "kyushu" | "japan" }) {
  const rings = [
    { r: 60, label: "熊本県全域", sub: "交通誘導・雑踏・道路規制・清掃", key: "kumamoto" },
    { r: 110, label: "九州全域", sub: "身辺警護（最短での現地調整）", key: "kyushu" },
    { r: 160, label: "全国", sub: "身辺警護（東京・大阪など出張対応）", key: "japan" },
  ];
  const order = ["kumamoto", "kyushu", "japan"];
  const level = order.indexOf(emphasis);
  return (
    <Reveal className="grid items-center gap-8 lg:grid-cols-[360px_1fr]">
      <svg viewBox="0 0 360 360" className="mx-auto w-full max-w-[360px]" role="img" aria-label="対応エリアの図：熊本県全域を中心に九州、全国へ広がる">
        {[...rings].reverse().map((ring, idx) => {
          const i = rings.length - 1 - idx;
          const active = i <= level;
          return <circle key={ring.key} cx="180" cy="180" r={ring.r} fill={active ? "var(--accent-soft)" : "var(--surface)"} stroke={active ? "var(--accent)" : "var(--line)"} strokeWidth={i === level ? 2 : 1.5} />;
        })}
        <circle cx="180" cy="180" r="5" fill="var(--accent)" />
        <text x="180" y="166" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--heading)">熊本市</text>
        <text x="180" y="130" textAnchor="middle" fontSize="12" fill="var(--ink)">熊本県全域</text>
        <text x="180" y="80" textAnchor="middle" fontSize="12" fill="var(--ink)">九州</text>
        <text x="180" y="30" textAnchor="middle" fontSize="12" fill="var(--ink)">全国</text>
      </svg>
      <ul className="grid gap-3">
        {rings.map((ring, i) => (
          <li key={ring.key} className={cx("rounded-sm border px-4 py-3", i <= level ? "border-accent bg-accent-soft" : "border-line bg-bg")}>
            <p className="text-[15px] font-bold text-heading">{ring.label}</p>
            <p className="text-[13.5px] text-muted">{ring.sub}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** 「できること／できないこと」などの2列リスト */
type ListCol = { title: string; items: string[]; icon?: IconName };
function ListColumn({ col }: { col: ListCol }) {
  return (
    <div className="rounded-sm border border-line bg-bg p-6">
      <h3 className="flex items-center gap-2 text-[16px] font-bold">{col.icon && <Icon name={col.icon} size={20} className="text-accent" />}{col.title}</h3>
      <ul className="mt-3 grid gap-2">
        {col.items.map((t) => <li key={t} className="grid grid-cols-[18px_1fr] gap-2 text-[14.5px] leading-[1.7]"><span className="mt-[9px] h-px w-3 bg-accent" aria-hidden="true" />{t}</li>)}
      </ul>
    </div>
  );
}
export function TwoColumnList({ left, right }: { left: ListCol; right: ListCol }) {
  return <div className="grid gap-4 md:grid-cols-2"><ListColumn col={left} /><ListColumn col={right} /></div>;
}

export function Breadcrumbs({ items }: { items: Array<{ href: string; label: string }> }) {
  return (
    <nav aria-label="パンくず" className="border-b border-line bg-bg">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2 py-2.5 text-[12.5px] text-muted">
          <li><Link href="/" className="hover:text-ink">ホーム</Link></li>
          {items.map((it, i) => (
            <li key={it.href} className="flex items-center gap-x-2">
              <span aria-hidden="true">/</span>
              {i === items.length - 1 ? <span className="text-ink" aria-current="page">{it.label}</span> : <Link href={it.href} className="hover:text-ink">{it.label}</Link>}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}

/** サービス名が流れる帯。本物の取引先ロゴが揃うまでの「稼働感」の表現。 */
export function Marquee({ items }: { items: string[] }) {
  const row = items.map((t, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="px-7 text-[13px] font-medium tracking-[0.08em] text-ink">{t}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-engi" aria-hidden="true" />
    </span>
  ));
  return (
    <div className="marquee border-y border-line py-3.5" aria-label={items.join("、")}>
      <div>{row}{row}</div>
    </div>
  );
}
