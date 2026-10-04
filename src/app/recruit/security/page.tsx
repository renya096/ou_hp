import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note, DefList } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, StatTiles, FeatureCard, CardGrid, Steps, Faq } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { recruitFacts, workStyle, dayFlow, careerSteps, securityFaq, securityRequirements } from "@/content/recruit";
import { RecruitContactBand, PhoneMock, CasualInterview } from "../_parts";

const path = "/recruit/security";
const title = "熊本の警備員求人（交通誘導・雑踏）｜日給10,000円〜・日払い・直行直帰";
const description = `熊本の交通誘導・雑踏警備スタッフ募集。日給10,000〜13,500円（実働8時間目安）、LINEで日払い申請→当日振込、直行直帰、LINEで出退勤、社会保険あり、寮あり、資格取得費用援助、新任教育20時間も給与あり。未経験から。18歳以上。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/recruit", label: "採用情報" }, { href: path, label: "警備スタッフ" }];

const siteTypes = [
  { title: "建築・土木の現場", body: "出入口での車両誘導と歩行者の通行確保。長期の現場が多く、同じ場所に通えるので慣れやすい。", icon: "baton" as const },
  { title: "道路工事（一般道）", body: "片側交互通行の誘導。無線で相方と息を合わせる。日によって場所が変わる。", icon: "cone" as const },
  { title: "高速道路・国道の規制", body: "規制資材の設置・撤去と規制内の安全管理。夜勤が中心。検定2級があると入れる現場が増える。", icon: "road" as const },
  { title: "イベント・雑踏", body: "祭り・花火・マラソン・催事で来場者を誘導。週末が中心で、人と接する場面が多い。", icon: "crowd" as const },
  { title: "商業施設の駐車場", body: "満車時の案内と歩行者優先の誘導。接客に近い仕事。", icon: "car" as const },
];

export default function RecruitSecurityPage() {
  const requirementsText = securityRequirements.map((r) => `${r.term}：${r.desc}`).join("\n");
  return (
    <div data-theme="recruit">
      <JsonLd data={[
        jobPostingJsonLd({
          path,
          title: "警備スタッフ（交通誘導・雑踏警備）",
          description: `熊本県内の工事現場・道路・イベント会場での交通誘導・雑踏警備。直行直帰、LINEで出退勤、日払い申請（当日振込・振込手数料本人負担）、社会保険あり、寮あり（遠方の方）、資格取得費用援助、新任教育20時間も給与あり。未経験可。\n\n${requirementsText}`,
          datePosted: "2026-10-02",
          validThrough: "2027-03-31",
          employmentType: ["FULL_TIME", "PART_TIME"],
          salaryMin: recruitFacts.dailyWageMin,
          salaryMax: recruitFacts.dailyWageMax,
          unit: "DAY",
          benefits: "社会保険完備、日払い制度、直行直帰、寮あり、資格取得費用援助、研修中給与あり、空調服・雨具・制服支給",
          qualifications: "18歳以上（警備業法第14条）。警備業法に定める欠格事由に該当しない方。学歴・経験・性別不問。",
          responsibilities: "工事現場・道路・イベント会場・商業施設での交通誘導警備および雑踏警備（警備業法第2条第1項第2号）",
          identifier: "guard-2026-10",
        }),
        faqJsonLd(securityFaq),
        breadcrumbJsonLd(crumbs),
      ]} />
      <Breadcrumbs items={crumbs} />

      {/* FV */}
      <PageHero
        eyebrow="Recruit — 警備スタッフ"
        title={<><span className="inline-block">警備スタッフ</span><span className="inline-block">（交通誘導・</span><span className="inline-block">雑踏警備）</span></>}
        lead={<>家から現場へ。現場から家へ。会社に寄る必要はありません。出退勤はLINE、日払いもLINEから申請して当日中に振込。隊員{site.stats.guards}名の平均年齢は{site.stats.averageAge}歳（{site.stats.asOf}）、警備の経験がない人のほうが多い会社です。</>}
        chips={[recruitFacts.dailyWageLabel, "日払い申請・当日振込", "直行直帰", "社会保険あり", "寮あり（遠方の方）", "研修中も給与あり", "18歳以上"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.line.recruit} size="lg"><Icon name="line" size={20} />LINEで「話を聞きたい」と送る</Button>
          <Button href="/recruit/entry" variant="secondary" size="lg"><Icon name="doc" size={20} />応募フォーム</Button>
        </div>
      </PageHero>

      {/* 3秒でわかる働き方 */}
      <Section eyebrow="Work style" title="3秒でわかる働き方">
        <CardGrid cols={3}>
          {workStyle.map((w) => <FeatureCard key={w.title} icon={w.icon} title={w.title} body={w.body} />)}
        </CardGrid>
      </Section>

      {/* 仕事内容 */}
      <Section tone="surface" eyebrow="Job" title="仕事内容（現場のタイプ別）" lead="いずれも、車と人の動きを見て、大きく・はっきり・ゆっくり合図を出す仕事です。どの現場に入るかは、希望と慣れ具合を見て決めます。">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {siteTypes.map((t) => (
            <div key={t.title} className="bg-bg p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent-soft text-accent"><Icon name={t.icon} size={22} /></span>
              <h3 className="mt-3 text-[16px] font-bold">{t.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.8] text-muted">{t.body}</p>
            </div>
          ))}
          <div className="bg-surface p-6">
            <h3 className="text-[16px] font-bold">最初は2名以上の現場から</h3>
            <p className="mt-1.5 text-[14px] leading-[1.8] text-muted">新任教育のあと、最初の数回は先輩と同じ現場に入ります。1名配置の現場は、慣れてから。</p>
          </div>
        </div>
      </Section>

      {/* 1日の流れ */}
      <Section eyebrow="A day" title="1日の流れ（日勤の例）">
        <ol className="grid gap-0">
          {dayFlow.map((d, i) => (
            <li key={d.title} className="grid grid-cols-[88px_1fr] gap-4 border-l-2 border-line pb-6 pl-5 last:pb-0 sm:grid-cols-[140px_1fr]">
              <time className="num text-[13.5px] font-semibold text-accent">{d.time}</time>
              <div>
                <h3 className="text-[16px] font-bold leading-snug">{d.title}</h3>
                <p className="mt-1 text-[14px] leading-[1.8] text-muted">{d.body}</p>
                {i === dayFlow.length - 1 && <p className="num mt-1 text-[12.5px] text-muted">※ 申請しない日は所定の給与日にまとめて支払われます</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 給与・日払い */}
      <Section tone="surface" eyebrow="Pay" title="給与・日払い">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-sm border border-line bg-bg p-6">
            <p className="text-[12.5px] font-semibold text-muted">日給（交通誘導・雑踏警備）</p>
            <p className="num mt-1 text-[36px] font-semibold leading-none text-heading sm:text-[44px]">{recruitFacts.dailyWageMin.toLocaleString()}<span className="mx-1 text-[20px] text-muted">〜</span>{recruitFacts.dailyWageMax.toLocaleString()}<span className="ml-1 text-[16px] font-medium text-muted">円</span></p>
            <p className="mt-3 text-[13.5px] leading-[1.8] text-muted">{recruitFacts.dailyWageNote}。検定2級を取ると資格者配置路線に入れ、日給が上がります。詳しい条件はカジュアル面談で提示し、求人媒体の掲載内容と一致させています。</p>
          </div>
          <div className="grid gap-3">
            {[
              { t: "日払い申請は LINE から", d: "退勤打刻のあと、その場で申請できます。" },
              { t: "当日中に振込", d: "申請した分が当日中に口座へ。振込手数料は本人負担です。" },
              { t: "申請しなければ給与日に", d: "日払いを使わない日は、所定の給与日にまとめて支払われます。" },
              { t: "社会保険あり", d: "加入条件を満たす方は健康保険・厚生年金・雇用保険・労災保険に加入します。" },
            ].map((x) => (
              <div key={x.t} className="grid grid-cols-[24px_1fr] gap-2 rounded-sm border border-line bg-bg px-4 py-3">
                <Icon name="check" size={18} className="mt-1 text-accent" />
                <div><p className="text-[14.5px] font-bold text-heading">{x.t}</p><p className="text-[13.5px] text-muted">{x.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* スマホで完結 */}
      <Section eyebrow="Smartphone" title="シフトも、出退勤も、日払いも、スマホで完結" lead="紙のタイムカードも、日報も、会社への電話もありません。隊員用のLINEにあるボタンを押すだけです。">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <PhoneMock />
          <ul className="grid gap-3">
            {[
              { t: "シフトを出す", d: "2週間分のシフトを、月初と15日にLINEから提出。4日前までならLINEで変更できます（それ以降は配置が自動で組まれるため、会社に電話で変更）。" },
              { t: "勤務指示・出発前確認", d: "翌日の現場・集合時間・持ち物がLINEに届きます。出発前にボタンで確認を返すだけ。" },
              { t: "上番（出勤）・下番（退勤）", d: "現場に着いたら上番、終わったら下番を押す。管制が全員の到着を確認し、遅れている人にはすぐ連絡します。会社に寄る必要はありません。" },
              { t: "日払い申請", d: "下番の流れでそのまま申請。当日中に振り込まれます（振込手数料は本人負担）。" },
            ].map((x, i) => (
              <li key={x.t} className="grid grid-cols-[40px_1fr] gap-3 rounded-sm border border-line bg-bg p-4">
                <span className="num flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent text-[13px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div><p className="text-[15px] font-bold text-heading">{x.t}</p><p className="mt-0.5 text-[13.5px] leading-[1.8] text-muted">{x.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 数字で見るOU */}
      <Section tone="surface" eyebrow="Numbers" title="数字で見るOU">
        <StatTiles items={[
          { value: site.stats.guards, suffix: "名", label: "在籍隊員（2号）" },
          { value: site.stats.averageAge, decimals: 1, suffix: "歳", label: "平均年齢" },
          { value: site.stats.certified2, suffix: "名", label: "交通誘導検定2級", note: `年内に＋${site.stats.certified2Planned}名取得予定` },
          { value: site.stats.instructors, suffix: "名", label: "指導教育責任者", note: `年内に＋${site.stats.instructorsPlanned}名` },
        ]} />
      </Section>

      {/* 研修・キャリア */}
      <Section eyebrow="Training & career" title="研修とキャリア" lead="入社直後の新任教育（20時間・給与あり）から、検定2級、班長、身辺警護まで。急がせませんが、道は用意しています。">
        <Steps items={careerSteps} />
        <div className="mt-8"><Link href="/company/education" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">教育・品質体制について <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* 正直に */}
      <Section tone="surface" eyebrow="Honest" title="先に言っておきたいこと">
        <Note tone="accent" title={recruitFacts.stance}>
          夏の暑さ、立ちっぱなしの体力、雨の日の中止、1名現場の孤独。大変なところと、会社がそれに対してやっていることを<Link href="/recruit#honest" className="underline underline-offset-4">採用トップの「正直に伝えること」</Link>にまとめています。読んでから決めてください。
        </Note>
      </Section>

      <Section eyebrow="FAQ" title="よくあるご質問（警備スタッフ）">
        <Faq items={securityFaq} />
        <div className="mt-6"><Link href="/recruit/faq" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">採用FAQをすべて見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* 募集要項 */}
      <Section tone="surface" eyebrow="Requirements" title="募集要項" lead="求人媒体（Indeed・バイトル）の掲載内容と一致させています。詳細条件はカジュアル面談で書面を用いてご説明します。">
        <DefList items={securityRequirements} />
      </Section>

      <Section eyebrow="Casual interview" title="カジュアル面談">
        <CasualInterview />
      </Section>

      <RecruitContactBand
        title="警備スタッフに応募する"
        lead="LINEで「話を聞きたい」と送っていただくか、応募フォームからどうぞ。2営業日以内にLINEまたは電話でご連絡します。"
      />
    </div>
  );
}
