import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, Faq, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site, definitions } from "@/content/site";

const path = "/pricing";
const title = "警備料金の考え方｜設計労務単価を基準に算定";
const description = "熊本の警備料金はどう決まるのか。1名1日単価×人数×時間帯×資格者×曜日×期間の算定方法、公共工事設計労務単価（熊本県 交通誘導警備員A 17,700円／B 15,500円）との関係、割増・中止時の考え方、身辺警護と清掃の料金の考え方を公開しています。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/services", label: "警備サービス" }, { href: path, label: "料金の考え方" }];

/** ① 料金を決める6つの要素 */
const factors = [
  { k: "1名1日単価", v: "基準となる金額。公共工事設計労務単価（熊本県）を基準に、社会保険・教育・装備・管制の費用を含めて設定します。" },
  { k: "人数", v: "現場の規模・動線・交差点の数から必要な配置人数を決めます。片側交互通行は原則2名以上です。" },
  { k: "時間帯", v: "日中（8時間）を基本に、夜間（22時〜翌5時を含む勤務）は割増、8時間を超える部分は時間外として算定します。" },
  { k: "資格者", v: "資格者配置路線や発注者の指定がある場合、交通誘導警備業務検定2級の保持者を配置します（単価区分A）。" },
  { k: "曜日", v: "日曜・祝日の配置は割増の対象です。年末年始・お盆は事前にご相談ください。" },
  { k: "期間", v: "単発（1日）、短期、長期継続で単価の考え方が変わります。長期の継続配置は欠員補充のルールとあわせてご提案します。" },
];

/** ② 公共工事設計労務単価（出典：国土交通省） */
const laborRates = [
  { grade: "交通誘導警備員A", rate: "17,700円", who: "交通誘導警備業務検定（1級・2級）の資格者。資格者配置路線・高速道路・国道の規制で指定されることが多い区分。" },
  { grade: "交通誘導警備員B", rate: "15,500円", who: "検定資格を持たない警備員。一般の建築・土木現場、駐車場誘導、イベントなど。" },
];

/** 単価に含まれるもの（採用ページの日給との差の説明） */
const included = [
  { k: "隊員の賃金", v: "採用ページに掲載している日給。隊員本人に支払われる部分です。" },
  { k: "社会保険・労働保険", v: "健康保険・厚生年金・雇用保険・労災保険の会社負担分。" },
  { k: "法定教育", v: "警備業法で義務づけられた新任教育（20時間以上）と現任教育の時間と人件費。" },
  { k: "装備・制服", v: "制服・誘導灯・無線・反射材・雨具などの支給と更新。" },
  { k: "管制・配置管理", v: "24時間の受付、配置計画、欠員時の補充、現場巡回、日次報告。自社システムで管理しています。" },
  { k: "賠償責任保険", v: "万一の事故に備える保険の費用。補償内容はお問い合わせください。" },
];

/** ③ 割増の考え方 */
const surcharges = [
  { k: "夜間", v: "22時〜翌5時を含む勤務。労働基準法の深夜割増に、夜間の装備（照明・反射材）と交代計画の費用を加えて算定します。" },
  { k: "日曜・祝日", v: "日曜・祝日の配置は割増の対象です。イベントは日曜・祝日が中心になるため、見積時に曜日ごとの単価をお示しします。" },
  { k: "短時間", v: "4時間未満など短い勤務は、移動と準備の割合が大きくなるため、半日単価または最低保証時間を設けています。" },
  { k: "遠方", v: "熊本市から遠い現場（県南・天草・県外など）は、移動時間と交通費・宿泊費を実費または日当として加算します。" },
  { k: "急な依頼", v: "当日・翌日の配置は、空き状況により受けられる場合と受けられない場合があります。受けられる場合の割増の有無は、見積時にお伝えします。" },
];

