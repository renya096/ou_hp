import type { Metadata } from "next";
import Link from "next/link";
import { Section, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, StatTiles, FeatureCard, CardGrid, Steps, ContactBand, TwoColumnList } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";

const path = "/company/education";
const title = "教育・品質体制｜新任教育20時間・指導教育責任者";
const description = `${site.shortName}の教育・品質体制。警備業法に基づく新任教育（20時間以上）と現任教育を自社で実施。指導教育責任者${site.stats.instructors}名、交通誘導警備業務検定2級${site.stats.certified2}名。現場巡回、配置・出退勤・報告のシステム、行動基準「しないこと」。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/company", label: "会社概要" }, { href: path, label: "教育・品質体制" }];

const trainingSteps = [
  { title: "新任教育（20時間以上）", body: "警備業法に基づき、基本教育と業務別教育を社内で実施。座学に加えて、合図・無線・規制資材の実技を行います。", note: "入社直後・給与あり" },
  { title: "現場デビュー（2名以上の現場）", body: "最初の数回は先輩隊員と同じ現場に配置し、教育品質管理室が巡回して確認します。" },
  { title: "現任教育（年1回以上）", body: "法定の現任教育で知識と技能を更新。直近のヒヤリハットと事故事例を共有します。" },
  { title: "検定2級・4号教育", body: "希望と適性に応じて交通誘導警備業務検定2級の受験を支援。身辺警護を志す隊員には4号区分の教育を行います。" },
];

const systems = [
  { icon: "calendar" as const, title: "配置管理", body: "現場ごとの必要人数・資格要件・時間帯を自社システムで管理。欠員が出たときの補充候補をすぐに出せます。" },
  { icon: "line" as const, title: "出退勤（LINE打刻）", body: "隊員は現場到着時と終了時にLINEで打刻。管制が全員の到着を確認し、遅延があれば即座にお客様へ連絡します。" },
  { icon: "report" as const, title: "報告", body: "現場の報告は当日中にシステムに記録され、必要に応じてお客様に共有します。写真・気づき・ヒヤリハットも残します。" },
  { icon: "users" as const, title: "現場巡回", body: `指導教育責任者${site.stats.instructors}名と教育品質管理室が現場を巡回。服装・合図・配置位置を確認し、その場で指導します。` },
];

export default function EducationPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Education & Quality"
        title="教育・品質体制"
        lead={`警備の品質は、教育の時間と、現場を見に行く回数で決まると考えています。指導教育責任者1名と交通誘導警備業務検定2級の資格者2名、計3名が配置計画と現場指導にあたり、1人ひとりの隊員を現場で見て育てています。`}
        chips={["新任教育 20時間以上", "現任教育 年1回以上", `指導教育責任者 ${site.stats.instructors}名`, `検定2級 ${site.stats.certified2}名`, "現場巡回"]}
      />

      <Section eyebrow="Numbers" title="教育体制の数字">
        <StatTiles items={[
          { value: 20, suffix: "時間+", label: "新任教育", note: "警備業法に基づく法定教育" },
          { value: site.stats.instructors, suffix: "名", label: "指導教育責任者", note: `年内に＋${site.stats.instructorsPlanned}名` },
          { value: site.stats.certified2, suffix: "名", label: "交通誘導警備業務検定2級", note: `年内に＋${site.stats.certified2Planned}名取得予定` },
          { value: site.stats.guards, suffix: "名", label: "在籍警備員" },
        ]} />
      </Section>

      <Section tone="surface" eyebrow="Training" title="教育の流れ" lead="入社直後の新任教育から、年1回の現任教育、検定・4号教育まで。すべて社内の指導教育責任者が担当します。">
        <Steps items={trainingSteps} />
      </Section>

      <Section eyebrow="System" title="配置・出退勤・報告のシステム" lead="「来たか、いるか、どうだったか」を記録で答えられるように、配置から報告までを自社開発のシステムで管理しています。">
        <CardGrid cols={2}>
          {systems.map((s) => <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Code of conduct" title="行動基準 ——「しないこと」3つ" lead="行動指針に加えて、お客様との約束として「しないこと」を決めています。">
        <ol className="grid gap-4 lg:grid-cols-3">
          {[
            { t: "無断で配置を変更しません", d: "隊員の交代・人数の変更は、事前にご連絡し、了承を得てから行います。" },
            { t: "見積後の追加請求はしません", d: "見積に含まれない条件が発生する場合は、作業前にご説明し、合意のうえで進めます。" },
            { t: "営業時間内の連絡は原則30分以内に返します", d: "LINE・電話・メールのいずれも。返せない場合は、いつ返すかを先に伝えます。" },
          ].map((x, i) => (
            <li key={x.t} className="rounded-sm border border-line bg-bg p-6">
              <p className="num text-[12px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 flex items-start gap-2 text-[17px] font-bold text-heading"><Icon name="shield-off" size={20} className="mt-1 shrink-0 text-accent" />{x.t}</p>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{x.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Cleaning" title="清掃スタッフの教育">
        <TwoColumnList
          left={{ title: "採用時", icon: "check", items: ["身元確認と誓約書の取り交わし", "鍵・個人情報の取り扱いルールの説明", "損害賠償保険の適用範囲の共有"] }}
          right={{ title: "入社後", icon: "broom", items: ["先輩スタッフの現場への同行研修（1〜3回）", "OJT：手順書と仕上がりのチェックポイントを現場で確認", "写真報告の撮り方・送り方", "一人で担当後も、教育品質管理室が定期的に仕上がりを確認"] }}
        />
        <div className="mt-6"><Link href="/cleaning" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">OUクリーンサービスについて <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section tone="surface" eyebrow="Community" title="地域の安全活動" lead="警備で培った誘導の合図・声かけ・危険予知の考え方を、警備員以外の方にもお伝えしています。地域の安全活動の一環として、ご要望に応じて講習形式で行います。">
        <TwoColumnList
          left={{ title: "安全教育", icon: "check", items: ["現場での危険予知（KY）の進め方", "歩行者・車両への合図と声かけの基本", "事故が起きやすい時間帯・場所の見方"] }}
          right={{ title: "駐車場の接遇研修", icon: "car", items: ["来場者への案内・誘導の言葉づかい", "満車時・混雑時の対応と動線の整理", "クレームになりやすい場面の予防"] }}
        />
        <p className="mt-4 text-[13.5px] text-muted">講師は指導教育責任者・交通誘導警備業務検定2級の資格者が担当します。実施例は<Link href="/works#community-safety-training" className="underline underline-offset-4">実績・対応事例</Link>をご覧ください。</p>
      </Section>

      <Section>
        <Note title="教育に関する資料のご提供">
          入札・元請審査などで教育計画書・教育実施記録・資格者一覧が必要な場合は、お問い合わせください。警備業法に基づく書面とあわせてご提示します。
        </Note>
      </Section>

      <ContactBand
        title="教育体制についてのご質問・お見積り"
        lead="資格者配置の可否、教育記録の提示、現場巡回の頻度など、具体的にお答えします。"
      />
    </>
  );
}
