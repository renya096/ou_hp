import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Container } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, Faq, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { getGuardService } from "@/content/services";
import { site } from "@/content/site";

const path = "/faq";
const title = "よくあるご質問（警備・清掃）";
const description = "熊本の警備会社OU警備保障へのよくあるご質問。交通誘導・イベント雑踏・道路規制の依頼方法、料金・契約・安全書類、設立1年の会社への不安、保険、清掃と警備の同時依頼まで、正直にお答えします。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "よくあるご質問" }];

type Qa = { q: string; a: string };
type Category = { id: string; label: string; lead?: string; items: Qa[]; href?: string; hrefLabel?: string };

const traffic = getGuardService("traffic-control");
const crowd = getGuardService("crowd-control");
const road = getGuardService("road-regulation");

const categories: Category[] = [
  {
    id: "traffic",
    label: "交通誘導警備について",
    lead: "工事現場・道路工事・駐車場の誘導員のご依頼について。",
    items: traffic?.faq ?? [],
    href: "/services/traffic-control",
    hrefLabel: "交通誘導警備のページへ",
  },
  {
    id: "crowd",
    label: "イベント・雑踏警備について",
    lead: "祭り・花火大会・マラソン・催事・学校行事のご依頼について。",
    items: crowd?.faq ?? [],
    href: "/services/crowd-control",
    hrefLabel: "イベント・雑踏警備のページへ",
  },
  {
    id: "road",
    label: "道路規制について",
    lead: "高速道路・国道・県道の規制業務と有資格者の配置について。",
    items: road?.faq ?? [],
    href: "/services/road-regulation",
    hrefLabel: "道路規制のページへ",
  },
  {
    id: "pricing",
    label: "料金・契約について",
    lead: "見積から契約、安全書類まで。料金の算定方法は「料金の考え方」で詳しく公開しています。",
    items: [
      { q: "見積は無料ですか？", a: "無料です。現場の種類・場所・期間・人数・時間帯をお知らせいただければ、営業日内24時間以内を目安に見積書をお届けします。見積書に記載のない料金を後から請求することはありません。" },
      { q: "契約の流れを教えてください。", a: "①LINE・電話・フォームでご相談（営業時間内は原則30分以内に一次回答）→②必要に応じて現地確認と配置案の作成→③見積書の提示と、警備業法に基づく契約前書面のご説明→④契約→⑤当日の配置と、終了後の報告、という流れです。初回のご依頼でも、契約から配置まで最短で翌日に対応した実績があります。" },
      { q: "安全書類（グリーンサイト等）に対応できますか？", a: "はい。グリーンサイトをはじめ、元請各社の安全書類の様式に対応します。再下請負通知書、作業員名簿、新規入場者教育の記録、資格証の写しなど、必要な書類をお知らせください。公共工事の積算に準拠した見積書式での提示も可能です。" },
      { q: "警備業法に基づく書面とは何ですか？", a: "警備業法第19条で、警備業者は契約前と契約後に、業務の内容・料金・損害賠償の扱いなどを記載した書面をお客様に交付することが義務づけられています。私たちはこの書面で、料金の内訳、割増、中止・短縮時の規定を具体的にご説明したうえで契約します。" },
    ],
    href: "/pricing",
    hrefLabel: "料金の考え方を見る",
  },
  {
    id: "company",
    label: "会社について",
    lead: "設立から日が浅い会社に依頼する不安について、事実をもとにお答えします。",
    items: [
      { q: "設立1年ですが、本当に大丈夫ですか？", a: `正直にお答えします。私たちは${site.founded}設立、${site.licenseStarted}に業務を開始した会社で、長い実績はありません。そのうえで、判断材料として次の事実をお伝えします。①隊員は${site.stats.guards}名（${site.stats.asOf}）が在籍し、平均年齢は${site.stats.averageAge}歳です。人が集まり、定着しています。②配置・出退勤・報告を自社開発のシステムで管理しており、欠員が出にくく、報告が当日中に届きます。③警備業法に基づく指導教育責任者${site.stats.instructors}名が在籍し、新任・現任教育を自社で実施しています。④「無断で配置を変更しない」「見積後の追加請求をしない」「営業時間内の連絡は原則30分以内に返す」を行動基準として公開しています。まずは1名・1日の小さな現場からお試しいただくこともできます。` },
      { q: "保険には入っていますか？", a: "賠償責任保険に加入しています。警備業務中の事故によりお客様や第三者に損害を与えた場合に備えるものです。補償内容・限度額については、見積時または契約前の書面でご説明しますので、お問い合わせください。" },
      { q: "警備業の認定は受けていますか？", a: `はい。${site.license.label}を受けています。警備業法第2条第1項第2号（交通誘導警備・雑踏警備）と第4号（身辺警備）の業務を行っています。認定証は本社に掲示しており、ご希望があれば写しを提示します。` },
      { q: "警備員の教育はどのように行っていますか？", a: `警備業法に基づく新任教育（20時間以上）と現任教育を自社で実施しています。指導教育責任者${site.stats.instructors}名（年内に＋${site.stats.instructorsPlanned}名）が教育計画・配置計画・現場巡回を担当し、交通誘導警備業務検定2級の保持者は${site.stats.certified2}名（年内に＋${site.stats.certified2Planned}名取得予定）です。` },
    ],
    href: "/company",
    hrefLabel: "会社概要を見る",
  },
  {
    id: "cleaning",
    label: "清掃（OUクリーンサービス）について",
    lead: "店舗・施設・民泊の清掃と、警備との同時発注について。",
    items: [
      { q: "清掃と警備をまとめて頼めますか？", a: "はい。商業施設の駐車場誘導と館内清掃、イベントの雑踏警備と会場の清掃・テント設営など、警備と清掃を一つの窓口でお受けします。見積書も一本化でき、ご担当者の手間を減らせます。清掃のみのご依頼も歓迎します。" },
      { q: "清掃の対応エリアと時間帯を教えてください。", a: `清掃の対応エリアは${site.area.cleaning}です。警備事業で培った深夜・早朝の勤務体制を活かし、閉店後や開店前など営業時間外の作業に対応します。現地確認は無料で、確認後に書面でお見積りします。` },
      { q: "民泊の清掃は1回だけでも頼めますか？", a: "はい。チェックアウトごとの単発清掃からお受けしています。リネン交換・消耗品補充・清掃後の写真報告を含めるかどうかで料金が変わりますので、ご希望をお知らせください。" },
    ],
    href: "/cleaning",
    hrefLabel: "クリーンサービスを見る",
  },
];

