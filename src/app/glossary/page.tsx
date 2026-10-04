import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd, definedTermSetJsonLd } from "@/lib/jsonld";
import { glossary } from "@/content/glossary";

export const metadata: Metadata = {
  title: "警備業の用語集｜1号〜4号警備・検定・指導教育責任者・資格者配置路線",
  description: "警備業法に基づく1号〜4号警備の区分、交通誘導警備業務検定、指導教育責任者、資格者配置路線、雑踏警備、身辺警護とSPの違いなど、警備を発注・検討するときに出てくる用語を熊本の警備会社が解説します。",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const crumbs = [{ href: "/glossary", label: "用語集" }];
  const sorted = [...glossary].sort((a, b) => a.reading.localeCompare(b.reading, "ja"));
  return (
    <>
      <JsonLd data={[definedTermSetJsonLd(sorted), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow="Glossary" title="警備業の用語集" lead="警備を発注するとき、働くときに出てくる言葉を、警備業法の区分に沿って短く定義しています。各用語は関連するサービス・コラムにつながっています。" chips={[`${glossary.length}語`, "警備業法に基づく定義", "熊本の警備会社が解説"]} />
      <Section>
        <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {sorted.map((t) => (
            <div key={t.slug} id={t.slug} className="scroll-mt-24 bg-card p-6">
              <dt className="flex flex-wrap items-baseline gap-x-3"><span className="text-[18px] font-black text-heading">{t.term}</span><span className="text-[12.5px] text-muted">{t.reading}</span></dt>
              <dd className="mt-2 text-[14.5px] leading-[1.9] text-ink">{t.definition}</dd>
              {t.related && t.related.length > 0 && (
                <dd className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                  {t.related.map((r) => <Link key={r} href={r} className="inline-flex items-center gap-1 font-semibold text-action hover:underline">{r.startsWith("/column/") ? "関連コラム" : "関連サービス"} <Icon name="arrow" size={13} /></Link>)}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </Section>
      <ContactBand title="用語について分からないことも、お気軽に" lead="資格者配置路線に当たるかどうか、何号警備が必要かなど、現場の条件から一緒に判断します。" />
    </>
  );
}
