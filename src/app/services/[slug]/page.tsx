import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, Faq, ContactBand, AreaDiagram } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { guardServices, getGuardService, guardFlow } from "@/content/services";
import { site } from "@/content/site";

export function generateStaticParams() {
  return guardServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getGuardService(slug);
  if (!s) return {};
  return { title: s.title, description: s.description, alternates: { canonical: s.path }, openGraph: { title: s.title, description: s.description, url: s.path } };
}

export default async function GuardServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getGuardService(slug);
  if (!s) notFound();
  const crumbs = [{ href: "/services", label: "警備サービス" }, { href: s.path, label: s.name }];
  const others = guardServices.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={[
        serviceJsonLd({ path: s.path, name: `${s.name}（${site.shortName}）`, serviceType: s.serviceType, description: s.lead, audience: s.audience }),
        faqJsonLd(s.faq),
        breadcrumbJsonLd(crumbs),
      ]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="警備サービス（2号）"
        title={s.h1}
        lead={s.lead}
        chips={[site.license.label, "熊本県全域", "24時間365日", `検定2級保持者 ${site.stats.certified2}名在籍`]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg"><Icon name="doc" size={20} />この業務で見積を依頼</Button>
          <Button href={site.line.business} variant="secondary" size="lg"><Icon name="line" size={20} />LINEで相談</Button>
        </div>
      </PageHero>

      <Section eyebrow="Scenes" title="こんなときにご相談ください">
        <CardGrid cols={3}>
          {s.scenes.map((sc) => <FeatureCard key={sc.title} title={sc.title} body={sc.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Tasks" title="対応業務">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {s.tasks.map((t, i) => (
            <div key={t.title} className="bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-[17px] font-bold">{t.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why OU" title={`${site.shortName}の${s.name}が選ばれる理由`}>
        <CardGrid cols={2}>
          {s.reasons.map((r, i) => <FeatureCard key={r.title} meta={String(i + 1).padStart(2, "0")} title={r.title} body={r.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Flow" title="ご依頼から配置までの流れ" lead="お見積りは無料です。契約前には警備業法に基づく書面でご説明します。">
        <Steps items={guardFlow} />
      </Section>

      <Section eyebrow="Pricing" title="料金の考え方" lead="警備員1名1日あたりの単価を基本に、人数・時間帯・資格者配置・曜日・期間で算定します。">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <Note title="基準単価の目安と、積算の考え方">
            当社の基準単価の目安は、交通誘導警備員B 17,000円〜、交通誘導警備員A（検定資格者）19,400円〜（1名1日・日中8時間）です。国土交通省の令和8年3月適用 公共工事設計労務単価（熊本県 A 17,700円／B 15,500円）を基準に、社会保険・教育・装備・管制の費用を含めて算定しています。夜間・休日・短時間・遠方の割増、中止時の規定もあわせてご説明します。
          </Note>
          <Button href="/pricing" variant="secondary" size="lg" className="w-full">料金の考え方を詳しく見る <Icon name="arrow" size={18} /></Button>
        </div>
      </Section>

      <Section tone="surface" eyebrow="Area" title="対応エリア" lead="熊本市を中心に熊本県全域に対応。県外の現場もご相談ください。">
        <AreaDiagram emphasis="kumamoto" />
      </Section>

      <Section eyebrow="FAQ" title="よくあるご質問">
        <Faq items={s.faq} />
        <div className="mt-6"><Link href="/faq" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">すべてのご質問を見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section tone="surface" eyebrow="Other services" title="ほかの警備サービス">
        <CardGrid cols={2}>
          {others.map((o) => <FeatureCard key={o.slug} icon={o.icon} title={o.name} body={o.short} href={o.path} />)}
        </CardGrid>
      </Section>

      <ContactBand
        title={<>{s.name}のお見積り・ご相談</>}
        lead="現場の種類・場所・期間・人数をお知らせください。営業時間内は原則30分以内に一次回答します。"
        formLabel="現場の条件を送って見積をもらう"
      />
    </>
  );
}
