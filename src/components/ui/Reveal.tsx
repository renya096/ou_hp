"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * スクロールで1回だけ表示する（opacity 0→1, translateY 8px, 300ms）。
 * JSが無い環境・reduced-motion では最初から表示される（globals.css）。
 */
export function Reveal({ children, className = "", as: Tag = "div", delay = 0 }: { children?: ReactNode; className?: string; as?: "div" | "li" | "section" | "article" | "i" | "span" | "h1" | "h2"; delay?: number }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.dataset.reveal = "in"; return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          window.setTimeout(() => { el.dataset.reveal = "in"; }, delay);
          io.disconnect();
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return <Comp ref={ref} data-reveal="" className={className.includes("kw") || className.includes("rule") ? className : `reveal ${className}`}>{children}</Comp>;
}

/** 数字のカウントアップ（600〜800ms、表示時1回）。小数は桁固定。 */
export function CountUp({ value, decimals = 0, suffix = "", className = "" }: { value: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = value.toFixed(decimals);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = final; return; }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const dur = 700;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (value * eased).toFixed(decimals);
        if (p < 1) raf = requestAnimationFrame(tick); else el.textContent = final;
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, decimals]);
  return <><span ref={ref} className={`num ${className}`}>{value.toFixed(decimals)}</span>{suffix}</>;
}

/** 見出しの行ごとに下から立ち上がるキネティック表示。lines の各要素が1行。accent=true の行はエンジ色。 */
export function Kinetic({ lines, as: Tag = "h1", className = "" }: { lines: Array<{ text: string; accent?: boolean }>; as?: "h1" | "h2" | "p"; className?: string }) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          <Reveal as="span" className="kw" delay={i * 120}>
            <span className={l.accent ? "text-engi" : undefined}>{l.text}</span>
          </Reveal>
        </span>
      ))}
    </Tag>
  );
}
