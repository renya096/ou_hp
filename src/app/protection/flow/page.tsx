import type { Metadata } from "next";
import { Section, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs, FeatureCard, CardGrid, ContactBand } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { protection } from "@/content/protection";
import { LegalNote } from "../_components/shared";

const path = "/protection/flow";
const title = "身辺警護のご相談から警護までの流れと秘匿方針";
const description = "身辺警護のご相談→リスク確認→警護計画→見積（書面）→契約（警備業法に基づく契約前書面）→警護→報告書までの流れと、情報の保管・廃棄、第三者提供をしない秘匿方針。お見積りは無料、個人の方は匿名相談可。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: protection.path, label: "身辺警護" }, { href: path, label: "流れと秘匿方針" }];

export default function ProtectionFlowPage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Flow & Confidentiality"
        title={<span className="font-serif font-medium">ご相談から警護開始までの流れと、秘匿の方針</span>}
        lead="身辺警護は、相談から警護まで7つの段階で進めます。各段階で何をお聞きし、何をお渡しするかをあらかじめ公開します。お見積りは無料で、契約前には警備業法に基づく書面でご説明します。"
        chips={["お見積り無料", "契約前書面（警備業法第19条）", "報告書を翌営業日までに", "第三者提供しない"]}
      >
        <LegalNote />
      </PageHero>

      {/* 7段階の詳細 */}
      <Section eyebrow="Flow" title="7つの段階">
        <ol className="grid gap-4">
          {protection.flowDetail.map((s, i) => (
            <li key={s.title} className="grid gap-4 rounded-sm border border-line bg-bg p-6 md:grid-cols-[72px_1fr_minmax(0,320px)]">
              <span className="num text-[28px] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[18px] font-bold">{s.title}</h3>
                <p className="mt-2 max-w-[68ch] text-[14.5px] leading-[1.9] text-muted">{s.body}</p>
              </div>
              <ul className="grid content-start gap-2 rounded-sm bg-surface p-4">
                {s.points.map((p) => <li key={p} className="flex items-start gap-2 text-[13.5px] leading-[1.7] text-ink"><Icon name="check" size={16} className="mt-1 shrink-0 text-accent" />{p}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* 書面 */}
      <Section tone="surface" eyebrow="Documents" title="お渡しする書面" lead="口頭の約束ではなく、書面で残します。">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-line bg-bg p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-bold"><Icon name="doc" size={20} className="text-accent" />契約前書面・契約時書面に書くこと</h3>
            <p className="mt-1 text-[13px] text-muted">警備業法第19条に基づく書面です。見積書とあわせてお渡しします。</p>
            <ul className="mt-3 grid gap-2">
              {protection.documents.preContract.map((t) => <li key={t} className="grid grid-cols-[18px_1fr] gap-2 text-[14.5px] leading-[1.7]"><span className="mt-[9px] h-px w-3 bg-accent" aria-hidden="true" />{t}</li>)}
            </ul>
          </div>
          <div className="rounded-sm border border-line bg-bg p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-bold"><Icon name="report" size={20} className="text-accent" />報告書に書くこと</h3>
            <p className="mt-1 text-[13px] text-muted">警護終了後、原則翌営業日までにお渡しします。</p>
            <ul className="mt-3 grid gap-2">
              {protection.documents.report.map((t) => <li key={t} className="grid grid-cols-[18px_1fr] gap-2 text-[14.5px] leading-[1.7]"><span className="mt-[9px] h-px w-3 bg-accent" aria-hidden="true" />{t}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* 秘匿方針 */}
      <Section eyebrow="Confidentiality" title="秘匿・情報の扱い" lead="守られる方の情報が漏れないことも、身辺警護の一部です。ご相談の段階から次の方針で扱います。">
        <CardGrid cols={3}>
          {protection.confidentiality.map((c, i) => <FeatureCard key={c.title} meta={String(i + 1).padStart(2, "0")} title={c.title} body={c.body} />)}
        </CardGrid>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Note title="情報の保管・廃棄">
            ご相談内容、警護計画書、報告書、本人確認書類の写しは、アクセス制限のある場所で保管し、閲覧できる担当者を限定します。法令で保存が求められる書類を除き、契約終了後に廃棄します。保存期間はご契約時に書面でお伝えします。
          </Note>
          <Note title="第三者への提供">
            ご相談内容・契約内容を第三者に提供することはありません（法令に基づく場合、または緊急時に警察・消防へ通報する場合を除く）。実績として公表する場合も、事前の同意なく特定できる情報は出しません。
          </Note>
        </div>
      </Section>

      <ContactBand
        variant="protect"
        title={<span className="font-serif font-medium">最初の一歩は、ご相談です。</span>}
        lead="法人の方はオンライン初回相談（30分・無料）、個人の方は匿名でご相談いただけます。相談だけで終わっても構いません。"
        formHref={protection.contactPath}
        formLabel="相談する（匿名可）"
        showLine={false}
        note={<>{protection.responseNote}。<span className="mt-1 block">{protection.legalName}</span></>}
      />
    </div>
  );
}