/** ④ 中止・短縮の考え方 */
const cancellation = [
  { k: "前日までの中止", v: "連絡の時点によって、キャンセル料をいただかない場合と一定割合をいただく場合があります。隊員の配置が確定したあとは、本人の収入を補う分をお願いしています。" },
  { k: "当日の中止", v: "隊員が現場に向かった、または到着したあとの中止は、1日分の単価を基本にお願いしています。天候による中止も同じ考え方です。" },
  { k: "当日の短縮（早上がり）", v: "予定の勤務時間より早く終わった場合も、原則1日分として算定します。半日で終わることが見込まれる場合は、事前に半日単価でお見積りします。" },
  { k: "天候・災害", v: "雨天中止の判断時刻をあらかじめ決めておくと、キャンセル料の発生を防げます。契約時に判断時刻と連絡方法を取り決めます。" },
];

const faq: Array<{ q: string; a: string }> = [
  { q: "見積は無料ですか？また、いつまでに届きますか？", a: "無料です。現場の種類・場所・期間・人数・時間帯をお知らせいただければ、営業日内24時間以内を目安に見積書をお届けします。現地確認が必要な場合は、その日程をご相談したうえで提示します。" },
  { q: "公共工事設計労務単価と同じ金額で請求されるのですか？", a: "いいえ。設計労務単価は国が公共工事の積算に用いる基準で、私たちはこれを「基準」として見積を算定しています。実際の請求額は、現場の条件（時間帯・曜日・資格者・期間・遠方など）を反映して見積書に明記します。" },
  { q: "採用ページの日給と見積の単価に差があるのはなぜですか？", a: "見積の単価には、隊員本人の日給に加えて、社会保険・労働保険の会社負担分、警備業法で義務づけられた教育、制服・装備、24時間の管制と配置管理、賠償責任保険の費用が含まれています。差額は隊員の安全と現場の品質を維持するための費用で、中間マージンではありません。" },
  { q: "夜間や日曜・祝日の割増はどのくらいですか？", a: "夜間（22時〜翌5時を含む勤務）と日曜・祝日は割増の対象です。具体的な率は現場の条件によって変わるため、見積書で時間帯・曜日ごとの単価としてお示しします。見積後の追加請求はしません。" },
  { q: "前日・当日にキャンセルした場合の料金はどうなりますか？", a: "前日までの中止は連絡の時点によって扱いが変わり、当日の中止は1日分を基本にお願いしています。具体的な率と判断時刻は、契約時に警備業法に基づく書面でご説明します。天候による中止は、判断時刻を事前に決めておくことをおすすめしています。" },
];

