import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, Faq, ContactBand, TwoColumnList } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { protection } from "@/content/protection";
import { LegalNote, protectionServiceJsonLd } from "../_components/shared";
import { QuickExit } from "./QuickExit";

const c = protection.personal;
const path = c.path;

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: path },
  openGraph: { title: c.title, description: c.description, url: path },
};

const crumbs = [{ href: protection.path, label: "身辺警護" }, { href: path, label: "個人の方へ" }];
const formHref = `${protection.contactPath}#personal`;

export default function ProtectionPersonalPage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <JsonLd data={[
        protectionServiceJsonLd({ path, name: `個人の方の身辺警護｜${protection.brand}`, description: c.lead, audience: c.audience, relatedTo: protection.path }),
        faqJsonLd(c.faq),
        breadcrumbJsonLd(crumbs),
      ]} />

      {/* 緊急時の帯（最上部） */}
      <div className="border-b border-line bg-surface" role="region" aria-label="緊急時のご案内">
        <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] font-bold text-heading">
            身の危険が差し迫っている場合は、まず
            <a href="tel:110" className="num mx-1 inline-flex items-center gap-1 rounded-sm bg-engi px-2 py-0.5 text-white"><Icon name="phone" size={14} />110番</a>
            へ。私たちは警察の代わりにはなれません。
          </p>
          <QuickExit compact />
        </Container>
      </div>

      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Personal — 個人の方へ"
        title={<span className="font-serif font-medium">{c.h1}</span>}
        lead={c.lead}
        chips={["匿名で相談可", "相談だけでも可", "警察・弁護士との並行を推奨", "九州圏は最短で調整", "女性警護員は要相談"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={formHref} size="lg"><Icon name="doc" size={20} />匿名で相談する</Button>
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary" size="lg"><Icon name="phone" size={20} /><span className="num">{site.telDisplay}</span></Button>
        </div>
        <div className="mt-6 max-w-[520px]"><QuickExit /></div>
        <LegalNote className="mt-5" />
      </PageHero>

      <Section eyebrow="First" title="最初にお伝えしたいこと">
        <CardGrid cols={2}>
          {c.promises.map((p, i) => <FeatureCard key={p.title} meta={String(i + 1).padStart(2, "0")} title={p.title} body={p.body} />)}
        </CardGrid>
      </Section>

      <Section tone="surface" eyebrow="Services" title="個人の方にできること" lead="日程と区間を決めて、計画的に行う警護です。常駐や24時間の張り込みではなく、「この日のこの移動が怖い」に対応します。">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {c.services.map((s, i) => (
            <div key={s.title} className="bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-[16.5px] font-bold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-muted">{s.body}</p>
            </div>
          ))}
          <div className="bg-surface p-6">
            <p className="num text-[12px] font-semibold tracking-wider text-muted">With you</p>
            <h3 className="mt-1 text-[16.5px] font-bold">警察・弁護士への相談に同行</h3>
            <p className="mt-2 text-[14px] leading-[1.8] text-muted">警察相談専用電話は <a href="tel:%239110" className="num font-semibold text-ink underline underline-offset-4">#9110</a>。ストーカー規制法に基づく「援助の申出」や、弁護士への接近禁止の仮処分の相談に、警護員が同行します。</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Scope" title="行わないこと" lead="できないことを先にお伝えするのは、別の窓口に早くつながっていただくためです。">
        <TwoColumnList
          left={{ title: "私たちが行うこと", icon: "check", items: ["身辺への随行と、危害の発生を未然に警戒・回避すること", "不審な動きがあったときの退避誘導と、警察への即時通報", "警察・弁護士へのご相談への同行", "警護終了後の報告書のお渡し"] }}
          right={{ title: "私たちが行わないこと", icon: "shield-off", items: [...c.cannot] }}
        />
      </Section>

      <Section tone="surface" eyebrow="Area & Options" title="対応エリアと体制">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-line bg-bg p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-bold"><Icon name="pin" size={20} className="text-accent" />九州圏</h3>
            <p className="mt-2 text-[14px] leading-[1.8] text-muted">{c.area.kyushu}</p>
          </div>
          <div className="rounded-sm border border-line bg-bg p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-bold"><Icon name="car" size={20} className="text-accent" />東京・大阪など遠方</h3>
            <p className="mt-2 text-[14px] leading-[1.8] text-muted">{c.area.remote}</p>
          </div>
          <div className="rounded-sm border border-line bg-bg p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-bold"><Icon name="users" size={20} className="text-accent" />女性警護員</h3>
            <p className="mt-2 text-[14px] leading-[1.8] text-muted">ご希望により女性警護員の配置を調整します（要相談）。日程と内容によってはご希望に沿えない場合がありますので、ご相談時にお伝えください。</p>
          </div>
          <div className="rounded-sm border border-line bg-bg p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-bold"><Icon name="wallet" size={20} className="text-accent" />料金</h3>
            <p className="mt-2 text-[14px] leading-[1.8] text-muted">{c.pricingNote}</p>
          </div>
        </div>
        <Note title="本人確認について">
          ご相談は匿名で構いませんが、ご契約の際には本人確認を行います。これは、ご依頼者ご本人以外の方が、第三者を監視する目的で警護を利用することを防ぐためです。
        </Note>
      </Section>

      <Section eyebrow="FAQ" title="個人の方からのご質問">
        <Faq items={c.faq} />
        <div className="mt-6"><Link href={`${protection.path}#faq`} className="inline-flex items-center gap-1 text-[14px] font-bold text-action">身辺警護全般のご質問 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <ContactBand
        variant="protect"
        title={<span className="font-serif font-medium">相談だけで終わっても、構いません。</span>}
        lead="お名前を伏せたまま、安全に受け取れる連絡手段と時間帯をご指定ください。ご指定の方法以外でご連絡することはありません。"
        formHref={formHref}
        formLabel="匿名で相談する"
        showLine={false}
        note={<>{protection.responseNote}。{c.emergency}<span className="mt-1 block">{protection.legalName}</span></>}
      />
    </div>
  );
}
