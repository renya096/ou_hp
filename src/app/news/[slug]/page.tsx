import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Button } from "@/components/ui/primitives";
import { Breadcrumbs, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, newsArticleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { news } from "@/content/news";

const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = news.find((x) => x.slug === slug);
  if (!n) return {};
  const path = `/news/${n.slug}`;
  return {
    title: n.title,
    description: n.summary,
    alternates: { canonical: path },
    openGraph: { title: n.title, description: n.summary, url: path, type: "article", publishedTime: n.date },
  };
}

/** カテゴリごとの「次に見るページ」 */
const related: Record<string, { href: string; label: string }> = {
  サービス: { href: "/services", label: "警備サービス一覧" },
  実績: { href: "/works", label: "実績・対応事例" },
  採用: { href: "/recruit", label: "採用情報" },
  お知らせ: { href: "/company", label: "会社概要" },
};

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = news.find((x) => x.slug === slug);
  if (!n) notFound();
  const path = `/news/${n.slug}`;
  const idx = sorted.findIndex((x) => x.slug === n.slug);
  const newer = idx > 0 ? sorted[idx - 1] : undefined;
  const older = idx < sorted.length - 1 ? sorted[idx + 1] : undefined;
  const crumbs = [{ href: "/news", label: "お知らせ" }, { href: path, label: n.title }];
  const rel = related[n.category];

  return (
    <>
      <JsonLd data={[newsArticleJsonLd({ path, headline: n.title, datePublished: n.date, description: n.summary }), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <article>
        <header className="border-b border-line bg-surface py-14 sm:py-20">
          <Container>
            <div className="max-w-[76ch]">
              <div className="flex flex-wrap items-center gap-3 text-[13px]">
                <time dateTime={n.date} className="num text-muted">{n.date.replace(/-/g, ".")}</time>
                <span className="rounded-sm border border-line bg-bg px-2 py-0.5 text-[12px] font-semibold text-accent">{n.category}</span>
              </div>
              <h1 className="mt-4 text-[28px] font-bold leading-[1.35] sm:text-[36px]">{n.title}</h1>
            </div>
          </Container>
        </header>
        <Section>
          <div className="mx-auto grid max-w-[68ch] gap-6 text-[15.5px] leading-[2] text-ink">
            {n.body.map((p, i) => <p key={i}>{p}</p>)}
            {rel && (
              <div className="mt-4 rounded-sm border border-line bg-surface p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <p className="text-[14.5px] font-bold text-heading">関連ページ：{rel.label}</p>
                <Button href={rel.href} variant="secondary" className="mt-3 shrink-0 sm:mt-0">{rel.label} <Icon name="arrow" size={16} /></Button>
              </div>
            )}
          </div>
        </Section>
      </article>

      <Section tone="surface">
        <nav aria-label="前後のお知らせ" className="grid gap-3 sm:grid-cols-2">
          {newer ? (
            <Link href={`/news/${newer.slug}`} className="flex flex-col rounded-sm border border-line bg-bg p-5 transition-colors hover:border-ink">
              <span className="text-[12px] font-semibold text-muted">新しいお知らせ</span>
              <span className="num mt-1 text-[12.5px] text-muted">{newer.date.replace(/-/g, ".")}</span>
              <span className="mt-1 text-[15px] font-bold text-ink">{newer.title}</span>
            </Link>
          ) : <span className="hidden sm:block" aria-hidden="true" />}
          {older && (
            <Link href={`/news/${older.slug}`} className="flex flex-col rounded-sm border border-line bg-bg p-5 text-left transition-colors hover:border-ink sm:text-right">
              <span className="text-[12px] font-semibold text-muted">前のお知らせ</span>
              <span className="num mt-1 text-[12.5px] text-muted">{older.date.replace(/-/g, ".")}</span>
              <span className="mt-1 text-[15px] font-bold text-ink">{older.title}</span>
            </Link>
          )}
        </nav>
        <div className="mt-6"><Link href="/news" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">お知らせ一覧へ <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <ContactBand
        title="お見積り・ご相談"
        lead="警備・清掃のご相談は24時間受け付けています。営業時間内は原則30分以内に一次回答します。"
      />
    </>
  );
}
