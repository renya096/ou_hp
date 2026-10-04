import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note, DefList } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, Faq, ContactBand, AreaDiagram, TwoColumnList } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site, definitions } from "@/content/site";
import { protection } from "@/content/protection";
import { LegalNote, PlaceholderFigure, protectionServiceJsonLd } from "./_components/shared";

const path = protection.path;
const title = "身辺警護（4号警備・ボディガード）｜SPとの違い・費用・全国対応";
const description = `警備業法第4号の身辺警護。${site.protectionStart}開始、自衛隊出身者を中心とする警護員${site.stats.protectionTeam}名が熊本を拠点に全国へ出張対応。株主総会・不当要求・カスハラの法人対応、YouTuber・VTuberのイベント随行、ストーカー・つきまといの個人相談（匿名可）。英語対応。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: { ja: path, en: "/en/bodyguard", "x-default": path } },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "身辺警護" }];
const tel = `tel:${site.tel.replace(/-/g, "")}`;

export default function ProtectionPage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <JsonLd data={[
        protectionServiceJsonLd({ path, name: `身辺警護（ボディガード）｜${protection.brand}`, description: definitions.protection, audience: protection.audience }),
        faqJsonLd(protection.faq),
        breadcrumbJsonLd(crumbs),
      ]} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Protection — 身辺警備業務（4号）"
        title={<span className="font-serif font-medium">身辺警護（4号警備・ボディガード）</span>}
        lead={definitions.protection}
        chips={["警備業法第2条第1項第4号", `${site.protectionStart}開始`, `警護員${site.stats.protectionTeam}名（${site.stats.asOf}）`, "全国対応（出張）", "English support"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={protection.contactPath} size="lg"><Icon name="doc" size={20} />相談する（匿名可）</Button>
          <Button href={tel} variant="secondary" size="lg"><Icon name="phone" size={20} /><span className="num">{site.telDisplay}</span></Button>
        </div>
        <LegalNote className="mt-5" />
      </PageHero>

      {/* 対象別の入口 */}
      <Section eyebrow="Who we protect" title="こんなお悩みに" lead="守る相手と場面によって、計画の立て方が変わります。近いものからお進みください。">
        <CardGrid cols={4}>
          {protection.audiences.map((a) => <FeatureCard key={a.key} icon={a.icon} meta={a.meta} title={a.title} body={a.body} href={a.href} />)}
        </CardGrid>
      </Section>

      {/* できること／できないこと */}
      <Section tone="surface" eyebrow="Scope" title="身辺警護でできること・できないこと" lead="警備業法・弁護士法・探偵業法の範囲を守ることが、お客様を守ることにつながります。できないことは最初にお伝えします。">
        <TwoColumnList
          left={{ title: protection.can.title, icon: "check", items: [...protection.can.items] }}
          right={{ title: protection.cannot.title, icon: "shield-off", items: [...protection.cannot.items] }}
        />
      </Section>

      {/* 警護員について */}
      <Section eyebrow="Team" title={<span className="font-serif font-medium">{protection.team.headline}</span>} lead={protection.team.lead}>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {protection.team.points.map((p, i) => (
              <div key={p.title} className="bg-bg p-6">
                <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-[16.5px] font-bold">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.8] text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <PlaceholderFigure caption={protection.team.photoCaption} />
            <ul className="grid gap-2">
              {protection.team.options.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[14px] text-ink"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 流れ */}
      <Section tone="surface" eyebrow="Flow" title="ご相談から警護開始まで" lead="お見積りは無料です。契約前には警備業法に基づく書面でご説明し、秘密保持条項を含む契約を結びます。">
        <Steps items={protection.flow} />
        <div className="mt-8"><Link href="/protection/flow" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">流れと秘匿方針の詳細 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* 料金 */}
      <Section eyebrow="Pricing" title="料金の考え方" lead={protection.pricing.lead}>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <DefList items={protection.pricing.standard} />
          <div className="grid gap-4">
            <Note title="一般的な相場（参考）">
              {protection.pricing.market}
              <span className="mt-2 block text-[12.5px] text-muted">{protection.pricing.marketNote}</span>
            </Note>
            <Button href={protection.contactPath} size="lg" className="w-full"><Icon name="doc" size={20} />条件を送って見積をもらう</Button>
          </div>
        </div>
      </Section>

      {/* エリア */}
      <Section tone="surface" eyebrow="Area" title="対応エリア" lead="熊本を拠点に、九州全域は最短での現地調整、東京・大阪など遠方は前日現地入りを含む計画型で全国に出張対応します。">
        <AreaDiagram emphasis="japan" />
      </Section>

      {/* 秘匿 */}
      <Section eyebrow="Confidentiality" title="秘匿・情報の扱い" lead="守られる方の情報が漏れないことも、身辺警護の一部です。">
        <CardGrid cols={3}>
          {protection.confidentiality.map((c, i) => <FeatureCard key={c.title} meta={String(i + 1).padStart(2, "0")} title={c.title} body={c.body} />)}
        </CardGrid>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="surface" eyebrow="FAQ" title="よくあるご質問">
        <Faq items={protection.faq} />
      </Section>

      <ContactBand
        variant="protect"
        title={<span className="font-serif font-medium">まず、状況をお聞かせください。</span>}
        lead="相談だけで終わっても構いません。法人の方はオンライン初回相談（30分・無料）、個人の方は匿名でご相談いただけます。"
        formHref={protection.contactPath}
        formLabel="相談する（匿名可）"
        showLine={false}
        note={<>{protection.responseNote}。身の危険が差し迫っている場合は、まず110番へ。<span className="block mt-1">{protection.legalName}</span></>}
      />
    </div>
  );
}
