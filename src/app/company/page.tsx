import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, DefList, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, StatTiles, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site, definitions } from "@/content/site";
import { timeline } from "@/content/news";

const path = "/company";
const title = "会社概要｜熊本市の警備会社（2号・4号警備）株式会社OU警備保障";
const description = `${site.name}の会社概要。${site.founded}設立、${site.license.label}。所在地 ${site.address.full}。警備員${site.stats.guards}名・清掃スタッフ約${site.stats.cleaningStaff}名（${site.stats.asOf}）。組織図・沿革・行動指針・アクセス。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "会社概要" }];
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=熊本県熊本市中央区本荘6丁目10-15";

const departments = [
  { name: "警備事業部", body: "交通誘導・雑踏・道路規制（2号）と身辺警護（4号）の配置・管制・現場運営", href: "/services" },
  { name: "清掃事業部", body: "OUクリーンサービス。店舗・施設・民泊の清掃、屋外作業", href: "/cleaning" },
  { name: "教育品質管理室", body: `新任・現任教育、現場巡回、行動基準の運用。指導教育責任者${site.stats.instructors}名（年内＋${site.stats.instructorsPlanned}名）`, href: "/company/education" },
  { name: "管理部", body: "採用・労務・経理・システム（配置・出退勤・報告）の運用", href: "/recruit" },
];

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Company"
        title="会社概要"
        lead={definitions.company}
        chips={[site.license.label, `設立 ${site.founded}`, `警備員${site.stats.guards}名（${site.stats.asOf}）`, `資本金 ${site.stats.capital}`]}
      />

      {/* 代表挨拶（短く） */}
      <Section eyebrow="Message" title="One for U — あなたのために">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="max-w-[68ch] text-[15.5px] leading-[2] text-ink">
            <p>社名の「OU」は、「One for U（あなたのために）」から取りました。現場のご担当者のために。守られる方のために。そして、隊員ひとりひとりのために。誰のために動いているのかを、いつも一人の顔で思い浮かべられる会社でありたいと考えています。</p>
            <p className="mt-5">私たちは、自衛隊出身者が{site.founded}に熊本で立ち上げた警備会社です。規律・時間厳守・報告という当たり前を、若い隊員が無理なく続けられる仕組みに置き換えてきました。出退勤と報告はスマホで、配置は自社のシステムで、教育は自社の指導教育責任者が行います。</p>
            <p className="mt-5">歴史はまだ短い会社です。その分、毎日の配置と報告、教育の時間、そして「しないこと」の約束で、信頼を一日ずつ積み重ねていきます。</p>
            <p className="mt-6 text-[14px] text-muted">{site.name}　代表取締役　<span className="font-semibold text-ink">{site.representative}</span></p>
          </div>
          <figure className="overflow-hidden rounded-sm border border-line">
            <div className="aspect-[4/5] grid place-items-center bg-surface" aria-hidden="true"><span className="text-[12px] text-muted">写真</span></div>
            <figcaption className="px-3 py-2 text-[12.5px] text-muted">撮影予定：代表取締役（本社前または現場にて）</figcaption>
          </figure>
        </div>
      </Section>

      {/* 数字 */}
      <Section tone="surface" eyebrow="Numbers" title="数字で見る会社">
        <StatTiles items={[
          { value: site.stats.guards, suffix: "名", label: "警備員（2号）" },
          { value: site.stats.cleaningStaff, suffix: "名", label: "清掃スタッフ（約）" },
          { value: site.stats.averageAge, decimals: 1, suffix: "歳", label: "警備員の平均年齢" },
          { value: site.stats.protectionTeam, suffix: "名", label: "警護員（4号）", note: `${site.protectionStart}開始` },
        ]} />
      </Section>

      {/* 会社概要 */}
      <Section eyebrow="Profile" title="会社概要">
        <DefList items={[
          { term: "会社名", desc: site.name },
          { term: "英文名", desc: <span className="num">{site.englishName}</span> },
          { term: "所在地", desc: <><span className="num">{site.address.full}</span><br /><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-[13.5px] font-bold text-action">Googleマップで開く <Icon name="external" size={14} /></a></> },
          { term: "設立", desc: <span className="num">{site.founded}</span> },
          { term: "代表取締役", desc: site.representative },
          { term: "資本金", desc: <span className="num">{site.stats.capital}</span> },
          { term: "認定", desc: <><span className="num">{site.license.label}（認定年月日 {site.license.certifiedOn}／有効期間 {site.license.validFrom}〜{site.license.validUntil}）</span><br /><span className="text-[13.5px] text-muted">業務区分：{site.license.categories.join("／")}。標識は<Link href="/legal" className="underline underline-offset-4">警備業に関する表示</Link>に掲示。</span></> },
          { term: "加入団体", desc: <ul className="grid gap-1">{site.memberships.map((m) => <li key={m.name}><a href={m.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{m.name}</a></li>)}</ul> },
          { term: "拠点", desc: <ul className="grid gap-1">{site.bases.map((b) => <li key={b.name}>{b.name}<span className="text-[13.5px] text-muted">（{b.role}）</span></li>)}</ul> },
          { term: "事業内容", desc: <ul className="grid gap-1"><li>交通誘導警備・雑踏警備・道路規制業務（警備業法第2条第1項第2号）</li><li>身辺警護業務（同第4号）</li><li>清掃業務（OUクリーンサービス：店舗・施設・民泊の清掃、草刈り・テント設営）</li></ul> },
          { term: "従業員", desc: <span className="num">警備員{site.stats.guards}名・清掃スタッフ約{site.stats.cleaningStaff}名（{site.stats.asOf}）</span> },
          { term: "対応エリア", desc: <>警備：{site.area.guard}／身辺警護：{site.area.protection}／清掃：{site.area.cleaning}</> },
          { term: "連絡先", desc: <ul className="num grid gap-1"><li>電話 <a href={`tel:${site.tel.replace(/-/g, "")}`} className="font-semibold">{site.tel}</a>（{site.hours}）</li><li>FAX {site.fax}</li><li>警備・身辺警護 <a href={`mailto:${site.email.security}`} className="underline underline-offset-4">{site.email.security}</a></li><li>清掃 <a href={`mailto:${site.email.cleaning}`} className="underline underline-offset-4">{site.email.cleaning}</a></li></ul> },
        ]} />
      </Section>

      {/* 組織図 */}
      <Section tone="surface" eyebrow="Organization" title="組織" lead="4つの部門を、代表取締役と取締役会が統括します。教育品質管理室は事業部から独立し、現場の教育と巡回を担います。">
        <div className="grid gap-0 text-center" role="img" aria-label={`組織図：株主総会、取締役会、代表取締役の下に、${departments.map((d) => d.name).join("・")}の4部門`}>
          {["株主総会", "取締役会", "代表取締役"].map((t, i) => (
            <div key={t} className="flex flex-col items-center">
              <div className={`w-full max-w-[280px] rounded-sm border px-4 py-3 text-[15px] font-bold ${i === 2 ? "border-navy bg-navy text-white" : "border-line bg-bg text-heading"}`}>{t}</div>
              <span className="h-6 w-px bg-line" aria-hidden="true" />
            </div>
          ))}
          <div className="relative mx-auto hidden h-px w-[75%] bg-line lg:block" aria-hidden="true" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {departments.map((d) => (
              <li key={d.name} className="flex flex-col items-center">
                <span className="hidden h-6 w-px bg-line lg:block" aria-hidden="true" />
                <Link href={d.href} className="flex h-full w-full flex-col rounded-sm border border-line bg-bg p-5 text-left transition-colors hover:border-ink">
                  <p className="text-[16px] font-bold text-heading">{d.name}</p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.7] text-muted">{d.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 沿革 */}
      <Section eyebrow="History" title="沿革">
        <ol className="grid gap-0 border-l-2 border-line">
          {timeline.map((t) => (
            <li key={t.date} className="grid grid-cols-[88px_1fr] gap-4 pb-6 pl-5 last:pb-0 sm:grid-cols-[120px_1fr]">
              <time className="num text-[14px] font-semibold text-accent">{t.date}</time>
              <p className="text-[15px] leading-[1.8] text-ink">{t.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6"><Link href="/news" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">お知らせ一覧 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* 行動指針 */}
      <Section tone="surface" eyebrow="Principles" title="行動指針" lead={`ミッションは「${site.mission}」。現場でどう動くかを、5つの言葉で決めています。`}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {site.principles.map((p, i) => (
            <li key={p.title} className="rounded-sm border border-line bg-bg p-5">
              <p className="num text-[12px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-[16px] font-bold text-heading">{p.title}</p>
              <p className="mt-1.5 text-[13.5px] leading-[1.7] text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6"><Link href="/company/education" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">教育・品質体制（行動基準「しないこと」） <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* アクセス */}
      <Section eyebrow="Access" title="アクセス">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="num text-[16px] font-semibold text-heading">{site.address.full}</p>
            <p className="mt-2 text-[14.5px] leading-[1.8] text-muted">本社は熊本市中央区本荘。ご来社の際は事前にお電話ください。現場でのお打ち合わせ、オンラインでのご説明にも対応します。</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={mapsUrl} variant="secondary"><Icon name="pin" size={18} />Googleマップで開く <Icon name="external" size={14} /></Button>
              <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span></Button>
            </div>
          </div>
          <Note title="ご来社について">
            隊員は現場に直行直帰するため、本社に常駐するのは管理部門のみです。お見積り・ご契約のご説明は、お客様の事務所または現場に伺うことが多くなっています。
          </Note>
        </div>
      </Section>

      <ContactBand
        title="お見積り・ご相談"
        lead="警備・清掃のご相談は24時間受け付けています。営業時間内は原則30分以内に一次回答します。"
        note={<>身辺警護のご相談は<Link href="/protection/contact" className="underline underline-offset-4">専用フォーム（匿名可）</Link>へ。採用に関するお問い合わせは<Link href="/recruit" className="underline underline-offset-4">採用情報</Link>をご覧ください。</>}
      />
    </>
  );
}
