import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, StatTiles, FeatureCard, CardGrid, Faq } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { recruitFacts, workStyle, jobs, recruitTopFaq } from "@/content/recruit";
import { RecruitContactBand, HonestList, CasualInterview } from "./_parts";

const path = "/recruit";
const title = "熊本の警備員・清掃スタッフ募集｜日払い・直行直帰・LINE出退勤";
const description = `熊本の警備スタッフ・清掃スタッフ・警護員の採用情報。日給10,000〜13,500円、LINEから日払い申請で当日振込、直行直帰、社会保険あり、寮あり、資格取得費用援助。隊員${site.stats.guards}名・平均年齢${site.stats.averageAge}歳。履歴書不要のカジュアル面談から。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "採用情報" }];

export default function RecruitPage() {
  return (
    <div data-theme="recruit">
      <JsonLd data={[faqJsonLd(recruitTopFaq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Recruit"
        title="採用情報"
        lead={<>{recruitFacts.stance}<br />{recruitFacts.stanceBody}家から現場へ直行し、LINEで出退勤、働いた日に日払い申請。会社に寄らなくても仕事が回る仕組みを、{site.stats.guards}名の隊員と一緒につくっています。</>}
        chips={[recruitFacts.dailyWageLabel, "日払い申請・当日振込", "直行直帰", "LINEで出退勤", "社会保険あり", "寮あり（遠方の方）", `平均年齢${site.stats.averageAge}歳（${site.stats.asOf}）`]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.line.recruit} size="lg"><Icon name="line" size={20} />LINEで「話を聞きたい」と送る</Button>
          <Button href="/recruit/entry" variant="secondary" size="lg"><Icon name="doc" size={20} />応募フォーム</Button>
        </div>
      </PageHero>

      {/* 働き方の数字 */}
      <Section eyebrow="Numbers" title="働き方を、数字で">
        <div className="mb-6 grid gap-4 rounded-sm border border-line bg-surface p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <div>
            <p className="text-[12.5px] font-semibold text-muted">日給（警備・交通誘導）</p>
            <p className="num mt-1 text-[34px] font-semibold leading-none text-heading sm:text-[44px]">{recruitFacts.dailyWageMin.toLocaleString()}<span className="mx-1 text-[20px] text-muted">〜</span>{recruitFacts.dailyWageMax.toLocaleString()}<span className="ml-1 text-[16px] font-medium text-muted">円</span></p>
          </div>
          <p className="max-w-[56ch] text-[13.5px] leading-[1.8] text-muted">{recruitFacts.dailyWageNote}。詳しい条件はカジュアル面談でお伝えします。清掃スタッフは時給制（熊本県最低賃金{recruitFacts.minimumWageKumamoto}以上）、警護員は経験・資格をふまえて個別に提示します。</p>
        </div>
        <StatTiles items={[
          { value: 0, suffix: "日待ち", label: "日払い：当日中に振込", note: "LINEで申請・振込手数料は本人負担" },
          { value: site.stats.guards, suffix: "名", label: "在籍隊員" },
          { value: site.stats.averageAge, decimals: 1, suffix: "歳", label: "平均年齢" },
          { value: recruitFacts.trainingHours, suffix: "時間", label: "新任教育（給与あり）", note: "入社直後・社内で実施" },
        ]} />
      </Section>

      {/* 3秒でわかる働き方 */}
      <Section tone="surface" eyebrow="Work style" title="3秒でわかる、OUの働き方">
        <CardGrid cols={3}>
          {workStyle.map((w) => <FeatureCard key={w.title} icon={w.icon} title={w.title} body={w.body} />)}
        </CardGrid>
      </Section>

      {/* 3職種 */}
      <Section eyebrow="Jobs" title="募集している3つの仕事" lead="警備も清掃もやってみたい、という方は大歓迎です。職種の転換もできます。どれにするか決まっていなければ「まず話を聞きたい」でご連絡ください。">
        <CardGrid cols={3}>
          {jobs.map((j) => (
            <Link key={j.href} href={j.href} className="flex h-full flex-col rounded-sm border border-line bg-bg p-6 transition-colors hover:border-ink">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={j.icon} size={24} /></span>
              <h3 className="text-[17px] font-bold leading-snug">{j.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{j.body}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {j.tags.map((t) => <li key={t} className="num rounded-sm bg-surface px-2 py-0.5 text-[12px] font-semibold text-ink">{t}</li>)}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold text-action">詳しく見る <Icon name="arrow" size={16} /></span>
            </Link>
          ))}
        </CardGrid>
      </Section>

      {/* 正直に伝えること */}
      <Section id="honest" tone="surface" eyebrow="Honest" title="正直に伝えること" lead="良いことだけ書いて入ってもらっても、続きません。先に大変なところと、会社がそれに対してやっていることを書きます。">
        <HonestList />
      </Section>

      {/* カジュアル面談 */}
      <Section eyebrow="Casual interview" title="カジュアル面談">
        <CasualInterview />
      </Section>

      {/* 応募資格 */}
      <Section tone="surface" eyebrow="Requirements" title="応募できる方">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Note title="警備スタッフ・警護員">
            18歳以上の方（警備業法第14条）で、警備業法に定める欠格事由に該当しない方。学歴・経験・性別は問いません。
          </Note>
          <Note title="清掃スタッフ">
            経験・学歴・性別は問いません。主婦・主夫、学生、Wワークの方も歓迎します。深夜帯（22時〜5時）の勤務は18歳以上です。
          </Note>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="よくあるご質問">
        <Faq items={recruitTopFaq} />
        <div className="mt-6"><Link href="/recruit/faq" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">採用FAQをすべて見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <RecruitContactBand
        title="まず、話を聞くところから。"
        lead="LINEで「話を聞きたい」と送っていただくだけで構いません。2営業日以内に、カジュアル面談の日程をご連絡します。"
      />
    </div>
  );
}
