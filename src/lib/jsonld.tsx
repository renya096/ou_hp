import { site, definitions } from "@/content/site";

/** JSON-LD を安全に出力する（< を < にエスケープ） */
export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const ORG_ID = `${site.url}/#organization`;

/** Organization + LocalBusiness（layout で1回だけ出力。他ページは @id 参照） */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: ["OU警備保障", "OU SECURITY", "OUクリーンサービス"],
    legalName: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/opengraph-image` },
    image: `${site.url}/opengraph-image`,
    foundingDate: site.foundedISO,
    description: definitions.company,
    slogan: site.slogan,
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postal,
      addressRegion: site.address.region,
      addressLocality: site.address.locality,
      streetAddress: site.address.street,
      addressCountry: "JP",
    },
    telephone: `+81-${site.tel.slice(1)}`,
    faxNumber: `+81-${site.fax.slice(1)}`,
    email: site.email.security,
    openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
    areaServed: [{ "@type": "State", name: "熊本県" }, { "@type": "Country", name: "日本" }],
    numberOfEmployees: { "@type": "QuantitativeValue", value: site.stats.guards },
    identifier: { "@type": "PropertyValue", propertyID: "警備業認定番号", value: site.license.number, description: `${site.license.authority}認定` },
    additionalType: "https://ja.wikipedia.org/wiki/警備業",
    sameAs: [site.line.business],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", telephone: `+81-${site.tel.slice(1)}`, email: site.email.security, availableLanguage: ["ja", "en"], areaServed: "JP" },
      { "@type": "ContactPoint", contactType: "customer service", telephone: `+81-${site.tel.slice(1)}`, email: site.email.cleaning, availableLanguage: ["ja"], areaServed: "JP", description: "OUクリーンサービス（清掃）" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "警備・清掃サービス",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@id": `${site.url}/services/traffic-control#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${site.url}/services/crowd-control#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${site.url}/services/road-regulation#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${site.url}/protection#service` } },
        { "@type": "Offer", itemOffered: { "@id": `${site.url}/cleaning#service` } },
      ],
    },
  };
}

export function websiteJsonLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "ja", publisher: { "@id": ORG_ID } };
}

export function serviceJsonLd(o: { path: string; name: string; serviceType: string; description: string; audience: string; areaServed?: Array<Record<string, string>>; hours?: boolean; relatedTo?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${o.path}#service`,
    name: o.name,
    serviceType: o.serviceType,
    description: o.description,
    provider: { "@id": ORG_ID },
    areaServed: o.areaServed ?? [{ "@type": "State", name: "熊本県" }],
    audience: { "@type": "Audience", audienceType: o.audience },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: `${site.url}/contact`, servicePhone: { "@type": "ContactPoint", telephone: `+81-${site.tel.slice(1)}` }, availableLanguage: ["ja"] },
    ...(o.hours === false ? {} : { hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" } }),
    ...(o.relatedTo ? { isRelatedTo: { "@id": `${site.url}${o.relatedTo}#service` } } : {}),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

export function breadcrumbJsonLd(items: Array<{ href: string; label: string }>) {
  const list = [{ href: "/", label: "ホーム" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: `${site.url}${it.href}` })),
  };
}

export function jobPostingJsonLd(o: {
  path: string; title: string; description: string; datePosted: string; validThrough: string;
  employmentType: string[]; salaryMin: number; salaryMax: number; unit: "DAY" | "HOUR" | "MONTH"; benefits: string; qualifications: string; responsibilities: string; identifier: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: o.title,
    description: o.description,
    datePosted: o.datePosted,
    validThrough: o.validThrough,
    employmentType: o.employmentType,
    hiringOrganization: { "@id": ORG_ID, "@type": "Organization", name: site.name, sameAs: site.url },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", postalCode: site.address.postal, addressRegion: site.address.region, addressLocality: site.address.locality, streetAddress: site.address.street, addressCountry: "JP" } },
    applicantLocationRequirements: { "@type": "State", name: "熊本県" },
    baseSalary: { "@type": "MonetaryAmount", currency: "JPY", value: { "@type": "QuantitativeValue", minValue: o.salaryMin, maxValue: o.salaryMax, unitText: o.unit } },
    jobBenefits: o.benefits,
    qualifications: o.qualifications,
    responsibilities: o.responsibilities,
    educationRequirements: "不問",
    experienceRequirements: "不問",
    directApply: true,
    identifier: { "@type": "PropertyValue", name: site.name, value: o.identifier },
    url: `${site.url}${o.path}`,
  };
}

export function newsArticleJsonLd(o: { path: string; headline: string; datePublished: string; dateModified?: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: o.headline,
    description: o.description,
    datePublished: o.datePublished,
    dateModified: o.dateModified ?? o.datePublished,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}${o.path}`,
    image: `${site.url}/opengraph-image`,
  };
}

export function articleJsonLd(o: { path: string; headline: string; description: string; datePublished: string; dateModified?: string; keywords?: string[]; section?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: o.headline,
    description: o.description,
    datePublished: o.datePublished,
    dateModified: o.dateModified ?? o.datePublished,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}${o.path}`,
    image: `${site.url}/opengraph-image`,
    inLanguage: "ja",
    ...(o.keywords ? { keywords: o.keywords.join(", ") } : {}),
    ...(o.section ? { articleSection: o.section } : {}),
  };
}

export function definedTermSetJsonLd(terms: Array<{ slug: string; term: string; definition: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${site.url}/glossary#set`,
    name: "警備業の用語集（株式会社OU警備保障）",
    url: `${site.url}/glossary`,
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", "@id": `${site.url}/glossary#${t.slug}`, name: t.term, description: t.definition, inDefinedTermSet: `${site.url}/glossary#set` })),
  };
}
