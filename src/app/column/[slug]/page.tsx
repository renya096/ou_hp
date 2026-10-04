import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, Button, Note, Eyebrow } from "@/components/ui/primitives";
import { Breadcrumbs, Faq, ContactBand, FeatureCard, CardGrid } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd, articleJsonLd } from "@/lib/jsonld";
import { columns, getColumn } from "@/content/columns";
import { site } from "@/content/site";

export function generateStaticParams() {
  return columns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getColumn(slug);
  if (!c) return {};
  const path = `/column/${c.slug}`;
  return { title: c.title, description: c.description, keywords: c.targetKeywords, alternates: { canonical: path }, openGraph: { title: c.title, description: c.description, url: path, type: "article", publishedTime: c.publishedAt, modifiedTime: c.updatedAt ?? c.publishedAt } };
}

const ctaMap = {
  guard: { title: "交通誘導・雑踏警備のお見積り・ご相談", formHref: "/contact", formLabel: "現場の条件を送って見積をもらう", variant: "guard" as const, showLine: true },
  protection: { title: "身辺警護のご相談（匿名可）", formHref: "/protection/contact", formLabel: "相談する（匿名可）", variant: "protect" as const, showLine: false },
  recruit: { title: "警備・清掃スタッフ募集", formHref: "/recruit/entry", formLabel: "応募フォーム", variant: "recruit" as const, showLine: true },
  cleaning: { title: "清掃の現地確認・お見積り", formHref: "/cleaning/contact", formLabel: "無料で現地確認を依頼", variant: "clean" as const, showLine: true },
};

