import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, Faq, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { protection } from "@/content/protection";
import { LegalNote, protectionServiceJsonLd } from "../_components/shared";

const c = protection.corporate;
const path = c.path;

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: path },
  openGraph: { title: c.title, description: c.description, url: path },
};

const crumbs = [{ href: protection.path, label: "身辺警護" }, { href: path, label: "企業・医療機関・士業の方へ" }];

export default function ProtectionCorporatePage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <JsonLd data={[
        protectionServiceJsonLd({ path, name: `法人向け身辺警護｜${protection.brand}`, description: c.lead, audience: c.audience, relatedTo: protection.path }),
        faqJsonLd(c.faq),
        breadcrumbJsonLd(crumbs),
      ]} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Corporate — 企業・医療機関・士業の方へ"
        title={<span className="font-serif font-medium">{c.h1}</span>}
        lead={c.lead}
        chips={["弁護士と連携", "NDA対応", "オンライン初回相談 30分無料", "全国対応（出張）", "英語対応"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`${protection.contactPath}#corporate`} size="lg"><Icon name="doc" size={20} />法人の相談フォームへ</Button>
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary" size="lg"><Icon name="phone" size={20} /><span className="num">{site.telDisplay}</span></Button>
        </div>
        <LegalNote className="mt-5" />
      </PageHero>

      <Section eyebrow="Scenes" title="こんな場面でご相談ください" lead="共通するのは「相手がいる」こと。応対はお客様が行い、私たちは危害の発生を未然に警戒・回避し、必要なときは退避誘導と警察への即時通報を行います。">
        <CardGrid cols={3}>
          {c.scenes.map((s, i) => (
            <FeatureCard key={s.title} meta={String(i + 1).padStart(2, "0")} title={s.title} body={<>{s.body}{s.note && <span className="num mt-2 block text-[12.5px] text-accent">{s.note}</span>}</>} href={s.title.includes("英語") ? "/en/bodyguard" : undefined} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Our commitments" title="法人のお客様への3つの約束">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {c.promises.map((p) => (
            <div key={p.title} className="bg-bg p-6">
              <h3 className="text-[17px] font-bold">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Scope" title="私たちの役割と、弁護士・警察の役割" lead="役割をはっきり分けることで、お客様の対応全体が速く、強くなります。">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { who: "OU警備保障 身辺警護", does: "現場の安全。身辺への随行、会場・動線の警戒、退避誘導、警察への即時通報、報告書。", icon: "earpiece" as const },
            { who: "弁護士", does: "相手方との交渉・示談、警告書・内容証明、仮処分や訴訟などの法的手続き。", icon: "doc" as const },
            { who: "警察", does: "緊急時の対応、被害届・相談の受理、ストーカー規制法に基づく警告・禁止命令。", icon: "phone" as const },
          ].map((r) => (
            <div key={r.who} className="rounded-sm border border-line bg-bg p-6">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={r.icon} size={24} /></span>
              <h3 className="text-[16px] font-bold">{r.who}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{r.does}</p>
            </div>
          ))}
        </div>
        <Note title="行わないこと" tone="accent">
          相手方の調査・尾行・身元特定（探偵業）、交渉・示談・警告書の送付（弁護士法）は行いません。必要に応じて提携する探偵業者・弁護士をご紹介し、ご相談には警護員が同行します。
        </Note>
      </Section>

      <Section tone="surface" eyebrow="Flow" title="ご相談から警護開始まで" lead="初回はオンラインで30分、無料です。警護が適切でない場合は、その旨と他の選択肢をお伝えします。">
        <Steps items={protection.flow} />
        <div className="mt-8"><Link href="/protection/flow" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">流れと秘匿方針の詳細 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section eyebrow="Pricing" title="料金の考え方" lead={protection.pricing.lead}>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <ul className="grid gap-3 sm:grid-cols-2">
            {protection.pricing.standard.map((it) => (
              <li key={it.term} className="rounded-sm border border-line bg-bg px-4 py-3"><p className="text-[13.5px] font-semibold text-muted">{it.term}</p><p className="mt-0.5 text-[14.5px] text-ink">{it.desc}</p></li>
            ))}
          </ul>
          <Note title="一般的な相場（参考）">{protection.pricing.market}<span className="mt-2 block text-[12.5px] text-muted">{protection.pricing.marketNote}</span></Note>
        </div>
      </Section>

      <Section tone="surface" eyebrow="FAQ" title="法人のお客様からのご質問">
        <Faq items={c.faq} />
        <div className="mt-6"><Link href={`${protection.path}#faq`} className="inline-flex items-center gap-1 text-[14px] font-bold text-action">身辺警護全般のご質問 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <ContactBand
        variant="protect"
        title={<span className="font-serif font-medium">総務・人事・法務のご担当者の方へ。</span>}
        lead="案件の種別・日程・場所・想定人数をお知らせください。NDAをご希望の場合は、相談の段階から締結できます。"
        formHref={`${protection.contactPath}#corporate`}
        formLabel="法人の相談フォームへ"
        showLine={false}
        note={<>{protection.responseNote}。<span className="mt-1 block">{protection.legalName}</span></>}
      />
    </div>
  );
}
