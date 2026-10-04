import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Button, Note, DefList } from "@/components/ui/primitives";
import { PageHero, FeatureCard, CardGrid, Steps, Faq, TwoColumnList } from "@/components/ui/blocks";
import { Input, Textarea, Honeypot } from "@/components/ui/form";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/lib/jsonld";
import { sendInquiry } from "@/lib/actions";
import { site } from "@/content/site";
import { LegalNote, protectionServiceJsonLd } from "@/app/protection/_components/shared";

const path = "/en/bodyguard";
const title = "Bodyguard & Executive Protection in Japan (Kyushu-based) | OU Security";
const description = `Licensed Japanese security company (Kumamoto Prefectural Public Safety Commission License No. ${site.license.number.replace(/[第号]/g, "")}) providing close protection for visiting executives, VIPs, creators and events. Team of ${site.stats.protectionTeam} officers led by former JSDF members. Kumamoto-based, nationwide incl. Tokyo and Osaka. English-speaking coordinator.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path, languages: { ja: "/protection", en: path, "x-default": "/protection" } },
  openGraph: { title, description, url: path, locale: "en_US" },
};

const licenseNo = site.license.number.replace(/[第号]/g, "");
const tel = `tel:${site.tel.replace(/-/g, "")}`;
const telIntl = `+81 ${site.tel.slice(1)}`;

const definition = `${site.englishName} (OU Keibi Hosho) is a licensed Japanese security company based in Kumamoto, Kyushu (Kumamoto Prefectural Public Safety Commission License No. ${licenseNo}). Since October 2026 we have provided close protection (bodyguard) services under Article 2, Paragraph 1, Item 4 of the Japanese Security Services Act, with a team of ${site.stats.protectionTeam} close-protection officers led by former Japan Self-Defense Forces members. We serve visiting executives and VIPs, event and creator protection, and corporate crisis response nationwide, including Tokyo and Osaka. An English-speaking coordinator handles every inquiry.`;

const services = [
  { icon: "globe" as const, title: "Visiting executives & VIPs", body: "Airport meet-and-greet, transfers, meetings, dinners and hotel floors. Discreet, suited officers who blend in with your delegation. Advance reconnaissance of every venue." },
  { icon: "crowd" as const, title: "Events, talent & creators", body: "Fan events, concerts, conventions and esports in Japan. Close protection for performers (Item 4) and crowd management at the venue (Item 2) from one team, on one radio net." },
  { icon: "report" as const, title: "Corporate crisis response", body: "Shareholder meetings, unreasonable demands, workplace disputes, site and neighbourhood conflicts. Officers attend meetings and premises while your staff or counsel lead the conversation." },
  { icon: "car" as const, title: "Travel accompaniment", body: "Door-to-door accompaniment across Japan. Vehicles and drivers are arranged through licensed partner transport operators; our officers focus on the moments of boarding and alighting." },
];

const can = ["Accompany the principal and watch for, deter and avoid threats before they become harm", "Advance reconnaissance of venues, routes, exits and vehicle positions; a written protection plan", "Protect at arrivals and departures, in transit, in meetings and at hotels", "Guide the principal to safety and call the police (110) and ambulance (119) immediately", "Combine close protection with crowd management at events", "Accompany you to consultations with lawyers or the police", "Deliver a written report after the assignment"];
const cannot = ["Carry weapons. Officers carry only defensive equipment registered with the Public Safety Commission, as the Security Services Act requires", "Investigate, tail or identify individuals (reserved to licensed private investigators; we can refer you to a partner agency)", "Negotiate, settle or send warning letters on your behalf (reserved to attorneys; we accompany you to your lawyer)", "Detain or physically restrain anyone, or act as a substitute for the police", "Guarantee absolute safety. We reduce risk through preparation and vigilance, but no provider can promise an outcome"];

const flow = [
  { title: "Inquiry", body: "Send the form below or call. Our English-speaking coordinator replies within 2 business hours during office hours.", note: "Free initial consultation" },
  { title: "Risk review", body: "Who, when, where, how many, and any known concerns. We tell you frankly if protection is not the right tool." },
  { title: "Protection plan", body: "Advance reconnaissance, officer positions, routes, exits, vehicle positions and escalation rules in writing." },
  { title: "Written quote", body: "Officers, hours, travel and lodging at cost, surcharges and cancellation terms, all itemised.", note: "Quotes are free" },
  { title: "Contract", body: "Pre-contract disclosure as required by Japanese law, confidentiality clause, NDA on request, identity verification." },
  { title: "Protection", body: "Executed to plan. The team leader consults you if circumstances change." },
  { title: "Report", body: "Written report delivered by the next business day." },
];

const faq = [
  { q: "Are your officers armed?", a: "No. Private security officers in Japan may not carry firearms or weapons. Our officers carry only defensive equipment registered with the Public Safety Commission. Protection in Japan relies on planning, early detection, evacuation and immediate police liaison." },
  { q: "Are you a licensed company?", a: `Yes. ${site.englishName} holds Kumamoto Prefectural Public Safety Commission License No. ${licenseNo} covering traffic and crowd control (Item 2) and close protection (Item 4) under the Security Services Act. We have appointed a certified supervising instructor for close protection, as the law requires.` },
  { q: "Can you cover Tokyo, Osaka or other cities?", a: "Yes. We are based in Kumamoto, Kyushu, and travel nationwide. For Tokyo, Osaka and other distant cities we arrive the day before for reconnaissance. Travel and lodging are billed at cost." },
  { q: "How much does it cost?", a: "Every assignment is quoted individually based on the number of officers, hours, locations and risk. Our standard package is two officers, a one-day minimum, with travel and lodging at cost. Night and short-notice surcharges apply. For reference, typical Japanese market rates are roughly JPY 36,000 to 54,000 per officer per day; our quote is itemised in writing." },
  { q: "Do you provide armoured vehicles or drivers?", a: "We do not operate vehicles ourselves. We arrange vehicles and drivers through licensed partner transport operators and coordinate them within the protection plan." },
  { q: "Can you handle everything in English?", a: "Our coordinator handles inquiries, planning and reporting in English. Officers on the ground communicate essential instructions in English; detailed briefings are handled through the coordinator." },
];

export default function BodyguardEnPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Bodyguard & Executive Protection in Japan", item: `${site.url}${path}` },
    ],
  };
  return (
    <div data-theme="protect" lang="en" className="bg-bg">
      <JsonLd data={[
        protectionServiceJsonLd({ path, name: "Bodyguard & Executive Protection in Japan — OU Security", serviceType: "Close protection / bodyguard service (Security Services Act, Art. 2(1)(iv))", description: definition, audience: "Visiting executives and VIPs, event organisers, talent agencies and creators, corporations", relatedTo: "/protection", inLanguage: "en" }),
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        breadcrumb,
      ]} />

      <nav aria-label="Breadcrumb" className="border-b border-line bg-bg">
        <Container>
          <ol className="flex flex-wrap items-center gap-x-2 py-2.5 text-[12.5px] text-muted">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li className="flex items-center gap-x-2"><span aria-hidden="true">/</span><span className="text-ink" aria-current="page">Bodyguard & Executive Protection</span></li>
            <li className="ml-auto"><Link href="/protection" className="hover:text-ink" lang="ja">日本語</Link></li>
          </ol>
        </Container>
      </nav>

      <PageHero
        eyebrow="OU Security — Close Protection Division, Kumamoto, Japan"
        title={<span className="font-serif font-medium">Executive Protection &amp; Bodyguard Services in Japan</span>}
        lead={definition}
        chips={[`Licensed: Kumamoto PSC No. ${licenseNo}`, `${site.stats.protectionTeam} close-protection officers`, "Former JSDF members", "Nationwide incl. Tokyo / Osaka", "English-speaking coordinator"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#request" size="lg"><Icon name="doc" size={20} />Request a quote</Button>
          <Button href={tel} variant="secondary" size="lg"><Icon name="phone" size={20} /><span className="num">{telIntl}</span></Button>
        </div>
        <LegalNote lang="en" className="mt-5" />
      </PageHero>

      <Section eyebrow="Services" title="What we protect">
        <CardGrid cols={2}>
          {services.map((s) => <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Under Japanese law" title="What we can and cannot do" lead="Japan's Security Services Act, Attorney Act and Private Investigator Act draw clear lines. We state them up front so you can plan the rest of your security with the right partners.">
        <TwoColumnList left={{ title: "What we do", icon: "check", items: can }} right={{ title: "What we do not do", icon: "shield-off", items: cannot }} />
      </Section>

      <Section eyebrow="Team" title={<span className="font-serif font-medium">Protection through preparation, not intimidation.</span>} lead={`Our ${site.stats.protectionTeam} close-protection officers are led by former Japan Self-Defense Forces members. They are trained in advance reconnaissance, radio discipline, first aid, vehicle embarkation and evacuation, and bound by confidentiality. Officers dress to match your delegation and keep half a step behind.`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Certified instructor", d: "A supervising instructor certified for close protection reviews every plan." },
            { t: "Confidentiality", d: "NDA available from the first conversation. Minimum information shared with officers." },
            { t: "Insurance", d: "Liability insurance in place; details provided during consultation." },
            { t: "Female officers", d: "Female officers can be arranged on request, subject to availability." },
          ].map((it) => (
            <div key={it.t} className="rounded-sm border border-line bg-bg p-5"><p className="text-[15px] font-bold text-heading">{it.t}</p><p className="mt-1 text-[13.5px] leading-[1.7] text-muted">{it.d}</p></div>
          ))}
        </div>
      </Section>

      <Section tone="surface" eyebrow="Pricing" title="Pricing" lead="Every assignment is quoted individually. Quotes are free and itemised in writing.">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <DefList items={[
            { term: "Standard team", desc: "Two officers (for communication, rotation and emergency response)" },
            { term: "Minimum", desc: "One day" },
            { term: "Travel & lodging", desc: "Billed at cost" },
            { term: "Advance arrival", desc: "For Tokyo, Osaka and other distant cities, officers arrive the day before for reconnaissance" },
            { term: "Surcharges", desc: "Night hours, short notice, and last-minute additions" },
            { term: "Payment", desc: "Bank transfer (JPY). Invoices issued in writing" },
          ]} />
          <Note title="Market reference">
            Typical Japanese market rates are roughly JPY 36,000 to 54,000 per officer per day, plus night and short-notice surcharges. This is an industry reference, not our rate card; your quote is itemised for your assignment.
          </Note>
        </div>
      </Section>

      <Section eyebrow="How it works" title="From inquiry to report">
        <Steps items={flow} />
      </Section>

      <Section tone="surface" eyebrow="FAQ" title="Frequently asked questions">
        <Faq items={faq} />
      </Section>

      {/* Request form */}
      <Section id="request" eyebrow="Request" title={<span className="font-serif font-medium">Request a quote or consultation</span>} lead="Tell us who, when and where. Our English-speaking coordinator replies within 2 business hours during office hours (JST). Quotes are free.">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <form action={sendInquiry} data-hide-sticky className="grid gap-5 rounded-sm border border-line bg-surface p-5 sm:p-6">
            <input type="hidden" name="kind" value="protection" />
            <input type="hidden" name="language" value="English" />
            <Honeypot />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5"><label htmlFor="name" className="text-[13.5px] font-semibold text-ink">Your name <span className="text-accent">*</span></label><Input name="name" required autoComplete="name" /></div>
              <div className="grid gap-1.5"><label htmlFor="organization" className="text-[13.5px] font-semibold text-ink">Company / organisation</label><Input name="organization" autoComplete="organization" /></div>
              <div className="grid gap-1.5"><label htmlFor="email" className="text-[13.5px] font-semibold text-ink">Email <span className="text-accent">*</span></label><Input name="email" type="email" required autoComplete="email" inputMode="email" /></div>
              <div className="grid gap-1.5"><label htmlFor="phone" className="text-[13.5px] font-semibold text-ink">Phone (with country code)</label><Input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 ..." /></div>
              <div className="grid gap-1.5"><label htmlFor="date" className="text-[13.5px] font-semibold text-ink">Dates</label><Input name="date" placeholder="e.g. 12–15 Nov 2026" /></div>
              <div className="grid gap-1.5"><label htmlFor="place" className="text-[13.5px] font-semibold text-ink">Cities / venues</label><Input name="place" placeholder="e.g. Tokyo (Haneda), Osaka, Fukuoka" /></div>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="message" className="text-[13.5px] font-semibold text-ink">Details <span className="text-accent">*</span></label>
              <Textarea name="message" required rows={6} placeholder="Who needs protection (number of principals), the itinerary, number of attendees if an event, and any known concerns. Please do not include third parties' personal data at this stage." />
            </div>
            <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
              <p className="text-[12.5px] leading-[1.7] text-muted">By sending you agree to our <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link> (Japanese). Your message is read only by our coordinator.</p>
              <Button size="lg" className="sm:shrink-0"><Icon name="mail" size={20} />Send request</Button>
            </div>
          </form>
          <div className="grid gap-4">
            <div className="rounded-sm border border-line bg-bg p-5">
              <p className="text-[13px] font-semibold text-muted">Phone (Japan)</p>
              <a href={tel} className="num mt-1 block text-[20px] font-bold text-heading">{telIntl}</a>
              <p className="mt-1 text-[12.5px] text-muted">24 hours. Outside office hours we call back. Ask for the “English coordinator”.</p>
            </div>
            <div className="rounded-sm border border-line bg-bg p-5">
              <p className="text-[13px] font-semibold text-muted">Email</p>
              <a href={`mailto:${site.email.security}`} className="num mt-1 block break-all text-[15px] font-bold text-heading">{site.email.security}</a>
            </div>
            <Note title="In an emergency">
              Call <span className="num font-bold">110</span> (police) or <span className="num font-bold">119</span> (ambulance / fire) in Japan. We are not a substitute for the police.
            </Note>
          </div>
        </div>
      </Section>

      <div className="border-t border-line bg-bg">
        <Container className="flex flex-col gap-2 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{site.englishName} · {site.address.full} · Kumamoto PSC License No. {licenseNo}</p>
          <Link href="/protection" className="font-semibold text-ink hover:underline" lang="ja">日本語のページへ</Link>
        </Container>
      </div>
    </div>
  );
}
