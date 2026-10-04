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

  const lines: string[] = [];
  for (const [key, value] of formData.entries()) {
    if (["kind", "website"].includes(key)) continue;
    if (typeof value !== "string") { if (value && value.size > 0) lines.push(`${key}: （添付 ${value.name} ${Math.round(value.size / 1024)}KB）`); continue; }
    if (!value.trim()) continue;
    lines.push(`${labelOf(key)}: ${value.trim()}`);
  }
  const body = [`種別: ${dest.subject}`, `受信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`, "", ...lines].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (apiKey && from) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const replyTo = (formData.get("email") as string) || undefined;
    const { error } = await resend.emails.send({ from, to: [dest.to], subject: dest.subject, text: body, replyTo: replyTo && /.+@.+\..+/.test(replyTo) ? replyTo : undefined });
    if (error) console.error("[inquiry] send failed", error);
  } else {
    console.log("[inquiry] (mail not configured)\n" + body);
  }
  redirect(dest.thanks);
}

const labels: Record<string, string> = {
  service: "警備の種類", siteType: "現場の種別", location: "現場所在地", period: "期間", startDate: "開始日", endDate: "終了日", timeBand: "時間帯",
  headcount: "必要人数", certified: "有資格者の配置", deadline: "希望回答期限", company: "会社名", department: "部署・ご担当者", name: "お名前",
  phone: "電話", email: "メール", contactMethod: "希望連絡手段", message: "備考", caseType: "案件種別", date: "希望日程", place: "場所",
  people: "想定人数", nda: "NDA", contact: "連絡手段", contactTime: "連絡希望時間帯", situation: "状況", urgency: "緊急度", area: "地域",
  industry: "業種", target: "対象", size: "広さ", frequency: "希望頻度", current: "現在の清掃状況", withGuard: "警備も検討", job: "希望職種",
  age: "年齢（18歳以上の確認）", workStyle: "希望の働き方", experience: "経験", interviewDate: "面接希望日", furigana: "ふりがな", address: "お住まい（市区町村）",
  gender: "性別（任意）", language: "English support", eventType: "イベント種別", attendance: "来場見込み", venue: "会場", organization: "所属",
};
function labelOf(key: string) { return labels[key] ?? key; }