export default async function ColumnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getColumn(slug);
  if (!c) notFound();
  const path = `/column/${c.slug}`;
  const crumbs = [{ href: "/column", label: "コラム" }, { href: path, label: c.title }];
  const others = columns.filter((o) => o.slug !== c.slug && (c.related.includes(`/column/${o.slug}`) || o.category === c.category)).slice(0, 3);
  const cta = ctaMap[c.cta];
  const relatedPages = c.related.filter((r) => !r.startsWith("/column/"));

  return (
    <>
      <JsonLd data={[
        articleJsonLd({ path, headline: c.title, description: c.description, datePublished: c.publishedAt, dateModified: c.updatedAt, keywords: c.targetKeywords, section: c.category }),
        ...(c.faq && c.faq.length ? [faqJsonLd(c.faq)] : []),
        breadcrumbJsonLd(crumbs),
      ]} />
      <Breadcrumbs items={crumbs} />
      <header className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-[76ch]">
            <Eyebrow className="mb-3"><span>{c.category}</span></Eyebrow>
            <h1 className="text-[32px] font-black leading-[1.2] tracking-[-0.02em] sm:text-[46px]">{c.title}</h1>
            <p className="num mt-4 flex flex-wrap gap-x-4 text-[12.5px] text-muted">
              <span>公開 <time dateTime={c.publishedAt}>{c.publishedAt.replace(/-/g, ".")}</time></span>
              {c.updatedAt && <span>更新 <time dateTime={c.updatedAt}>{c.updatedAt.replace(/-/g, ".")}</time></span>}
              <span>読了 約{c.readingMinutes}分</span>
              <span>執筆：{site.name}</span>
            </p>
            <p className="mt-6 text-[16px] leading-[1.9] text-ink sm:text-[17px]">{c.lead}</p>
          </div>
        </Container>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
          <article className="max-w-[72ch]">
            <nav aria-label="目次" className="mb-10 rounded-sm border border-line bg-card p-5">
              <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Contents</p>
              <ol className="mt-3 grid gap-1.5 text-[14px]">
                {c.sections.map((s, i) => <li key={s.heading}><a href={`#s${i + 1}`} className="text-ink hover:text-action"><span className="num mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>{s.heading}</a></li>)}
                {c.faq && c.faq.length > 0 && <li><a href="#faq" className="text-ink hover:text-action"><span className="num mr-2 text-muted">{String(c.sections.length + 1).padStart(2, "0")}</span>よくあるご質問</a></li>}
              </ol>
            </nav>
            {c.sections.map((s, i) => (
              <section key={s.heading} id={`s${i + 1}`} className="mt-10 scroll-mt-24 first:mt-0">
                <h2 className="text-[22px] font-black leading-[1.35] tracking-[-0.01em] sm:text-[26px]">{s.heading}</h2>
                {s.body.map((p, j) => <p key={j} className="mt-4 text-[15.5px] leading-[1.95] text-ink">{p}</p>)}
                {s.list && (
                  <ul className="mt-4 grid gap-2">
                    {s.list.map((li) => <li key={li} className="grid grid-cols-[18px_1fr] gap-2 text-[15px] leading-[1.8]"><span className="mt-[13px] h-px w-3 bg-engi" aria-hidden="true" />{li}</li>)}
                  </ul>
                )}
                {s.note && <div className="mt-4"><Note>{s.note}</Note></div>}
              </section>
            ))}
            {c.faq && c.faq.length > 0 && (
              <section id="faq" className="mt-12 scroll-mt-24">
                <h2 className="text-[22px] font-black leading-[1.35] sm:text-[26px]">よくあるご質問</h2>
                <div className="mt-4"><Faq items={c.faq} /></div>
              </section>
            )}
            <div className="mt-12 rounded-sm border border-line bg-card p-6">
              <p className="text-[13px] font-bold text-heading">この記事について</p>
              <p className="mt-2 text-[13.5px] leading-[1.8] text-muted">{site.name}（{site.license.label}）が、警備業法・公表資料・自社の運用に基づいて執筆しています。料金・制度は変わることがあるため、最新の内容はお問い合わせ時にご確認ください。</p>
            </div>
          </article>
          <aside className="grid gap-4 lg:sticky lg:top-24">
            <div className="rounded-sm border border-line bg-card p-5">
              <p className="text-[14px] font-bold text-heading">{cta.title}</p>
              <p className="mt-1 text-[13px] text-muted">{site.hours}</p>
              <div className="mt-4 grid gap-2">
                <Button href={cta.formHref} size="md">{cta.formLabel}</Button>
                <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary" size="md"><Icon name="phone" size={18} /><span className="num">{site.telDisplay}</span></Button>
              </div>
            </div>
            {relatedPages.length > 0 && (
              <div className="rounded-sm border border-line bg-card p-5">
                <p className="text-[13px] font-bold text-heading">関連するサービス</p>
                <ul className="mt-2 grid gap-1.5 text-[14px]">
                  {relatedPages.map((r) => <li key={r}><Link href={r} className="inline-flex items-center gap-1 text-action hover:underline">{labelFor(r)} <Icon name="arrow" size={14} /></Link></li>)}
                </ul>
              </div>
            )}
            <div className="rounded-sm border border-line bg-card p-5">
              <p className="text-[13px] font-bold text-heading">用語集</p>
              <p className="mt-1 text-[13px] text-muted">1号〜4号警備、検定、指導教育責任者など、警備業の言葉をまとめています。</p>
              <Link href="/glossary" className="mt-2 inline-flex items-center gap-1 text-[14px] font-bold text-action">用語集を見る <Icon name="arrow" size={14} /></Link>
            </div>
          </aside>
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="surface" eyebrow="Related" title="関連するコラム">
          <CardGrid cols={3}>
            {others.map((o) => <FeatureCard key={o.slug} icon={o.icon} meta={o.category} title={o.title} body={o.description} href={`/column/${o.slug}`} />)}
          </CardGrid>
        </Section>
      )}

      <ContactBand title={cta.title} lead={c.cta === "protection" ? "身の危険が差し迫っている場合は、まず110番へ。当社は警戒・同行で危害の発生を未然に防ぎます。" : "現場の種類・場所・期間・人数をお知らせください。営業時間内は原則30分以内に一次回答します。"} variant={cta.variant} formHref={cta.formHref} formLabel={cta.formLabel} showLine={cta.showLine} lineHref={c.cta === "recruit" ? site.line.recruit : site.line.business} lineLabel={c.cta === "recruit" ? "LINEで『話を聞きたい』と送る" : "LINEで相談する"} />
    </>
  );
}

const labels: Record<string, string> = {
  "/services/traffic-control": "交通誘導警備", "/services/crowd-control": "イベント・雑踏警備", "/services/road-regulation": "高速道路・一般道路の規制",
  "/protection": "身辺警護（4号）", "/protection/corporate": "法人向け身辺警護", "/protection/creators": "クリエイター・イベントの警護", "/protection/personal": "個人の方の身辺警護",
  "/pricing": "料金の考え方", "/faq": "よくあるご質問", "/recruit/security": "警備スタッフ募集", "/recruit/faq": "採用FAQ", "/recruit": "採用情報", "/cleaning": "OUクリーンサービス", "/company/education": "教育・品質体制", "/company": "会社概要", "/services": "警備サービス一覧", "/works": "実績・対応事例", "/glossary": "用語集",
};
function labelFor(path: string) { return labels[path] ?? path; }
