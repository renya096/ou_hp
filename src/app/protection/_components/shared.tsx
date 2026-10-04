import { cx } from "@/components/ui/primitives";
import { serviceJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { protection } from "@/content/protection";

/** 法的名義の併記（4号の各ページに置く） */
export function LegalNote({ className = "", lang = "ja" }: { className?: string; lang?: "ja" | "en" }) {
  return (
    <p className={cx("num text-[12.5px] leading-[1.7] text-muted", className)}>
      {lang === "en"
        ? <>Operated by {site.englishName} — Close Protection Division (licensed by the Kumamoto Prefectural Public Safety Commission, License No. {site.license.number.replace(/[第号]/g, "")}).</>
        : <>法的名義：{protection.legalName}（{site.license.label}）</>}
    </p>
  );
}

/** 写真が入るまでの枠。何を撮るかをキャプションで示す（顔なし前提）。 */
export function PlaceholderFigure({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <figure className={cx("overflow-hidden rounded-sm border border-line", className)}>
      <div className="relative aspect-[16/9] bg-surface" role="img" aria-label={caption}>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/60 to-transparent" aria-hidden="true" />
      </div>
      <figcaption className="num px-4 py-2 text-[12px] text-muted">{caption}</figcaption>
    </figure>
  );
}

/** 4号の Service JSON-LD。相談窓口を /protection/contact に向け、英語対応を明記する。 */
export function protectionServiceJsonLd(o: { path: string; name: string; description: string; audience: string; relatedTo?: string; serviceType?: string; inLanguage?: "ja" | "en" }) {
  const base = serviceJsonLd({
    path: o.path,
    name: o.name,
    serviceType: o.serviceType ?? protection.serviceType,
    description: o.description,
    audience: o.audience,
    areaServed: [{ "@type": "Country", name: "日本" }],
    relatedTo: o.relatedTo,
  });
  return {
    ...base,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}${o.inLanguage === "en" ? "/en/bodyguard#request" : protection.contactPath}`,
      servicePhone: { "@type": "ContactPoint", telephone: `+81-${site.tel.slice(1)}` },
      availableLanguage: ["ja", "en"],
    },
    ...(o.inLanguage ? { inLanguage: o.inLanguage } : {}),
  };
}
