import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note, DefList } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, ContactBand, TwoColumnList } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { bodyguardRecruit } from "@/content/recruit";

const path = "/recruit/bodyguard";
const title = "警護員（身辺警護）募集｜次期メンバー若干名";
const description = `株式会社OU警備保障の身辺警護業務（警備業法第4号）の警護員を若干名募集。自衛隊・警察・格闘技・警備の経験者歓迎、現役2号隊員のステップアップも。熊本を拠点に全国へ出張。${site.protectionStart}サービス開始。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: "/recruit", label: "採用情報" }, { href: path, label: "警護員（身辺警護）" }];

export default function RecruitBodyguardPage() {
  const b = bodyguardRecruit;
  return (
    <div data-theme="recruit">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Recruit — 警護員"
        title="警護員（身辺警護業務）"
        lead={b.lead}
        chips={["募集人数：若干名", "正社員", "熊本拠点・全国出張あり", "18歳以上・欠格事由非該当", "守秘義務の誓約必須"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/recruit/entry" size="lg"><Icon name="doc" size={20} />応募フォーム</Button>
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary" size="lg"><Icon name="phone" size={20} /><span className="num">{site.tel}</span></Button>
        </div>
      </PageHero>

      <Section eyebrow="Who" title="歓迎する経験" lead="以下のいずれかに該当する方を歓迎します。該当しない方も、体力・適性の確認を経て選考します。">
        <TwoColumnList
          left={{ title: "歓迎する経験", icon: "check", items: b.welcome }}
          right={{ title: "求める姿勢", icon: "earpiece", items: ["静かに、長時間、周囲を見続けられる", "目立たないこと・語らないことを受け入れられる", "依頼者と対象者の情報を外に出さない", "法令と社内の行動基準の範囲で判断できる", "不規則な勤務・出張・待機に対応できる"] }}
        />
      </Section>

      <Section tone="surface" eyebrow="Duties" title="任務の内容">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {b.duties.map((d, i) => (
            <div key={d.title} className="bg-bg p-6">
              <p className="num text-[12px] font-semibold tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-[16px] font-bold">{d.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.8] text-muted">{d.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6"><Link href="/protection" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">身辺警護サービスの内容を見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      <Section eyebrow="Notes" title="応募前にご確認ください">
        <div className="grid gap-3">
          {b.notes.map((n) => (
            <p key={n} className="flex items-start gap-2 text-[14.5px] leading-[1.8] text-ink"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{n}</p>
          ))}
        </div>
        <div className="mt-6">
          <Note title="経歴の書き方について">
            所属部隊名・任務歴・過去の対象者など、守秘にかかわる経歴の詳細を応募書類に書く必要はありません。「自衛隊で◯年勤務」「警備業務◯年」程度で十分です。面接でも、話せる範囲で構いません。
          </Note>
        </div>
      </Section>

      <Section tone="surface" eyebrow="Requirements" title="募集要項">
        <DefList items={b.conditions} />
      </Section>

      <ContactBand
        title="警護員に応募する"
        lead="応募フォームの職種で「警護員」を選び、経験の概要を書いてください。書類確認のうえ、2営業日以内に電話でご連絡します。"
        variant="recruit"
        formHref="/recruit/entry"
        formLabel="応募フォーム"
        showLine={false}
        note="現役の2号隊員の方は、所属の指導教育責任者に直接ご相談いただいても構いません。"
      />
    </div>
  );
}
