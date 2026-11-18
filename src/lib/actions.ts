"use server";

import { redirect } from "next/navigation";
import { site } from "@/content/site";

export type InquiryKind = "guard" | "protection" | "protection-anonymous" | "cleaning" | "recruit";

const destinations: Record<InquiryKind, { to: string; subject: string; thanks: string }> = {
  guard: { to: site.email.security, subject: "【HP】警備のお見積り・ご相談", thanks: "/contact/thanks" },
  protection: { to: site.email.security, subject: "【HP】身辺警護のご相談", thanks: "/protection/contact/thanks" },
  "protection-anonymous": { to: site.email.security, subject: "【HP】身辺警護の匿名相談", thanks: "/protection/contact/thanks" },
  cleaning: { to: site.email.cleaning, subject: "【HP】清掃の現地確認・お見積り", thanks: "/cleaning/contact/thanks" },
  recruit: { to: site.email.security, subject: "【HP】採用応募", thanks: "/recruit/entry/thanks" },
};

/**
 * 全フォーム共通の送信処理（Server Action）。
 * - 受信先は種別ごとに切替（警備・4号→official_hp@、清掃→official_hp_clean@）
 * - RESEND_API_KEY と MAIL_FROM が設定されていれば Resend で送信。未設定ならサーバーログに出力して完了画面へ
 * - ハニーポット（website）に値があれば静かに完了画面へ
 */
export async function sendInquiry(formData: FormData) {
  const kind = (formData.get("kind") as InquiryKind) || "guard";
  const dest = destinations[kind] ?? destinations.guard;

  if (formData.get("website")) redirect(dest.thanks);
  // 入口で「営業・提案」を選んだ送信は受け付けない（メールも送らない）
  if (formData.get("purpose") === "sales") redirect("/contact/declined");

  const screening = screenForSales(formData);

  const lines: string[] = [];
  for (const [key, value] of formData.entries()) {
    if (["kind", "website"].includes(key)) continue;
    if (typeof value !== "string") { if (value && value.size > 0) lines.push(`${key}: （添付 ${value.name} ${Math.round(value.size / 1024)}KB）`); continue; }
    if (!value.trim()) continue;
    const shown = key === "purpose" ? (PURPOSE_LABEL[value] ?? value) : value.trim();
    lines.push(`${labelOf(key)}: ${shown}`);
  }
  const subject = screening.suspicious ? `【要確認：営業の可能性】${dest.subject}` : dest.subject;
  const body = [
    `種別: ${dest.subject}`,
    `受信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
    ...(screening.suspicious ? [`自動判定: 営業・売り込みの可能性（${screening.reasons.join("、")}）。本物のご依頼の可能性もあるため、一度内容を確認してください。`] : []),
    "",
    ...lines,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (apiKey && from) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const replyTo = (formData.get("email") as string) || undefined;
    const { error } = await resend.emails.send({ from, to: [dest.to], subject, text: body, replyTo: replyTo && /.+@.+\..+/.test(replyTo) ? replyTo : undefined });
    if (error) console.error("[inquiry] send failed", error);
  } else {
    console.log("[inquiry] (mail not configured)\n" + body);
  }
  redirect(dest.thanks);
}

const PURPOSE_LABEL: Record<string, string> = { new: "警備のご依頼・お見積り（新規）", existing: "既存のお取引・進行中の案件", recruit: "採用について", sales: "営業・提案" };

const labels: Record<string, string> = {
  purpose: "ご用件",
  service: "警備の種類", siteType: "現場の種別", location: "現場所在地", period: "期間", startDate: "開始日", endDate: "終了日", timeBand: "時間帯",
  headcount: "必要人数", certified: "有資格者の配置", deadline: "希望回答期限", company: "会社名", department: "部署・ご担当者", name: "お名前",
  phone: "電話", email: "メール", contactMethod: "希望連絡手段", message: "備考", caseType: "案件種別", date: "希望日程", place: "場所",
  people: "想定人数", nda: "NDA", contact: "連絡手段", contactTime: "連絡希望時間帯", situation: "状況", urgency: "緊急度", area: "地域",
  industry: "業種", target: "対象", size: "広さ", frequency: "希望頻度", current: "現在の清掃状況", withGuard: "警備も検討", job: "希望職種",
  age: "年齢（18歳以上の確認）", workStyle: "希望の働き方", experience: "経験", interviewDate: "面接希望日", furigana: "ふりがな", address: "お住まい（市区町村）",
  gender: "性別（任意）", language: "English support", eventType: "イベント種別", attendance: "来場見込み", venue: "会場", organization: "所属",
};
function labelOf(key: string) { return labels[key] ?? key; }

/**
 * 営業・売り込みの疑いを機械的に判定する（送信は止めず、件名に印を付けて受信側で振り分けられるようにする）。
 * 判定は「よくある売り込み語」「URLの多さ」「日本語を含まない本文」の3点。偽陽性を避けるため、2点以上で疑いとする。
 */
const SALES_WORDS = [
  "ご提案", "御提案", "提案させて", "ご紹介させて", "弊社サービス", "弊社の商品", "弊社では", "導入実績", "導入事例", "無料トライアル", "無料体験", "無料で",
  "集客", "SEO対策", "MEO", "ホームページ制作", "Web制作", "LP制作", "広告運用", "リスティング", "SNS運用", "動画制作",
  "業務効率化", "DX", "AI活用", "システム開発", "ツール", "クラウド", "SaaS", "アプリ開発", "RPA",
  "人材紹介", "人材派遣", "採用支援", "求人広告", "外国人材", "特定技能", "営業代行", "テレアポ代行", "代理店募集", "パートナー募集", "フランチャイズ",
  "補助金", "助成金", "節税", "コスト削減", "経費削減", "電気料金", "電力", "太陽光", "リース", "保険の見直し", "資金調達", "ファクタリング", "M&A", "事業承継",
  "資料をお送り", "資料を送付", "一度お打ち合わせ", "15分", "30分ほど", "お時間をいただけ", "ご都合の良い日時", "オンラインで", "Zoomで",
  "責任者様", "ご担当者様", "決裁者", "社長様", "代表者様",
];

function screenForSales(formData: FormData): { suspicious: boolean; reasons: string[] } {
  const text = ["message", "company", "department", "name", "situation", "current", "experience", "location"]
    .map((k) => (formData.get(k) as string) || "")
    .join("\n");
  const reasons: string[] = [];
  const hits = SALES_WORDS.filter((w) => text.includes(w));
  if (hits.length >= 2) reasons.push(`売り込み語 ${hits.slice(0, 3).join("・")}`);
  const urls = (text.match(/https?:\/\/|www\./gi) || []).length;
  if (urls >= 2) reasons.push(`URL ${urls}件`);
  const hasJapanese = /[\u3040-\u30ff\u4e00-\u9fff]/.test(text);
  if (text.trim().length > 40 && !hasJapanese) reasons.push("日本語を含まない本文");
  // 画面を経由せずに直接送ってくる自動送信は「ご用件」が付かない
  if (!formData.get("purpose")) reasons.push("用件未選択（フォーム画面を経由しない送信）");
  const email = ((formData.get("email") as string) || "").toLowerCase();
  if (/@(gmail|yahoo|hotmail|outlook|icloud)\./.test(email) && hits.length >= 1) reasons.push("フリーメール＋売り込み語");
  // 2点以上、または売り込み語が多数で疑いとする
  const suspicious = reasons.length >= 2 || hits.length >= 4;
  return { suspicious, reasons };
}
