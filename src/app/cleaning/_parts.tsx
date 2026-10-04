import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, Faq, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { cleaningSegments, cleaningFlow, cleaningPricingNote, type CleaningSegment } from "@/content/cleaning";

/** 写真が入るまでの枠。何を撮るかをキャプションに書く。 */
export function PhotoFrame({ caption, ratio = "aspect-[16/9]" }: { caption: string; ratio?: string }) {
  return (
    <figure className="overflow-hidden rounded-sm border border-line">
      <div className={`${ratio} grid place-items-center bg-surface`} aria-hidden="true">
        <span className="text-[12px] text-muted">写真</span>
      </div>
      <figcaption className="px-3 py-2 text-[12.5px] text-muted">{caption}</figcaption>
    </figure>
  );
}

/** 清掃の料金注意（全ページ共通） */
export function CleaningPricing() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <Note title={cleaningPricingNote.title}>{cleaningPricingNote.body}</Note>
      <ul className="grid gap-2 rounded-sm border border-line bg-bg p-5 text-[14px]">
        <li className="text-[12.5px] font-semibold uppercase tracking-wider text-muted">追加料金が発生しうるケース</li>
        {["通常以上の汚れの度合い（長期間未清掃など）", "深夜帯（22時〜5時）の作業", "駐車場代・有料道路代", "刈草・ゴミの処分量が多い場合"].map((t) => (
          <li key={t} className="flex items-start gap-2 text-ink"><Icon name="check" size={16} className="mt-1 shrink-0 text-accent" />{t}</li>
        ))}
        <li className="pt-1 text-[12.5px] text-muted">いずれも見積時に事前にお伝えします。</li>
      </ul>
    </div>
  );
}

export function CleaningContactBand({ title, lead }: { title: string; lead: string }) {
  return (
    <ContactBand
      title={title}
      lead={lead}
      variant="clean"
      formHref="/cleaning/contact"
      formLabel="無料で現地確認を依頼"
      lineHref={site.line.business}
      lineLabel="LINEで写真を送って相談"
      note={<>清掃のメール窓口：<a href={`mailto:${site.email.cleaning}`} className="num underline underline-offset-4">{site.email.cleaning}</a></>}
    />
  );
}

/** 店舗・民泊・屋外の下層ページ共通テンプレート */
export function CleaningSegmentPage({ s }: { s: CleaningSegment }) {
  const crumbs = [{ href: "/cleaning", label: "OUクリーンサービス" }, { href: s.path, label: s.name }];
  const others = cleaningSegments.filter((o) => o.slug !== s.slug);
  const service = {
    ...serviceJsonLd({ path: s.path, name: `${s.name}（OUクリーンサービス）`, serviceType: s.serviceType, description: s.lead, audience: s.audience, relatedTo: "/cleaning" }),
    availableChannel: { "@type": "ServiceChannel", serviceUrl: `${site.url}/cleaning/contact`, servicePhone: { "@type": "ContactPoint", telephone: `+81-${site.tel.slice(1)}` }, availableLanguage: ["ja"] },
  };

  return (
    <div data-theme="clean">
      <JsonLd data={[service, faqJsonLd(s.faq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="OU Clean Service"
        title={s.h1}
        lead={s.lead}
        chips={[site.area.cleaning, "深夜・早朝の作業に対応", "完了報告は写真で", "損害賠償保険加入", "お見積り無料"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.line.business} size="lg"><Icon name="line" size={20} />LINEで写真を送って概算見積</Button>
          <Button href="/cleaning/contact" variant="secondary" size="lg"><Icon name="doc" size={20} />現地確認を依頼</Button>
        </div>
      </PageHero>

      <Section eyebrow="Scenes" title="こんなときにご相談ください">
        <CardGrid cols={3}>
          {s.scenes.map((sc) => <FeatureCard key={sc.title} title={sc.title} body={sc.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Tasks" title="作業内容">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {s.tasks.map((t, i) => (
            <div key={t.title} className="bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-[17px] font-bold">{t.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Photos" title={s.beforeAfter ? "作業の前後" : "現場の様子"} lead="写真は順次掲載します。">
        {s.beforeAfter ? (
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><p className="num mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted">Before</p><PhotoFrame caption={s.photos[0]} /></div>
              <div><p className="num mb-2 text-[12px] font-semibold uppercase tracking-wider text-accent">After</p><PhotoFrame caption={s.photos[1]} /></div>
            </div>
            {s.photos[2] && <div className="sm:max-w-[50%]"><PhotoFrame caption={s.photos[2]} /></div>}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.photos.map((p) => <PhotoFrame key={p} caption={p} />)}
          </div>
        )}
      </Section>

      <Section tone="surface" eyebrow="Why OU" title={`${s.name}をOUクリーンサービスに任せる理由`}>
        <CardGrid cols={2}>
          {s.reasons.map((r, i) => <FeatureCard key={r.title} meta={String(i + 1).padStart(2, "0")} title={r.title} body={r.body} />)}
        </CardGrid>
      </Section>

      <Section eyebrow="Pricing" title="料金の考え方">
        <CleaningPricing />
      </Section>

      <Section tone="surface" eyebrow="Flow" title="ご依頼の流れ" lead="LINEで写真を送っていただくのが最短です。現地確認・お見積りは無料です。">
        <Steps items={cleaningFlow} />
      </Section>

      <Section eyebrow="FAQ" title="よくあるご質問">
        <Faq items={s.faq} />
      </Section>

      <Section tone="surface" eyebrow="Other" title="ほかの清掃メニュー">
        <CardGrid cols={3}>
          {others.map((o) => <FeatureCard key={o.slug} icon={o.icon} title={o.name} body={o.description.split("。")[0] + "。"} href={o.path} />)}
          <FeatureCard icon="report" title="OUクリーンサービス トップ" body="日常清掃・定期清掃・都度清掃・屋外作業の全メニューと、警備との同時手配について。" href="/cleaning" />
        </CardGrid>
        <div className="mt-6"><Link href="/cleaning/contact" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">現地確認を依頼する <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <CleaningContactBand title={`${s.name}のご相談`} lead="現場の写真と、場所・広さ・希望の頻度と時間帯をお知らせください。営業時間内は原則30分以内に一次回答します。" />
    </div>
  );
}
