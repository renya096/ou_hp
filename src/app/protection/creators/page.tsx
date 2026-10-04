import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Faq, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { protection } from "@/content/protection";
import { LegalNote, PlaceholderFigure, protectionServiceJsonLd } from "../_components/shared";

const c = protection.creators;
const path = c.path;

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: path },
  openGraph: { title: c.title, description: c.description, url: path },
};

const crumbs = [{ href: protection.path, label: "身辺警護" }, { href: path, label: "クリエイター・イベントの方へ" }];

export default function ProtectionCreatorsPage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <JsonLd data={[
        protectionServiceJsonLd({ path, name: `クリエイター・イベントの身辺警護｜${protection.brand}`, description: c.lead, audience: c.audience, relatedTo: protection.path }),
        faqJsonLd(c.faq),
        breadcrumbJsonLd(crumbs),
      ]} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Creators & Events — クリエイター・イベントの方へ"
        title={<span className="font-serif font-medium">{c.h1}</span>}
        lead={c.lead}
        chips={["出演者随行（4号）＋会場雑踏（2号）", "顔・本名を知らせない体制可", "全国出張対応", "配信の写り込みに配慮"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`${protection.contactPath}#corporate`} size="lg"><Icon name="doc" size={20} />会場図と来場見込みを送る</Button>
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary" size="lg"><Icon name="phone" size={20} /><span className="num">{site.telDisplay}</span></Button>
        </div>
        <LegalNote className="mt-5" />
      </PageHero>

      {/* 2号＋4号を一体で */}
      <Section eyebrow="One team" title={<span className="font-serif font-medium">{c.oneTeam.title}</span>} lead={c.oneTeam.body}>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-line bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">4号 — 身辺警備</p>
              <h3 className="mt-1 text-[17px] font-bold">出演者の随行</h3>
              <ul className="mt-3 grid gap-2 text-[14px] text-ink">
                {["楽屋〜ステージ〜特典会の動線に随行", "登壇・降壇、至近での接触時の警戒", "終演後の退場経路と車両乗降の警戒", "移動・宿泊先での警戒"].map((t) => <li key={t} className="flex items-start gap-2"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{t}</li>)}
              </ul>
            </div>
            <div className="rounded-sm border border-line bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">2号 — 雑踏警備</p>
              <h3 className="mt-1 text-[17px] font-bold">会場の来場者整理</h3>
              <ul className="mt-3 grid gap-2 text-[14px] text-ink">
                {["入退場・待機列の整理と入場制限", "特典会の列と滞留ポイントの管理", "会場外・駐車場の誘導", "警備計画書の作成と警察協議への同席"].map((t) => <li key={t} className="flex items-start gap-2"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{t}</li>)}
              </ul>
              <Link href="/services/crowd-control" className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold text-action">イベント・雑踏警備（2号）の詳細 <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
          <div className="grid gap-3">
            {c.oneTeam.points.map((t) => (
              <p key={t} className="flex items-start gap-2 rounded-sm border border-line bg-surface px-4 py-3 text-[14px] font-semibold text-ink"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{t}</p>
            ))}
            <PlaceholderFigure caption={c.photoCaption} />
          </div>
        </div>
      </Section>

      <Section tone="surface" eyebrow="Scenes" title="こんな場面でご相談ください">
        <CardGrid cols={3}>
          {c.scenes.map((s, i) => (
            <FeatureCard key={s.title} meta={String(i + 1).padStart(2, "0")} title={s.title} body={<>{s.body}{s.note && <span className="num mt-2 block text-[12.5px] text-accent">{s.note}</span>}</>} />
          ))}
        </CardGrid>
      </Section>

      {/* 主催者向けチェックリスト */}
      <Section eyebrow="For organizers" title={c.checklist.title} lead={c.checklist.body}>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <ol className="grid gap-2 sm:grid-cols-2">
            {c.checklist.items.map((t, i) => (
              <li key={t} className="grid grid-cols-[32px_1fr] items-start gap-2 rounded-sm border border-line bg-bg px-4 py-3 text-[14px] text-ink">
                <span className="num text-[13px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>{t}
              </li>
            ))}
          </ol>
          <div className="grid gap-4">
            <Note title="素性を公開していない出演者の方へ">
              契約の窓口は事務所やマネージャーの方で構いません。警護員には「警護対象者」としての動線と合図だけを共有し、顔や本名を知らせない体制を組めます。
            </Note>
            <Button href={`${protection.contactPath}#corporate`} size="lg" className="w-full"><Icon name="doc" size={20} />会場図と来場見込みを送る</Button>
            <p className="num text-center text-[12.5px] text-muted">{protection.responseNote}</p>
          </div>
        </div>
      </Section>

      <Section tone="surface" eyebrow="Pricing" title="料金の考え方" lead={protection.pricing.lead}>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <ul className="grid gap-3 sm:grid-cols-2">
            {protection.pricing.standard.map((it) => (
              <li key={it.term} className="rounded-sm border border-line bg-bg px-4 py-3"><p className="text-[13.5px] font-semibold text-muted">{it.term}</p><p className="mt-0.5 text-[14.5px] text-ink">{it.desc}</p></li>
            ))}
          </ul>
          <Note title="一般的な相場（参考）">{protection.pricing.market}<span className="mt-2 block text-[12.5px] text-muted">{protection.pricing.marketNote}</span></Note>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="事務所・主催者・出演者の方からのご質問">
        <Faq items={c.faq} />
        <div className="mt-6"><Link href={`${protection.path}#faq`} className="inline-flex items-center gap-1 text-[14px] font-bold text-action">身辺警護全般のご質問 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <ContactBand
        variant="protect"
        title={<span className="font-serif font-medium">会場図と来場見込み数を、まず送ってください。</span>}
        lead="揃っていなくても構いません。配置案と見積書を、出演者の随行と会場の整理をひとつにまとめてお返しします。"
        formHref={`${protection.contactPath}#corporate`}
        formLabel="相談フォームへ"
        showLine={false}
        note={<>{protection.responseNote}。<span className="mt-1 block">{protection.legalName}</span></>}
      />
    </div>
  );
}
