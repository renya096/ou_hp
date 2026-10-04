import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, Faq, FeatureCard, CardGrid } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { recruitFaq, jobs } from "@/content/recruit";
import { RecruitContactBand, CasualInterview } from "../_parts";

const path = "/recruit/faq";
const title = "採用に関するよくあるご質問";
const description = "OU警備保障の採用FAQ。応募から働き始めるまでの流れ、カジュアル面談、未経験、応募条件（18歳以上・欠格事由）、日払い、社会保険、寮、資格取得支援、警備と清掃の兼務、警護員への道など12問。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/recruit", label: "採用情報" }, { href: path, label: "採用FAQ" }];

export default function RecruitFaqPage() {
  return (
    <div data-theme="recruit">
      <JsonLd data={[faqJsonLd(recruitFaq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Recruit — FAQ"
        title="採用に関するよくあるご質問"
        lead="応募前に聞かれることをまとめました。ここにない質問は、LINEで「話を聞きたい」と送っていただければ、カジュアル面談でお答えします。"
      />

      <Section>
        <Faq items={recruitFaq} />
      </Section>

      <Section tone="surface" eyebrow="Jobs" title="職種ごとの詳しい情報">
        <CardGrid cols={3}>
          {jobs.map((j) => <FeatureCard key={j.href} icon={j.icon} title={j.title} body={j.body} href={j.href} />)}
        </CardGrid>
        <div className="mt-6"><Link href="/recruit" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">採用トップへ <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section eyebrow="Casual interview" title="カジュアル面談">
        <CasualInterview />
      </Section>

      <RecruitContactBand
        title="聞きたいことは、直接どうぞ。"
        lead="LINEで質問だけ送っていただいても構いません。2営業日以内にお返事します。"
      />
    </div>
  );
}
