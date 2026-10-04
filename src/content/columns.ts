/**
 * コラム（SEO／AI検索向けの解説記事）の型と一覧。
 * 記事本文は src/content/columns/*.ts に分割し、ここで束ねる。
 * ルール：事実は site.ts と同じ表記。4号は禁止語（SP自称・絶対・撃退・調査・武装・No.1）を使わない。
 */
import type { IconName } from "@/components/ui/Icon";
import { guardColumns } from "./columns/guard";
import { protectionColumns } from "./columns/protection";
import { recruitColumns } from "./columns/recruit";

export type ColumnCategory = "警備の基礎" | "交通誘導・イベント" | "身辺警護" | "料金・契約" | "採用・働き方";

export type ColumnSection = {
  heading: string;          // H2（検索語を含む名詞句）
  body: string[];           // 段落（1段落 2〜4文）
  list?: string[];          // 箇条書き（任意）
  note?: string;            // 補足・注意（任意）
};

export type Column = {
  slug: string;
  title: string;            // H1（32字目安、検索語を含む）
  description: string;      // meta description（110字目安）
  category: ColumnCategory;
  icon: IconName;
  targetKeywords: string[]; // 狙う検索語（内部メモ兼 keywords）
  publishedAt: string;      // YYYY-MM-DD
  updatedAt?: string;
  readingMinutes: number;
  lead: string;             // 冒頭の要約（AIが引用しやすい結論ファースト 2〜3文）
  sections: ColumnSection[];
  faq?: Array<{ q: string; a: string }>;
  related: string[];        // 関連ページのパス（サービス・他コラム）
  cta: "guard" | "protection" | "recruit" | "cleaning";
};

export const columns: Column[] = [...guardColumns, ...protectionColumns, ...recruitColumns].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getColumn(slug: string) {
  return columns.find((c) => c.slug === slug);
}

export const columnCategories: ColumnCategory[] = ["警備の基礎", "交通誘導・イベント", "身辺警護", "料金・契約", "採用・働き方"];
