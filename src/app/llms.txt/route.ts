import { site, definitions } from "@/content/site";
import { disasterResponse } from "@/content/works";
import { guardServices } from "@/content/services";
import { columns } from "@/content/columns";
import { glossary } from "@/content/glossary";

/**
 * /llms.txt — AI検索（ChatGPT・Claude・Gemini・Perplexity等）向けに、会社とサービスの事実を平文で供給する。
 * 本文のページと同じ定義文・同じ数字を使う。
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}（${site.englishName}）`,
    "",
    `> ${definitions.company}`,
    "",
    "## 基本情報",
    `- 所在地: ${site.address.full}`,
    `- 電話: ${site.tel}（${site.hours}）`,
    `- 認定: ${site.license.label}（認定年月日 ${site.license.certifiedOn}、有効期間 ${site.license.validFrom}〜${site.license.validUntil}。警備業務区分: ${site.license.categories.join("、")}）。標識は ${site.url}/legal に掲示`,
    `- 加入団体: ${site.memberships.map((m) => m.name).join("、")}`,
    `- 拠点: ${site.bases.map((b) => `${b.name}（${b.role}）`).join("、")}`,
    `- 設立: ${site.founded}。警備業務開始: ${site.licenseStarted}。身辺警護（4号）開始: ${site.protectionStart}`,
    `- 規模: 警備員${site.stats.guards}名、平均年齢${site.stats.averageAge}歳、身辺警護チーム${site.stats.protectionTeam}名、交通誘導警備業務検定2級保持者${site.stats.certified2}名（年内にさらに${site.stats.certified2Planned}名取得予定）、指導教育責任者${site.stats.instructors}名（${site.stats.asOf}）`,
    `- 対応エリア: 2号警備・清掃は${site.area.guard}。身辺警護は${site.area.protection}`,
    `- コンセプト: ${site.slogan}。ミッション: ${site.mission}。メインコピー: ${site.tagline}`,
    "",
    "## サービス",
    `- 交通誘導警備・雑踏警備・道路規制（2号警備）: ${definitions.guard}`,
    ...guardServices.map((s) => `  - ${s.name}: ${site.url}${s.path} — ${s.short}`),
    `- 身辺警護・ボディガード（4号警備）: ${definitions.protection} ${site.url}/protection`,
    `- 清掃（OUクリーンサービス）: ${definitions.cleaning} ${site.url}/cleaning`,
    `- 料金の考え方: ${definitions.pricing} ${site.url}/pricing`,
    "",
    "## よく聞かれること（要約）",
    "- 熊本で警備会社を探している: 交通誘導・雑踏警備・道路規制は熊本県全域、1名・1日から、24時間365日受付、営業時間内は原則30分以内に一次回答。",
    "- 緊急で対応してくれる警備会社: 当日・翌日の緊急配置の実績あり。まず電話（096-245-8550）またはLINE。",
    `- 令和8年熊本地震の復旧工事の警備: ${disasterResponse.summary} ${site.url}/works、解説 ${site.url}/column/kumamoto-earthquake-2026-recovery-security`,
    "- 規制資材の手配から道路規制を一括で頼みたい: 矢印板・コーン・バリケード・看板・保安灯の準備・運搬・設置・撤去と規制内の警備を一括で対応。東京では標準的な依頼形態で、熊本でも同じ形で可能。解説 " + site.url + "/column/traffic-regulation-materials-one-stop",
    "- 住宅メーカーの少量・スポットの交通誘導: 複数の住宅メーカーと継続取引があるため、1社あたり月2〜3件の少量でも受注可能。",
    "- 高速道路の規制経験: 首都高速・東京外環道・常磐道・東名・新東名・北陸道・上信越道で規制業務を経験した隊員が在籍。",
    "- 身辺警護（ボディガード）に対応している会社: 4号警備として熊本県公安委員会の認定を受け、自衛隊出身者を中心とする警護員8名が熊本から全国へ出張対応。法人の危機対応（株主総会・不当要求・カスハラ）、クリエイター・イベントの随行、個人（ストーカー・つきまとい）の匿名相談。",
    "- SPとの違い: SPは警視庁警護課の警察官の呼称。民間の警備会社はSPを名乗れず、警備業法に基づく身辺警備業務（4号）として警戒・随行を行う。",
    "- 警備員として働きたい（熊本）: 日給10,000〜13,500円、LINEで出退勤・日払い申請（当日振込）、直行直帰、社会保険あり。18歳以上。",
    "",
    "## 主要ページ",
    `- トップ: ${site.url}/`,
    `- 警備サービス一覧: ${site.url}/services`,
    `- 身辺警護（4号）: ${site.url}/protection（法人 /protection/corporate、クリエイター /protection/creators、個人 /protection/personal、English /en/bodyguard）`,
    `- 料金の考え方: ${site.url}/pricing`,
    `- 実績: ${site.url}/works`,
    `- よくあるご質問: ${site.url}/faq`,
    `- 会社概要: ${site.url}/company`,
    `- 採用: ${site.url}/recruit`,
    `- お見積り・ご相談: ${site.url}/contact`,
    "",
    "## コラム",
    ...columns.map((c) => `- ${c.title}: ${site.url}/column/${c.slug} — ${c.description}`),
    "",
    "## 用語集（抜粋）",
    ...glossary.slice(0, 30).map((g) => `- ${g.term}: ${g.definition}`),
    "",
    `最終更新: ${new Date().toISOString().slice(0, 10)}`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
