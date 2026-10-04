import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Container, Eyebrow } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, ContactBand } from "@/components/ui/blocks";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { guardServices, guardFlow } from "@/content/services";
import { site, definitions } from "@/content/site";

const path = "/services";
const title = "熊本の警備サービス一覧｜交通誘導・雑踏・道路規制・身辺警護";
const description = "熊本県全域の交通誘導警備・イベント雑踏警備・高速道路や一般道路の規制業務。工事業者・イベント主催者・施設管理者・学校や地域団体の方へ、1名1日から24時間365日対応します。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "警備サービス" }];

/** 対象者別の入口：誰が・何に困って・どのサービスへ */
const entrances: Array<{ icon: IconName; who: string; need: string; href: string; service: string }> = [
  { icon: "baton", who: "工事業者の方", need: "建築・土木・舗装・電気・ガス・水道の現場で、車両と歩行者の誘導員が必要。1名・1日の単発から長期継続まで。", href: "/services/traffic-control", service: "交通誘導警備へ" },
  { icon: "crowd", who: "イベント主催者の方", need: "祭り・花火・マラソン・催事で来場者の動線を整えたい。警備計画書や警察協議から相談したい。", href: "/services/crowd-control", service: "イベント・雑踏警備へ" },
  { icon: "car", who: "施設管理者の方", need: "商業施設・住宅展示場・物流拠点の駐車場誘導、繁忙期やセール時のスポット配置。清掃との同時発注も。", href: "/services/traffic-control", service: "交通誘導警備へ" },
  { icon: "users", who: "学校・地域団体の方", need: "運動会・学園祭・地域行事の来場者誘導と駐車場整理。2〜3名の少人数からお受けします。", href: "/services/crowd-control", service: "イベント・雑踏警備へ" },
];

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="警備サービス（2号）"
        title="警備サービス一覧"
        lead={definitions.guard}
        chips={[site.license.label, "熊本県全域（県外もご相談を）", "24時間365日", `検定2級保持者 ${site.stats.certified2}名在籍`, `隊員${site.stats.guards}名（${site.stats.asOf}）`]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg"><Icon name="doc" size={20} />見積を依頼する</Button>
          <Button href={site.line.business} variant="secondary" size="lg"><Icon name="line" size={20} />LINEで相談する</Button>
        </div>
      </PageHero>

      {/* 3サービス */}
      <Section eyebrow="Services" title="3つの警備サービス" lead="いずれも警備業法第2条第1項第2号に定める業務です。現場の種類が決まっていない場合も、まずはご相談ください。該当するサービスをこちらでご案内します。">
        <CardGrid cols={3}>
          {guardServices.map((s) => <FeatureCard key={s.slug} icon={s.icon} title={s.name} body={s.short} href={s.path} />)}
        </CardGrid>
      </Section>

      {/* 対象者別の入口 */}
      <Section tone="surface" eyebrow="For you" title="お客様の立場から探す" lead="「どのサービスに当たるのか分からない」という方のために、よくあるご依頼者の立場から入口を用意しました。">
        <ul className="grid gap-4 sm:grid-cols-2">
          {entrances.map((e) => (
            <li key={e.who}>
              <Link href={e.href} className="flex h-full flex-col rounded-sm border border-line bg-bg p-6 transition-colors hover:border-ink">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={e.icon} size={24} /></span>
                  <h3 className="text-[17px] font-bold leading-snug">{e.who}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-[1.8] text-muted">{e.need}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold text-action">{e.service} <Icon name="arrow" size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 身辺警護（4号）への控えめな案内 */}
      <section data-theme="protect" className="bg-bg py-12 sm:py-14">
        <Container className="grid gap-6 rounded-sm border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Eyebrow className="mb-2">Protection — {site.protectionStart}開始</Eyebrow>
            <h2 className="font-serif text-[22px] font-medium leading-[1.4] sm:text-[26px]">人を守る警備（身辺警護・4号）は、別のページでご案内しています。</h2>
            <p className="mt-3 max-w-[60ch] text-[14.5px] leading-[1.8] text-muted">企業の危機対応、出演者の随行、つきまといや脅迫でお困りの個人の方。会場の雑踏警備（2号）と一体でのご依頼もお受けできます。</p>
          </div>
          <Button href="/protection" variant="secondary" size="lg" className="shrink-0">身辺警護について <Icon name="arrow" size={18} /></Button>
        </Container>
      </section>

      {/* ご依頼の流れ */}
      <Section eyebrow="Flow" title="ご依頼から配置までの流れ" lead="お見積りは無料です。契約前には警備業法に基づく書面でご説明します。">
        <Steps items={guardFlow} />
        <div className="mt-10 flex flex-wrap gap-4 text-[14px] font-bold text-action">
          <Link href="/pricing" className="inline-flex items-center gap-1">料金の考え方 <Icon name="arrow" size={16} /></Link>
          <Link href="/works" className="inline-flex items-center gap-1">実績・対応事例 <Icon name="arrow" size={16} /></Link>
          <Link href="/faq" className="inline-flex items-center gap-1">よくあるご質問 <Icon name="arrow" size={16} /></Link>
        </div>
      </Section>

      <ContactBand
        title="警備のお見積り・ご相談"
        lead="現場の種類・場所・期間・人数をお知らせください。営業時間内は原則30分以内に一次回答し、現場条件を確認したうえで書面でお見積りを提示します。"
        formLabel="現場の条件を送って見積をもらう"
      />
    </>
  );
}
