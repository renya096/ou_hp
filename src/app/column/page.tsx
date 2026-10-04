import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { columns, columnCategories } from "@/content/columns";

export const metadata: Metadata = {
  title: "警備コラム｜熊本の警備会社が解説する交通誘導・身辺警護・料金・採用",
  description: "熊本の警備会社OU警備保障が、交通誘導警備の手配と料金、イベント警備、4号警備（身辺警護）とSPの違い、警備員の働き方を、警備業法と現場の実務に基づいて解説します。",
  alternates: { canonical: "/column" },
};

export default function ColumnIndex() {
  const crumbs = [{ href: "/column", label: "コラム" }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow="Column" title="警備コラム" lead="発注する前に知っておきたいこと、働く前に知っておきたいことを、熊本の警備会社が警備業法と現場の実務に基づいて書いています。交通誘導の手配と料金、イベント警備、4号警備（身辺警護）、警備員の働き方まで。" chips={["熊本の警備会社が執筆", "警備業法に基づく", "随時更新"]} />
      {columnCategories.map((cat) => {
        const items = columns.filter((c) => c.category === cat);
        if (!items.length) return null;
        return (
          <Section key={cat} eyebrow={cat} title={cat} tone={columnCategories.indexOf(cat) % 2 ? "surface" : "bg"}>
            <CardGrid cols={3}>
              {items.map((c) => <FeatureCard key={c.slug} icon={c.icon} meta={`${c.publishedAt.replace(/-/g, ".")} · 約${c.readingMinutes}分`} title={c.title} body={c.description} href={`/column/${c.slug}`} />)}
            </CardGrid>
          </Section>
        );
      })}
      <Section tone="surface">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-line bg-card p-6">
          <div><p className="text-[17px] font-bold text-heading">警備業の用語集</p><p className="mt-1 text-[14px] text-muted">1号〜4号警備、交通誘導警備業務検定、指導教育責任者、資格者配置路線など。</p></div>
          <Link href="/glossary" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">用語集を見る <Icon name="arrow" size={16} /></Link>
        </div>
      </Section>
      <ContactBand title="お見積り・ご相談は24時間受け付けています" lead="現場の種類・場所・期間・人数をお知らせください。営業時間内は原則30分以内に一次回答します。" />
    </>
  );
}
