import Link from "next/link";
import { site } from "@/content/site";

/**
 * 正式ロゴ（OUモノグラム＋社名「株式会社OU警備保障」M PLUS 1p でアウトライン化）。
 * ベクターは /public/brand/ に置き、ライト面はネイビー版、ダーク面（4号）は白版を CSS で切り替える。
 * マーク単体（LogoMark）は OGP・アイコンなどで使う。
 */
export function LogoMark({ height = 28, className = "", id = "ou" }: { height?: number; className?: string; id?: string }) {
  const width = Math.round((height * 299) / 178);
  const mid = `${id}-cut`;
  return (
    <svg width={width} height={height} viewBox="0 0 299 178" className={className} aria-hidden="true" focusable="false">
      <defs>
        <mask id={mid} maskUnits="userSpaceOnUse" x="0" y="0" width="299" height="178">
          <rect width="299" height="178" fill="#fff" />
          <circle cx="89" cy="89" r="75.5" fill="none" stroke="#000" strokeWidth="43" />
        </mask>
      </defs>
      <path d="M 162.5 3 V 103 A 61.5 61.5 0 0 0 285.5 103 V 3" fill="none" stroke="currentColor" strokeWidth="27" mask={`url(#${mid})`} />
      <circle cx="89" cy="89" r="75.5" fill="none" stroke="currentColor" strokeWidth="27" />
    </svg>
  );
}

export function Logo({ variant = "full", className = "", id = "ou" }: { variant?: "full" | "mark"; className?: string; id?: string }) {
  if (variant === "mark") {
    return (
      <Link href="/" className={`inline-flex items-center text-[color:var(--logo)] ${className}`} aria-label={`${site.name} ホーム`}>
        <LogoMark height={26} id={id} />
      </Link>
    );
  }
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label={`${site.name} ホーム`}>
      {/* 横組みロックアップ（viewBox 509x89）。高さ30pxで幅約186px（viewBox 551x89） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/ou-logo-horizontal-navy.svg" alt="" width={186} height={30} className="logo-light h-[30px] w-auto" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/ou-logo-horizontal-white.svg" alt="" width={186} height={30} className="logo-dark hidden h-[30px] w-auto" />
    </Link>
  );
}
