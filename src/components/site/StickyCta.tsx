"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/components/ui/primitives";
import { site } from "@/content/site";

/**
 * スマホ下部の固定CTA（56px＋safe-area）。ファーストビュー通過後に表示、フォーム表示中・フッター到達時は隠す。
 * 2号/トップ：電話・LINE・見積 ／ 4号：電話・相談 ／ 清掃：電話・LINE・現地確認 ／ 採用：LINEで応募・応募フォーム
 */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      const formOpen = !!document.querySelector("form[data-hide-sticky]:focus-within");
      setShow(past && !nearFooter && !formOpen);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  if (pathname.startsWith("/contact") || pathname.startsWith("/protection/contact") || pathname.startsWith("/recruit/entry") || pathname.startsWith("/cleaning/contact")) return null;

  const isProtect = pathname.startsWith("/protection") || pathname.startsWith("/en");
  const isRecruit = pathname.startsWith("/recruit");
  const isClean = pathname.startsWith("/cleaning");
  const tel = `tel:${site.tel.replace(/-/g, "")}`;

  const items = isProtect
    ? [
        { href: tel, icon: "phone" as const, label: "電話で相談", strong: false },
        { href: "/protection/contact", icon: "doc" as const, label: "相談フォーム（匿名可）", strong: true },
      ]
    : isRecruit
      ? [
          { href: site.line.recruit, icon: "line" as const, label: "LINEで応募", strong: true },
          { href: "/recruit/entry", icon: "doc" as const, label: "応募フォーム", strong: false },
        ]
      : isClean
        ? [
            { href: tel, icon: "phone" as const, label: "電話", strong: false },
            { href: site.line.business, icon: "line" as const, label: "LINE", strong: false },
            { href: "/cleaning/contact", icon: "doc" as const, label: "現地確認", strong: true },
          ]
        : [
            { href: tel, icon: "phone" as const, label: "電話", strong: false },
            { href: site.line.business, icon: "line" as const, label: "LINE", strong: false },
            { href: "/contact", icon: "doc" as const, label: "見積依頼", strong: true },
          ];

  return (
    <div
      className={cx("safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-2 pt-2 backdrop-blur transition-transform duration-200 lg:hidden", show ? "translate-y-0" : "translate-y-full")}
      data-theme={isProtect ? "protect" : isClean ? "clean" : isRecruit ? "recruit" : undefined}
      aria-hidden={!show}
    >
      <div className={cx("grid gap-2", items.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
        {items.map((it) => {
          const cls = cx("inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full text-[13.5px] font-bold", it.strong ? "bg-action text-action-ink" : "border-[1.5px] border-line bg-card text-ink");
          const ext = it.href.startsWith("http") || it.href.startsWith("tel:");
          return ext
            ? <a key={it.label} href={it.href} className={cls} tabIndex={show ? 0 : -1} target={it.href.startsWith("http") ? "_blank" : undefined} rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}><Icon name={it.icon} size={18} />{it.label}</a>
            : <Link key={it.label} href={it.href} className={cls} tabIndex={show ? 0 : -1}><Icon name={it.icon} size={18} />{it.label}</Link>;
        })}
      </div>
    </div>
  );
}
