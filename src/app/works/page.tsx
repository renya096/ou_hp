import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note, Chip } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { works, disasterResponse, type Work } from "@/content/works";
import { site } from "@/content/site";

const path = "/works";
const title = "実績・対応事例｜令和8年熊本地震の復旧工事・道路規制・住宅メーカー・イベント";
const description = "株式会社OU警備保障の警備実績。令和8年熊本地震の復旧工事（緊急のガス・水道・電気工事の交通規制、解体ヤードの駐車場警備（宇土市）、被災箇所の24時間警戒）、国道の夜間規制、住宅メーカーの新築現場、祭り・花火大会の雑踏警備、商業施設の駐車場誘導、地域の安全教育など。発注者を特定しない形で掲載。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/services", label: "警備サービス" }, { href: path, label: "実績・対応事例" }];

/** カテゴリの表示順（災害対応は別枠で最上段に出すため除外） */
const categoryOrder: Array<{ key: Work["category"]; lead: string }> = [
  { key: "道路・工事", lead: "土木・舗装の現場と、国道・高速道路の規制業務。" },
  { key: "建築・住宅", lead: "住宅メーカー・工務店の新築現場。少量・スポットのご依頼にも対応。" },
  { key: "イベント", lead: "祭り・花火大会・マラソンなど、人が集まる場所の雑踏警備。" },
  { key: "商業施設", lead: "駐車場誘導と、清掃（OUクリーンサービス）との同時発注。" },
  { key: "身辺警護", lead: `${site.protectionStart}に開始した身辺警護（4号）の事例。` },
  { key: "地域・教育", lead: "安全教育・接遇研修など、地域の安全活動。" },
];

