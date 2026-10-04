import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";
import { Reveal } from "./Reveal";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** 12カラム・最大1200px・スマホ16px余白の外枠 */
export function Container({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "header" | "footer" | "nav" | "article" }) {
  return <Tag className={cx("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</Tag>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("num flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted", className)}><Reveal as="i" className="rule" /> {children}</p>
  );
}

/**
 * ページ内セクションの共通型。eyebrow（小見出し）→ title（H2）→ lead（補足）→ children。
 * tone="surface" で薄い面に切り替える。
 */
export function Section({
  id, eyebrow, title, lead, children, tone = "bg", className = "", headingLevel = 2, align = "left", narrow = false,
}: {
  id?: string; eyebrow?: string; title?: ReactNode; lead?: ReactNode; children?: ReactNode;
  tone?: "bg" | "surface"; className?: string; headingLevel?: 2 | 3; align?: "left" | "center"; narrow?: boolean;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <section id={id} className={cx(tone === "surface" ? "bg-surface" : "bg-bg", "py-16 sm:py-20 lg:py-24", className)}>
      <Container>
        {(eyebrow || title || lead) && (
          <div className={cx("mb-10 sm:mb-12", align === "center" && "text-center", narrow ? "max-w-[68ch]" : "max-w-[76ch]", align === "center" && "mx-auto")}>
            {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
            {title && <H className="text-[30px] font-black leading-[1.2] tracking-[-0.02em] sm:text-[40px]">{title}</H>}
            {lead && <p className="mt-4 text-[15px] leading-[1.9] text-muted sm:text-[16px]">{lead}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "engi";
const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-action text-action-ink hover:bg-action-hover border-[1.5px] border-transparent",
  secondary: "bg-transparent text-ink border-[1.5px] border-ink/70 hover:border-ink hover:bg-card",
  ghost: "bg-transparent text-ink underline-offset-4 hover:underline border border-transparent px-2",
  engi: "bg-engi text-white hover:brightness-110 border-[1.5px] border-transparent",
};

export function Button({
  href, children, variant = "primary", size = "md", className = "", external = false, ...rest
}: {
  href?: string; children: ReactNode; variant?: ButtonVariant; size?: "sm" | "md" | "lg"; className?: string; external?: boolean;
} & Omit<ComponentProps<"a">, "href"> & Omit<ComponentProps<"button">, "type">) {
  const sizeClass = size === "lg" ? "min-h-[52px] px-7 text-[16px]" : size === "sm" ? "min-h-[40px] px-4 text-[14px]" : "min-h-[46px] px-6 text-[15px]";
  const base = cx("inline-flex items-center justify-center gap-2 rounded-full font-bold transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px motion-reduce:hover:translate-y-0", sizeClass, variantClass[variant], className);
  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return <a href={href} className={base} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...(rest as ComponentProps<"a">)}>{children}</a>;
    }
    return <Link href={href} className={base} {...(rest as Omit<ComponentProps<"a">, "href">)}>{children}</Link>;
  }
  return <button type="submit" className={base} {...(rest as ComponentProps<"button">)}>{children}</button>;
}

/** 根拠・事実の小さなチップ（認定番号・82名・32.6歳 など） */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={cx("inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-[12.5px] text-ink", className)}>{children}</span>;
}

/** 注意・補足ボックス */
export function Note({ children, title, tone = "neutral" }: { children: ReactNode; title?: string; tone?: "neutral" | "accent" }) {
  return (
    <div className={cx("rounded-sm border-l-[3px] px-5 py-4 text-[14px] leading-[1.8]", tone === "accent" ? "border-accent bg-accent-soft" : "border-line bg-card")}>
      {title && <p className="mb-1 font-bold text-heading">{title}</p>}
      <div className="text-ink">{children}</div>
    </div>
  );
}

/** 定義リスト（会社概要・募集要項） */
export function DefList({ items }: { items: Array<{ term: string; desc: ReactNode }> }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <div key={it.term} className="grid gap-1 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-6">
          <dt className="text-[13.5px] font-semibold text-muted">{it.term}</dt>
          <dd className="text-[15px] text-ink">{it.desc}</dd>
        </div>
      ))}
    </dl>
  );
}
