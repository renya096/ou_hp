import type { Metadata } from "next";
import Link from "next/link";
import { Section, DefList, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { Hyoshiki } from "@/components/site/Hyoshiki";

const path = "/legal";
const title = "警備業に関する表示（標識）";
const description = `${site.name}の警備業法に基づく表示。${site.license.label}、業務区分（2号・4号）、認定年月日・有効期間、契約前の書面交付について。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "警備業に関する表示" }];


export default function LegalPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Legal"
        title="警備業に関する表示"
        lead="警備業法第6条に基づき、認定を受けた警備業者としての標識をインターネット上に掲示します。あわせて業務区分・指導教育責任者・契約前の書面交付についてご案内します。"
      />

      <Section eyebrow="Sign — 警備業法第6条・別記様式第2号" title="標識">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,640px)_1fr] lg:items-start">
          <Hyoshiki />
          <DefList items={[
            { term: "警備業務の区分", desc: <ul className="grid gap-1">{site.license.categories.map((c) => <li key={c}>{c}</li>)}</ul> },
            { term: "認定年月日", desc: <span className="num">{site.license.certifiedOn}</span> },
            { term: "代表者", desc: site.representative },
            { term: "指導教育責任者", desc: <span className="num">2号業務 {site.stats.instructors}名（年内＋{site.stats.instructorsPlanned}名）／4号業務 選任済み</span> },
            { term: "加入団体", desc: <ul className="grid gap-1">{site.memberships.map((m) => <li key={m.name}>{m.name}</li>)}</ul> },
          ]} />
        </div>
      </Section>

      <Section tone="surface" eyebrow="Before contract" title="契約前の書面によるご説明（警備業法第19条）">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="max-w-[68ch] text-[15px] leading-[1.9] text-ink">
            <p>警備業法第19条に基づき、警備業務のご契約にあたっては、契約を締結する前に、以下の事項を記載した書面をお渡しし、ご説明します。また契約締結後、遅滞なく契約内容を記載した書面をお渡しします。</p>
            <ul className="mt-4 grid gap-2 text-[14.5px]">
              {["警備業務を行う日および時間帯", "警備業務を行う場所", "警備業務の内容（区分・方法・配置人数・資格者の有無）", "警備業務に従事する警備員の服装・使用する護身用具", "警備業務の対価（料金）、支払時期・方法、追加料金が発生する条件", "契約の解除・中止に関する事項", "損害賠償の範囲・損害賠償額に関する事項", "警備業務の再委託に関する事項", "連絡先・苦情の受付窓口"].map((t) => (
                <li key={t} className="flex items-start gap-2"><Icon name="check" size={16} className="mt-1.5 shrink-0 text-accent" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            <Note title="身辺警護（4号）について">
              身辺警護のご契約でも同様に契約前の書面をお渡しします。警護員が使用する護身用具は、公安委員会に届け出たもののみです。調査（尾行・身元特定など）は行いません。
            </Note>
            <Note title="苦情の受付">
              警備業務に関するご意見・苦情は、電話 <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num font-semibold">{site.tel}</a> または <a href={`mailto:${site.email.security}`} className="num underline underline-offset-4">{site.email.security}</a> で受け付けています。内容を確認のうえ、速やかに回答します。
            </Note>
          </div>
        </div>
      </Section>

      <Section eyebrow="Related" title="関連ページ">
        <div className="flex flex-wrap gap-4 text-[14px] font-bold text-action">
          <Link href="/company" className="inline-flex items-center gap-1">会社概要 <Icon name="arrow" size={16} /></Link>
          <Link href="/company/education" className="inline-flex items-center gap-1">教育・品質体制 <Icon name="arrow" size={16} /></Link>
          <Link href="/pricing" className="inline-flex items-center gap-1">料金の考え方 <Icon name="arrow" size={16} /></Link>
          <Link href="/privacy" className="inline-flex items-center gap-1">プライバシーポリシー <Icon name="arrow" size={16} /></Link>
        </div>
      </Section>

      <ContactBand
        title="契約前の書面について、お気軽にご質問ください"
        lead="見積書とあわせて、契約前書面の案をお送りすることもできます。"
      />
    </>
  );
}
