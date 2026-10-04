"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "@/components/ui/Icon";
import { Container, cx } from "@/components/ui/primitives";
import { nav, site } from "@/content/site";

/**
 * 全ページ共通ヘッダー。構造は固定、色だけテーマに追従。
 * 4号（/protection）ではCTAが「相談する」に変わり、LINEは出さない。
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isProtect = pathname.startsWith("/protection") || pathname.startsWith("/en");
  const isRecruit = pathname.startsWith("/recruit");
  const isClean = pathname.startsWith("/cleaning");

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) { setLastPath(pathname); setOpen(false); }
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cta = isProtect
    ? { href: "/protection/contact", label: "相談する" }
    : isRecruit
      ? { href: "/recruit/entry", label: "応募する" }
      : isClean
        ? { href: "/cleaning/contact", label: "現地確認を依頼" }
        : { href: "/contact", label: "見積・お問い合わせ" };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/92 backdrop-blur supports-[backdrop-filter]:bg-bg/80" data-theme={isProtect ? "protect" : isClean ? "clean" : isRecruit ? "recruit" : undefined}>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo id="ou-header" />
        <nav aria-label="メイン" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <li key={n.href}>
                  <Link href={n.href} className={cx("relative inline-flex h-16 items-center px-3.5 text-[14px] font-semibold text-ink/85 hover:text-heading", active && "text-heading after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:bg-engi")} aria-current={active ? "page" : undefined}>{n.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.tel.replace(/-/g, "")}`} className="hidden items-center gap-2 text-ink md:inline-flex">
            <Icon name="phone" size={18} className="text-accent" />
            <span className="flex flex-col leading-none">
              <span className="num text-[16px] font-bold tracking-tight">{site.telDisplay}</span>
              <span className="num mt-0.5 text-[10px] text-muted">24時間受付・緊急対応可</span>
            </span>
          </a>
          <Link href={cta.href} className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-ink px-4 text-[13.5px] font-bold text-bg hover:bg-navy sm:min-h-[42px] sm:px-5">{cta.label}</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "メニューを閉じる" : "メニューを開く"} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden">
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>
      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-bg lg:hidden">
        <Container className="py-4">
          <ul className="grid">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="flex items-center justify-between border-b border-line py-3.5 text-[16px] font-semibold text-ink">{n.label}<Icon name="arrow" size={18} className="text-muted" /></Link>
              </li>
            ))}
            <li><Link href="/contact" className="flex items-center justify-between border-b border-line py-3.5 text-[16px] font-semibold text-ink">見積・お問い合わせ<Icon name="arrow" size={18} className="text-muted" /></Link></li>
          </ul>
          <div className="mt-4 grid gap-2 text-[13.5px] text-muted">
            <a href={`tel:${site.tel.replace(/-/g, "")}`} className="inline-flex items-center gap-2 text-ink"><Icon name="phone" size={18} className="text-accent" /><span className="num font-semibold">{site.telDisplay}</span>（24時間受付）</a>
            <p className="num">{site.license.label}</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
