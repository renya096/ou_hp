import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note, DefList } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Steps, Faq } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { recruitFacts, cleaningRequirements } from "@/content/recruit";
import { RecruitContactBand, CasualInterview } from "../_parts";

const path = "/recruit/cleaning";
const title = "清掃スタッフ募集｜短時間・週3日〜・日払い｜熊本市";
const description = "熊本市の清掃スタッフ募集。店舗・民泊・施設の清掃を1日2〜3時間の短時間から、週3日〜。Wワーク・主婦主夫・学生歓迎。LINEで出退勤、日払い申請あり、同行研修・OJTで未経験から。時給は面談時に提示（熊本県最低賃金以上）。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/recruit", label: "採用情報" }, { href: path, label: "清掃スタッフ" }];

const fits = [
  { icon: "clock" as const, title: "短時間で働きたい", body: "1日2〜3時間、閉店後や開店前の決まった時間だけ。本業や家事のすき間に。" },
  { icon: "calendar" as const, title: "週3日〜で調整したい", body: "曜日と日数を相談して決めます。繁忙期だけ増やす、試験期間は減らす、も相談できます。" },
  { icon: "wallet" as const, title: "Wワークで収入を足したい", body: "警備スタッフと同じく、LINEから日払い申請ができます。働いた分をすぐに。" },
  { icon: "home" as const, title: "主婦・主夫、学生の方", body: "日中の民泊清掃、夕方の店舗清掃など、生活のリズムに合う時間帯を選べます。" },
  { icon: "users" as const, title: "一人で黙々とやりたい", body: "決まった手順で、決まった場所をきれいにする仕事。写真報告で「終わった」が形に残ります。" },
  { icon: "baton" as const, title: "警備もやってみたい", body: "18歳以上で希望があれば、新任教育を受けて警備スタッフも兼務できます。職種転換も可。" },
];

const tasks = [
  { title: "店舗・飲食店の日常清掃", body: "閉店後のフロア・トイレ・ゴミ出し。決まった手順書に沿って作業します。" },
  { title: "民泊のチェックアウト清掃", body: "客室・水回りの清掃、リネン交換、消耗品補充、完了写真の報告。" },
  { title: "商業施設・オフィスの清掃", body: "共用部やトイレの巡回清掃。入退室のルールに従います。" },
  { title: "草刈り・テント設営（屋外）", body: "希望者のみ。人数をまとめて動く日帰りの作業です。" },
];

const flow = [
  { title: "同行研修", body: "先輩スタッフの現場に同行し、道具の使い方・手順・写真報告のやり方を見て覚えます。", note: "1〜3回" },
  { title: "OJT", body: "先輩と一緒に実際に作業。仕上がりのチェックポイントを現場で確認します。" },
  { title: "一人で担当", body: "手順書と写真報告をもとに、担当現場を一人で回します。困ったら管制にLINE。" },
];

const faq = [
  { q: "時給はいくらですか？", a: `面談時に提示します（熊本県最低賃金${recruitFacts.minimumWageKumamoto}以上）。現場・時間帯（深夜は法定の割増）で異なるため、ページでは金額を書いていません。` },
  { q: "清掃の経験がありません。", a: "問題ありません。先輩との同行研修とOJTで、道具の使い方と手順を現場で覚えます。手順書と写真報告があるので、「どこまでやればいいか」で迷いません。" },
  { q: "日払いはありますか？", a: "はい。警備スタッフと同じく、LINEから申請すれば当日中に振込（振込手数料は本人負担）。" },
  { q: "シフトはどうやって出しますか？", a: "LINEから1か月分のシフトを提出します。提出後も4日前までならLINEで変更できます。それより直前は会社に電話で連絡してください。" },
  { q: "出退勤はどうやって報告しますか？", a: "LINEで打刻します。現場に直行直帰で、会社に寄る必要はありません。" },
  { q: "鍵を預かるのが不安です。", a: "鍵の受け渡し方法は現場ごとに決まっており、手順書に書いてあります。採用時に身元確認と誓約書の取り交わしを行うのは、お客様とスタッフ双方を守るためです。" },
  { q: "警備の仕事もやってみたい。", a: "大歓迎です。18歳以上で希望があれば、警備業法に基づく新任教育（20時間・給与あり）を受けて警備スタッフも兼務できます。" },
];

export default function RecruitCleaningPage() {
  return (
    <div data-theme="recruit">
      <JsonLd data={[faqJsonLd(faq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Recruit — 清掃スタッフ"
        title="清掃スタッフ（OUクリーンサービス）"
        lead={<>店舗・民泊・施設の清掃を、1日2〜3時間の短時間から。週3日〜、Wワーク、主婦・主夫、学生の方。出退勤はLINE、日払い申請もあります。未経験の方は先輩との同行研修・OJTから始めます。清掃スタッフ約{site.stats.cleaningStaff}名（{site.stats.asOf}）。</>}
        chips={["短時間OK（1日2〜3時間〜）", "週3日〜相談可", "Wワーク可", "LINEで出退勤", "日払い申請あり", "同行研修・OJT"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.line.recruit} size="lg"><Icon name="line" size={20} />LINEで「話を聞きたい」と送る</Button>
          <Button href="/recruit/entry" variant="secondary" size="lg"><Icon name="doc" size={20} />応募フォーム</Button>
        </div>
      </PageHero>

      <Section eyebrow="Fit" title="こんな方に向いています">
        <CardGrid cols={3}>
          {fits.map((f) => <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Job" title="仕事内容">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {tasks.map((t, i) => (
            <div key={t.title} className="bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-[16px] font-bold">{t.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.8] text-muted">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6"><Link href="/cleaning" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">OUクリーンサービスの仕事を見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section eyebrow="Training" title="同行研修・OJT" lead="いきなり一人で現場に出すことはしません。先輩の現場に同行するところから始めます。">
        <Steps items={flow} />
      </Section>

      <Section tone="surface" eyebrow="Pay" title="給与について">
        <Note title="時給は面談時に提示します">
          現場・時間帯によって異なるため、このページでは金額を書いていません。熊本県の最低賃金（{recruitFacts.minimumWageKumamoto}）以上で、深夜帯（22時〜5時）は法定の割増がつきます。LINEからの日払い申請（当日中に振込・振込手数料は本人負担）は警備スタッフと同じ仕組みです。
        </Note>
      </Section>

      <Section eyebrow="FAQ" title="よくあるご質問（清掃スタッフ）">
        <Faq items={faq} />
        <div className="mt-6"><Link href="/recruit/faq" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">採用FAQをすべて見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section tone="surface" eyebrow="Requirements" title="募集要項">
        <DefList items={cleaningRequirements} />
      </Section>

      <Section eyebrow="Casual interview" title="カジュアル面談">
        <CasualInterview />
      </Section>

      <RecruitContactBand
        title="清掃スタッフに応募する"
        lead="希望の曜日・時間帯を教えてください。2営業日以内にLINEまたは電話でご連絡します。"
      />
    </div>
  );
}
