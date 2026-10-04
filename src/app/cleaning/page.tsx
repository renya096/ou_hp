import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Chip } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, Faq } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site, definitions } from "@/content/site";
import { cleaningMenus, cleaningStrengths, cleaningFlow, cleaningFaq, cleaningSegments } from "@/content/cleaning";
import { CleaningPricing, CleaningContactBand } from "./_parts";

const path = "/cleaning";
const title = "OUクリーンサービス｜店舗・民泊・施設の清掃｜熊本市";
const description = "熊本市の飲食店・店舗・オフィス・ショッピングセンターの日常清掃と定期清掃、民泊のチェックアウト清掃、草刈り・テント設営まで。深夜・早朝対応、身元確認済みスタッフ、写真報告。LINEで写真を送るだけで概算見積。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "OUクリーンサービス" }];

export default function CleaningPage() {
  const service = {
    ...serviceJsonLd({
      path,
      name: "OUクリーンサービス（株式会社OU警備保障）",
      serviceType: "清掃業務（店舗・施設・民泊）",
      description: definitions.cleaning,
      audience: "飲食店・店舗・オフィス・商業施設・民泊オーナー・イベント主催者",
      areaServed: [{ "@type": "State", name: "熊本県" }],
    }),
    availableChannel: { "@type": "ServiceChannel", serviceUrl: `${site.url}/cleaning/contact`, servicePhone: { "@type": "ContactPoint", telephone: `+81-${site.tel.slice(1)}` }, availableLanguage: ["ja"] },
  };

  return (
    <div data-theme="clean">
      <JsonLd data={[service, faqJsonLd(cleaningFaq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="OU Clean Service"
        title="OUクリーンサービス"
        lead={definitions.cleaning}
        chips={[site.area.cleaning, "深夜・早朝の作業に対応", "スタッフは身元確認・誓約書・研修済み", "完了報告は写真で", "損害賠償保険加入"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.line.business} size="lg"><Icon name="line" size={20} />LINEで写真を送って概算見積</Button>
          <Button href="/cleaning/contact" variant="secondary" size="lg"><Icon name="doc" size={20} />現地確認を依頼</Button>
        </div>
      </PageHero>

      {/* 対象別の入口 */}
      <Section eyebrow="For you" title="お客様の立場から探す" lead="店舗・民泊・屋外の3つの入口を用意しました。該当しない場合も、下のメニュー一覧からご覧ください。">
        <CardGrid cols={3}>
          {cleaningSegments.map((s) => <FeatureCard key={s.slug} icon={s.icon} title={s.name} body={s.description.split("。")[0] + "。"} href={s.path} />)}
        </CardGrid>
      </Section>

      {/* メニュー */}
      <Section tone="surface" eyebrow="Menu" title="清掃メニュー" lead="日常清掃から屋外作業まで。メニューにないご相談も、写真を送っていただければ対応の可否をお答えします。">
        <div className="grid gap-4">
          {cleaningMenus.map((m, i) => (
            <article key={m.id} id={m.id} className="rounded-sm border border-line bg-bg p-6 sm:p-7">
              <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:gap-8">
                <div>
                  <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 flex items-center gap-2 text-[20px] font-bold"><Icon name={m.icon} size={22} className="text-accent" />{m.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-muted">{m.short}</p>
                </div>
                <div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {m.items.map((it) => (
                      <li key={it.title} className="rounded-sm bg-surface px-4 py-3">
                        <p className="text-[14.5px] font-bold text-heading">{it.title}</p>
                        <p className="mt-1 text-[13.5px] leading-[1.7] text-muted">{it.body}</p>
                      </li>
                    ))}
                  </ul>
                  {m.note && <p className="mt-3 text-[13px] text-muted">※ {m.note}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 強み */}
      <Section eyebrow="Why OU" title="警備会社が清掃をやる、ということ" lead="人の身元を確かめ、夜に人を動かし、記録を残す。警備事業で日常的にやっていることを、そのまま清掃に持ち込んでいます。">
        <CardGrid cols={3}>
          {cleaningStrengths.map((s) => <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />)}
        </CardGrid>
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip><Icon name="users" size={14} className="text-accent" />警備員 <span className="num font-semibold">{site.stats.guards}</span>名・清掃スタッフ 約<span className="num font-semibold">{site.stats.cleaningStaff}</span>名（{site.stats.asOf}）</Chip>
          <Chip><Icon name="clock" size={14} className="text-accent" />24時間稼働の勤務体制</Chip>
        </div>
      </Section>

      {/* 料金 */}
      <Section tone="surface" eyebrow="Pricing" title="料金の考え方" lead="目安の金額は掲載していません。面積・頻度・時間帯で算定し、追加料金が発生しうる条件は事前にお伝えします。">
        <CleaningPricing />
      </Section>

      {/* 流れ */}
      <Section eyebrow="Flow" title="ご依頼の流れ" lead="LINEで写真を送っていただくのが最短です。現地確認・お見積りは無料です。">
        <Steps items={cleaningFlow} />
      </Section>

      {/* 警備との同時発注 */}
      <Section tone="surface" eyebrow="With security" title="警備と清掃を、ひとつの窓口で">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <p className="max-w-[60ch] text-[15px] leading-[1.9] text-ink">商業施設の繁忙期の駐車場誘導と館内清掃、イベントの雑踏警備と設営・撤去・清掃。これまで別々の会社に発注していた仕事を、ひとつの窓口・ひとつの請求にまとめられます。日程の調整と当日の報告も一本になります。</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/services/crowd-control" variant="secondary">イベント・雑踏警備 <Icon name="arrow" size={16} /></Button>
            <Button href="/services/traffic-control" variant="secondary">駐車場・交通誘導 <Icon name="arrow" size={16} /></Button>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="よくあるご質問">
        <Faq items={cleaningFaq} />
        <div className="mt-6"><Link href="/cleaning/contact" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">現地確認を依頼する <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <CleaningContactBand title="清掃のご相談・現地確認" lead="現場の写真と、場所・広さ・希望の頻度と時間帯をお知らせください。営業時間内は原則30分以内に一次回答します。" />
    </div>
  );
}