function Table({ caption, head, rows }: { caption: string; head: [string, string]; rows: Array<{ k: string; v: string }> }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface text-[13px] text-muted">
          <tr>
            <th scope="col" className="w-[180px] px-4 py-3 font-semibold">{head[0]}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{head[1]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.k} className="align-top">
              <th scope="row" className="px-4 py-3.5 font-bold text-heading">{r.k}</th>
              <td className="px-4 py-3.5 leading-[1.8] text-ink">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(faq), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Pricing"
        title="警備料金の考え方"
        lead={definitions.pricing}
        chips={["お見積りは無料", "見積後の追加請求なし", "契約前に書面でご説明", "1名・1日から"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg"><Icon name="doc" size={20} />現場の条件を送って見積をもらう</Button>
          <Button href={site.line.business} variant="secondary" size="lg"><Icon name="line" size={20} />LINEで相談する</Button>
        </div>
      </PageHero>

      {/* ① 料金の決まり方 */}
      <Section eyebrow="01 — How it works" title="料金の決まり方" lead="警備料金は「◯円〜」の一律表示ができません。同じ1名でも、現場の条件で必要な費用が変わるからです。私たちは次の6つの要素で算定し、見積書にその内訳を明記します。">
        <div className="mb-8 overflow-x-auto">
          <ol className="flex min-w-max items-stretch gap-2 text-[14px] font-bold text-heading" aria-label="料金の算定式">
            {["1名1日単価", "人数", "時間帯", "資格者", "曜日", "期間"].map((t, i, arr) => (
              <li key={t} className="flex items-center gap-2">
                <span className="rounded-sm border border-line bg-surface px-4 py-3">{t}</span>
                {i < arr.length - 1 && <span className="num text-[18px] text-accent" aria-hidden="true">×</span>}
              </li>
            ))}
            <li className="flex items-center gap-2"><span className="num text-[18px] text-accent" aria-hidden="true">＝</span><span className="rounded-sm bg-navy px-4 py-3 text-white">お見積り金額</span></li>
          </ol>
        </div>
        <Table caption="料金を決める6つの要素" head={["要素", "考え方"]} rows={factors} />
      </Section>

      {/* ② 公共工事設計労務単価 */}
      <Section tone="surface" eyebrow="02 — Benchmark" title="公共工事設計労務単価を基準にしています" lead="国土交通省が毎年公表する公共工事設計労務単価は、公共工事の積算に使われる職種別・都道府県別の1日あたり単価です。私たちの見積は、この単価を基準に算定しています。元請・公共工事の積算と整合する見積書式での提示も可能です。">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h3 className="mb-3 text-[17px] font-bold">熊本県の交通誘導警備員の単価（令和8年3月適用）</h3>
            <div className="overflow-x-auto rounded-sm border border-line">
              <table className="w-full min-w-[520px] border-collapse text-left text-[14.5px]">
                <caption className="sr-only">令和8年3月適用 公共工事設計労務単価（熊本県・交通誘導警備員）</caption>
                <thead className="bg-bg text-[13px] text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">区分</th>
                    <th scope="col" className="px-4 py-3 font-semibold">1日あたり</th>
                    <th scope="col" className="px-4 py-3 font-semibold">対象</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-bg">
                  {laborRates.map((r) => (
                    <tr key={r.grade} className="align-top">
                      <th scope="row" className="whitespace-nowrap px-4 py-3.5 font-bold text-heading">{r.grade}</th>
                      <td className="num whitespace-nowrap px-4 py-3.5 text-[17px] font-semibold text-heading">{r.rate}</td>
                      <td className="px-4 py-3.5 leading-[1.8] text-ink">{r.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[12.5px] text-muted">出典：国土交通省「令和8年3月から適用する公共工事設計労務単価」（熊本県）。所定労働時間内8時間あたりの単価で、時間外・休日・深夜の割増や、法定福利費の事業主負担分などは含まれていません。</p>
          </div>
          <Note title="この金額は「請求額」ではなく「基準」です" tone="accent">
            設計労務単価は、警備員本人に支払われる賃金の水準を示すものです。私たちの見積単価は、これを基準に、下の表にある会社負担の費用を加えて算定します。そのため、設計労務単価そのものや、採用ページの日給とは金額が異なります。
          </Note>
        </div>

        <div className="mt-12">
          <h3 className="mb-2 text-[20px] font-bold">見積の単価に含まれるもの</h3>
          <p className="mb-5 max-w-[68ch] text-[14.5px] leading-[1.8] text-muted">採用ページの日給と見積の単価の差は、隊員の安全と現場の品質を維持するための費用です。中間マージンではなく、次の項目に充てられています。</p>
          <Table caption="見積の単価に含まれる費用" head={["項目", "内容"]} rows={included} />
        </div>
      </Section>

      {/* ③ 割増 */}
      <Section eyebrow="03 — Surcharges" title="割増の考え方" lead="割増は「取れるときに取る」ものではなく、隊員の負担と安全対策の費用に対応するものです。見積書には時間帯・曜日ごとの単価として明記し、見積後の追加請求はしません。">
        <Table caption="割増の対象と考え方" head={["条件", "考え方"]} rows={surcharges} />
      </Section>

      {/* ④ 中止・短縮 */}
      <Section tone="surface" eyebrow="04 — Cancellation" title="中止・短縮時の規定の考え方" lead="警備は、隊員一人ひとりの1日を現場のために確保するサービスです。中止になっても、その日の隊員の収入は守る必要があります。この前提で、キャンセル料の考え方を次のように定めています。">
        <Table caption="中止・短縮時の考え方" head={["場面", "考え方"]} rows={cancellation} />
        <div className="mt-6">
          <Note title="具体的な率は契約時にご説明します">
            キャンセル料の率と判断時刻は、現場の種類（工事・イベント）や期間によって変わるため、警備業法に基づく契約前の書面でご説明し、合意のうえで契約します。書面に記載のない料金を請求することはありません。
          </Note>
        </div>
      </Section>

      {/* ⑤ 身辺警護（4号） */}
      <Section eyebrow="05 — Protection" title="身辺警護（4号）の料金の考え方" lead="身辺警護は、警護対象の方の状況・場所・期間・リスク評価によって必要な体制が大きく変わるため、事例ごとの個別見積です。">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {[
              { t: "2名体制が基本", d: "警護対象の方の前後・左右を確保し、1名が対応している間にもう1名が周囲を警戒・退避誘導できる最小の体制です。状況により1名または3名以上をご提案します。" },
              { t: "交通費・宿泊費は実費", d: "熊本以外（九州各県、東京・大阪など）への出張は、交通費・宿泊費を実費でいただきます。移動日の日当の扱いも見積時に明記します。" },
              { t: "最低稼働は1日", d: "数時間のご依頼でも、事前の下見・動線確認・装備準備を含めて1日単位で算定します。" },
              { t: "事前相談・リスク評価は無料", d: "ご相談・状況のヒアリング・必要体制のご提案までは無料です。匿名でのご相談もお受けしています。" },
            ].map((c) => (
              <div key={c.t} className="bg-bg p-5">
                <p className="text-[15px] font-bold text-heading">{c.t}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.8] text-muted">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <Note title="参考：一般的な相場">
              身辺警護の料金は、一般的な相場として警護員1名1日あたり3.6〜5.4万円が中心帯とされています。これは業界の目安であり、私たちの料金そのものではありません。警護員の人数・時間・場所・リスク評価によって、この範囲を下回ることも上回ることもあります。
            </Note>
            <Button href="/protection" variant="secondary" size="lg" className="w-full">身辺警護について詳しく <Icon name="arrow" size={18} /></Button>
          </div>
        </div>
      </Section>

      {/* ⑥ 清掃 */}
      <Section tone="surface" eyebrow="06 — Cleaning" title="清掃（OUクリーンサービス）の料金の考え方" lead="清掃の料金は、面積・頻度・時間帯の3つで算定します。現地確認は無料で、確認後に書面でお見積りします。">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Table caption="清掃料金を決める要素" head={["要素", "考え方"]} rows={[
            { k: "面積・箇所", v: "床面積と、トイレ・厨房・ガラス・マットなど清掃箇所の数と種類。" },
            { k: "頻度", v: "毎日・週◯回の日常清掃か、月1回・年◯回の定期清掃か。頻度が高いほど1回あたりの単価は下がります。" },
            { k: "時間帯", v: "営業時間外（閉店後の深夜・開店前の早朝）の作業は、警備で培った勤務体制で対応します。深夜帯は割増の対象です。" },
            { k: "民泊", v: "チェックアウトごとの清掃は1回単位で算定し、リネン交換・消耗品補充・写真報告を含めるかで変わります。" },
          ]} />
          <div className="grid gap-4">
            <Note title="追加料金が発生する主なケース" tone="accent">
              <ul className="grid gap-1.5">
                {["汚れの度合いが通常の範囲を大きく超える場合（長期間未清掃、油汚れの固着、ごみの大量放置など）", "深夜帯（22時〜翌5時）の作業", "駐車場代・有料道路代などの実費", "特殊な薬剤・機材が必要な場合（事前にご相談のうえ見積に明記します）"].map((t) => (
                  <li key={t} className="grid grid-cols-[14px_1fr] gap-2"><span className="mt-[11px] h-px w-2.5 bg-accent" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </Note>
            <Button href="/cleaning" variant="secondary" size="lg" className="w-full">クリーンサービスについて詳しく <Icon name="arrow" size={18} /></Button>
          </div>
        </div>
      </Section>

      {/* ⑦ FAQ */}
      <Section eyebrow="FAQ" title="料金についてよくあるご質問">
        <Faq items={faq} />
        <div className="mt-6"><Link href="/faq" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">すべてのご質問を見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <ContactBand
        title="現場の条件をお知らせください。書面でお見積りします。"
        lead="現場の種類・場所・期間・人数・時間帯の5つが分かれば、営業日内24時間以内を目安に見積書をお届けします。見積後の追加請求はしません。"
        formLabel="現場の条件を送って見積をもらう"
        note={<>身辺警護のご相談は<Link href="/protection/contact" className="underline underline-offset-4">専用フォーム（匿名可）</Link>へ。清掃の現地確認は<Link href="/cleaning/contact" className="underline underline-offset-4">こちら</Link>。</>}
      />
    </>
  );
}