function WorkCard({ w, featured = false }: { w: Work; featured?: boolean }) {
  return (
    <article id={w.slug} className={featured ? "scroll-mt-24 rounded-sm border border-accent bg-bg p-6 sm:p-8" : "scroll-mt-24 flex h-full flex-col rounded-sm border border-line bg-bg p-6"}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={w.icon} size={20} /></span>
        <span className="num text-[12px] font-semibold tracking-wider text-accent">{w.category}</span>
      </div>
      <h3 className={featured ? "mt-4 text-[22px] font-bold leading-[1.35] sm:text-[26px]" : "mt-4 text-[17px] font-bold leading-snug"}>{w.title}</h3>
      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
        <div className="flex gap-1.5"><dt className="text-muted">発注者</dt><dd className="font-semibold text-ink">{w.client}</dd></div>
        <div className="flex gap-1.5"><dt className="text-muted">規模</dt><dd className="num font-semibold text-ink">{w.scale}</dd></div>
        {w.area && <div className="flex gap-1.5"><dt className="text-muted">地域</dt><dd className="font-semibold text-ink">{w.area}</dd></div>}
      </dl>
      <p className={featured ? "mt-4 max-w-[68ch] text-[15px] leading-[1.9] text-ink" : "mt-3 text-[14px] leading-[1.8] text-muted"}>{w.summary}</p>
      <ul className={featured ? "mt-5 grid gap-2 sm:grid-cols-3" : "mt-4 grid gap-1.5"}>
        {w.points.map((p) => (
          <li key={p} className={featured ? "flex items-start gap-2 rounded-sm bg-surface px-3 py-2.5 text-[13.5px] font-semibold text-ink" : "grid grid-cols-[18px_1fr] gap-2 text-[13.5px] leading-[1.7] text-ink"}>
            {featured ? <Icon name="check" size={16} className="mt-1 shrink-0 text-accent" /> : <span className="mt-[9px] h-px w-3 bg-accent" aria-hidden="true" />}
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function WorksPage() {
  const disaster = works.filter((w) => w.category === "災害対応");
  const grouped = categoryOrder
    .map((c) => ({ ...c, items: works.filter((w) => w.category === c.key) }))
    .filter((c) => c.items.length > 0);

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Works"
        title="実績・対応事例"
        lead={`${site.licenseStarted}の業務開始から、災害対応・道路規制・建築現場・イベント・商業施設での対応事例をまとめました。どの現場でも、配置・出退勤・報告を自社システムで管理し、終了後に報告書をお届けしています。`}
        chips={[site.license.label, `業務開始 ${site.licenseStarted}`, `隊員${site.stats.guards}名（${site.stats.asOf}）`, "熊本県全域"]}
      >
        <p className="text-[13.5px] text-muted">事例は発注者を特定できない形で掲載しています。業種・規模・内容のみを記載し、固有名詞は省いています。</p>
      </PageHero>

      {/* 災害対応：最上段で大きめに */}
      {disaster.length > 0 && (
        <Section eyebrow="Disaster response" title={disasterResponse.title} lead={disasterResponse.summary}>
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Note title="八代待機所を拠点にした配置">{disasterResponse.base}</Note>
            <div className="rounded-sm border border-line bg-bg p-5">
              <p className="text-[13px] font-bold text-heading">令和8年熊本地震 関連工事で対応していること</p>
              <ul className="mt-2 grid gap-1.5 text-[13.5px] leading-[1.7] text-ink">
                {disasterResponse.points.map((pt) => <li key={pt} className="flex items-start gap-2"><Icon name="check" size={15} className="mt-1 shrink-0 text-accent" />{pt}</li>)}
              </ul>
            </div>
          </div>
          <div className="grid gap-6">
            {disaster.slice(0, 1).map((w) => <WorkCard key={w.slug} w={w} featured />)}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {disaster.slice(1).map((w) => <WorkCard key={w.slug} w={w} />)}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/news/2026-07-earthquake-response" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">お知らせ：令和8年熊本地震に伴う緊急警備と物資支援プロジェクトについて <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </Section>
      )}

      {/* カテゴリ別一覧 */}
      {grouped.map((c, i) => (
        <Section key={c.key} tone={i % 2 === 0 ? "surface" : "bg"} eyebrow={`Category ${String(i + 1).padStart(2, "0")}`} title={c.key} lead={c.lead}>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.items.map((w) => <WorkCard key={w.slug} w={w} />)}
          </div>
        </Section>
      ))}

      {/* 共通して行っていること */}
      <Section tone={grouped.length % 2 === 0 ? "surface" : "bg"} eyebrow="In every case" title="どの現場でも行っていること" lead="実績の数より、一つひとつの現場で何をしているかを見ていただきたいと考えています。">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "配置前に現場条件を確認", d: "動線・交差点・歩行者の多い時間帯を確認し、人数と資格者の要否を決めてから見積を出します。" },
            { t: "出退勤と報告を自社システムで管理", d: "欠員が出にくく、当日の状況が管制に届きます。終了後の報告書は当日中を基本にお届けします。" },
            { t: "変更は必ず事前に相談", d: "無断で配置人数や隊員を変更しません。やむを得ない変更は、理由とあわせてご担当者に事前にご連絡します。" },
          ].map((it, i) => (
            <div key={it.t} className="rounded-sm border border-line bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-[16px] font-bold">{it.t}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{it.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <Note>
            事例の数字（人数・日数・来場者数）は、発注者の了承が得られたものから順次追記します。掲載内容について確認したい点があれば、お問い合わせください。
          </Note>
          <div className="flex flex-wrap gap-2">
            <Chip><Icon name="doc" size={14} className="text-accent" />安全書類対応</Chip>
            <Chip><Icon name="check" size={14} className="text-accent" />公共工事積算に準拠した見積書式</Chip>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/services" variant="secondary">警備サービス一覧 <Icon name="arrow" size={16} /></Button>
          <Button href="/pricing" variant="secondary">料金の考え方 <Icon name="arrow" size={16} /></Button>
          <Button href="/company/education" variant="secondary">教育・品質体制 <Icon name="arrow" size={16} /></Button>
        </div>
      </Section>

      <ContactBand
        title="同じような現場でお困りですか"
        lead="現場の種類・場所・期間・人数をお知らせください。類似の事例があれば、配置案とあわせてご提案します。営業時間内は原則30分以内に一次回答します。"
        formLabel="現場の条件を送って見積をもらう"
      />
    </>
  );
}