const allFaq: Qa[] = categories.flatMap((c) => c.items);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(allFaq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="FAQ"
        title="よくあるご質問（警備・清掃）"
        lead={`交通誘導・イベント雑踏・道路規制のご依頼方法から、料金・契約・保険、設立から日が浅い会社への不安、清掃との同時発注まで、${allFaq.length}問にお答えします。ここにないご質問は、LINE・電話・フォームでお気軽にお尋ねください。`}
        chips={[site.license.label, `隊員${site.stats.guards}名（${site.stats.asOf}）`, "24時間365日受付"]}
      >
        <nav aria-label="質問カテゴリ" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border border-line bg-bg px-3.5 text-[13.5px] font-semibold text-ink hover:border-ink">
              {c.label}<span className="num text-[12px] text-muted">{c.items.length}</span>
            </a>
          ))}
        </nav>
      </PageHero>

      {categories.map((c, i) => (
        <Section key={c.id} id={c.id} tone={i % 2 === 1 ? "surface" : "bg"} eyebrow={`Category ${String(i + 1).padStart(2, "0")}`} title={c.label} lead={c.lead} className="scroll-mt-16">
          <Faq items={c.items} />
          {c.href && (
            <div className="mt-6"><Link href={c.href} className="inline-flex items-center gap-1 text-[14px] font-bold text-action">{c.hrefLabel} <Icon name="arrow" size={16} /></Link></div>
          )}
        </Section>
      ))}

      {/* 身辺警護のFAQへの案内（LINEは出さない） */}
      <section data-theme="protect" className="bg-bg py-12 sm:py-14">
        <Container className="grid gap-6 rounded-sm border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="num mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Protection</p>
            <h2 className="font-serif text-[22px] font-medium leading-[1.4] sm:text-[26px]">身辺警護（4号）に関するご質問は、専用ページでお答えしています。</h2>
            <p className="mt-3 max-w-[60ch] text-[14.5px] leading-[1.8] text-muted">SPとボディガードの違い、警護員にできること・できないこと、匿名でのご相談方法など。個人の方のご相談もお受けしています。</p>
          </div>
          <Button href="/protection" variant="secondary" size="lg" className="shrink-0">身辺警護のページへ <Icon name="arrow" size={18} /></Button>
        </Container>
      </section>

      <ContactBand
        title="ここにないご質問は、直接お尋ねください"
        lead="営業時間内は原則30分以内に一次回答します。「こんなことを聞いていいのか」というご質問こそ歓迎します。"
        formLabel="フォームで質問する"
        note={<>清掃のご相談は<Link href="/cleaning/contact" className="underline underline-offset-4">こちら</Link>。身辺警護は<Link href="/protection/contact" className="underline underline-offset-4">専用フォーム（匿名可）</Link>へ。</>}
      />
    </>
  );
}
