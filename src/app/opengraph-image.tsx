import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OGP画像。システムフォントで描画（日本語フォントの同梱はサイズが大きいため、必要になれば追加）。 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#13202f", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="84" height="50" viewBox="0 0 299 178"><path d="M 162.5 3 V 103 A 61.5 61.5 0 0 0 285.5 103 V 3" fill="none" stroke="#182253" strokeWidth="27" /><circle cx="89" cy="89" r="75.5" fill="none" stroke="#ffffff" strokeWidth="43" /><circle cx="89" cy="89" r="75.5" fill="none" stroke="#182253" strokeWidth="27" /></svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#182253" }}>株式会社OU警備保障</div>
            <div style={{ fontSize: 16, letterSpacing: 4, color: "#5b6672" }}>OU SECURITY</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#0f2a4a", lineHeight: 1.2 }}>{site.tagline}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 28, color: "#13202f", lineHeight: 1.5 }}><div>交通誘導・雑踏警備・道路規制から身辺警護まで。</div><div>24時間365日、熊本のどこへでも。</div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #d5dce5", paddingTop: 24, fontSize: 20, color: "#5b6672" }}>
          <div>{site.license.label}</div>
          <div style={{ display: "flex", gap: 28 }}>
            <div>{`隊員 ${site.stats.guards}名`}</div>
            <div>{`平均年齢 ${site.stats.averageAge}歳`}</div>
            <div style={{ color: "#9b2335", fontWeight: 700 }}>www.ou-keibi.com</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
