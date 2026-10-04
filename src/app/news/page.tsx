import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { news } from "@/content/news";
import { site } from "@/content/site";

const path = "/news";
const title = "お知らせ";
const description = `${site.name}からのお知らせ。サービス開始、実績、採用、会社に関する最新情報。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "お知らせ" }];

export default function NewsIndexPage() {
  const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow="News" title="お知らせ" lead="サービスの開始、実績、採用、会社に関する情報を掲載しています。" />
      <Section>
        <ul className="divide-y divide-line border-y border-line">
          {sorted.map((n) => (
            <li key={n.slug}>
              <Link href={`/news/${n.slug}`} className="group grid gap-2 py-5 sm:grid-cols-[120px_90px_1fr] sm:items-start sm:gap-4">
                <time dateTime={n.date} className="num text-[13px] text-muted">{n.date.replace(/-/g, ".")}</time>
                <span className="text-[12px] font-semibold text-accent">{n.category}</span>
                <span>
                  <span className="block text-[16px] font-bold text-ink group-hover:text-action">{n.title}</span>
                  <span className="mt-1 block text-[13.5px] leading-[1.8] text-muted">{n.summary}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-action">続きを読む <Icon name="arrow" size={14} /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <ContactBand
        title="お見積り・ご相談"
        lead="警備・清掃のご相談は24時間受け付けています。営業時間内は原則30分以内に一次回答します。"
      />
    </>
  );
}
