import type { IconName } from "@/components/ui/Icon";

/**
 * 実績・対応事例（匿名。業種・規模・内容のみ）。
 * TODO(内村確認): 「earthquake-2026」以外の4件は、専門家分析で挙がった典型案件をもとにした仮の事例です。
 * 実際の案件（発注者属性・規模・内容）に差し替えてから公開してください。
 */
export type Work = {
  slug: string;
  icon: IconName;
  category: "道路・工事" | "イベント" | "商業施設" | "災害対応" | "身辺警護";
  title: string;
  client: string;       // 匿名の発注者属性
  scale: string;        // 規模
  summary: string;
  points: string[];
};

export const works: Work[] = [
  {
    slug: "earthquake-2026",
    icon: "report",
    category: "災害対応",
    title: "令和8年熊本地震に伴う緊急警備・物資支援",
    client: "自治体・復旧工事の元請建設会社",
    scale: "2026年7月〜継続",
    summary: "2026年7月28日の発災直後から、要請のあった地域で交通誘導・雑踏警備に対応。復旧工事の規制と、支援物資拠点周辺の誘導を行いました。",
    points: ["発災翌日から要請に応じて隊員を配置", "復旧工事に伴う交通規制の継続対応", "グループ会社・協力会社と物資支援プロジェクトを実施"],
  },
  {
    slug: "road-regulation-national-route",
    icon: "road",
    category: "道路・工事",
    title: "国道の舗装補修工事に伴う片側交互通行",
    client: "舗装工事業者（元請）",
    scale: "夜間規制・複数日",
    summary: "資格者配置路線での夜間規制。検定2級保持者を含む隊を配置し、規制資材の設置から解除までを担当しました。",
    points: ["資格者配置路線に検定保持者を配置", "夜間の視認性確保（照明・反射材）", "公共工事積算に準拠した見積書式"],
  },
  {
    slug: "construction-site-continuous",
    icon: "baton",
    category: "道路・工事",
    title: "建築現場の出入口誘導（長期継続）",
    client: "熊本市内の建設会社",
    scale: "複数名・長期",
    summary: "住宅地に接する建築現場で、工事車両の出入りと通学路の歩行者動線を分ける誘導。欠員時の補充ルールを決めて継続配置しました。",
    points: ["通学時間帯の重点配置", "欠員時の自社補充ルール", "日次の報告を自社システムで共有"],
  },
  {
    slug: "festival-crowd",
    icon: "crowd",
    category: "イベント",
    title: "地域の祭り・花火大会の雑踏警備",
    client: "イベント主催者・実行委員会",
    scale: "来場者数千人規模",
    summary: "会場図と来場見込みから動線を設計し、横断箇所と退場時の滞留ポイントに重点配置。警備計画書の作成をお手伝いしました。",
    points: ["動線設計と警備計画書の作成支援", "終了後の一斉退場の誘導", "若い隊員による接遇重視の案内"],
  },
  {
    slug: "shopping-center-parking",
    icon: "car",
    category: "商業施設",
    title: "商業施設の繁忙期駐車場誘導",
    client: "商業施設の管理会社",
    scale: "繁忙期スポット",
    summary: "セール期間中の満車時の案内と歩行者優先の誘導。施設の清掃（OUクリーンサービス）とあわせてご依頼いただきました。",
    points: ["繁忙期のスポット配置", "歩行者優先の動線管理", "警備＋清掃の窓口一本化"],
  },
];
