import type { Metadata } from "next";
import { Section, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs } from "@/components/ui/blocks";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";

const path = "/privacy";
const title = "プライバシーポリシー";
const description = `${site.name}の個人情報保護方針。取得する情報、利用目的、第三者提供、安全管理、身辺警護の相談情報の取り扱い、開示・訂正・削除のご請求窓口について。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

const crumbs = [{ href: path, label: "プライバシーポリシー" }];

const sections: Array<{ id: string; title: string; body: React.ReactNode }> = [
  {
    id: "scope",
    title: "1. 基本方針",
    body: <p>{site.name}（以下「当社」）は、警備業務・清掃業務・採用活動を通じてお預かりする個人情報を、個人情報の保護に関する法律および警備業法その他の関係法令を遵守して取り扱います。警備業は、お客様の施設・ご家族・ご事情に深く関わる仕事です。情報を守ることは、警備そのものだと考えています。</p>,
  },
  {
    id: "collect",
    title: "2. 取得する情報",
    body: (
      <ul className="grid gap-1.5">
        <li>お問い合わせ・お見積りフォーム、LINE、電話、メールでいただく情報（会社名、氏名、連絡先、現場の所在地・内容、ご相談内容）</li>
        <li>身辺警護のご相談でいただく情報（ご相談者・警護対象者の状況、行動範囲、関係者に関する情報など）</li>
        <li>採用応募でいただく情報（氏名、連絡先、お住まい、経験、希望の働き方など）</li>
        <li>警備業務・清掃業務の遂行上、お客様から提供を受ける情報（施設の図面、鍵の管理方法、入退室ルール、連絡網など）</li>
        <li>当サイトの閲覧に関する情報（アクセスログ、Cookie等。個人を特定する目的では使用しません）</li>
      </ul>
    ),
  },
  {
    id: "purpose",
    title: "3. 利用目的",
    body: (
      <ul className="grid gap-1.5">
        <li>お問い合わせへの回答、お見積り・ご契約・業務遂行のための連絡</li>
        <li>警備業務・清掃業務の計画、配置、実施、報告</li>
        <li>採用選考およびご連絡</li>
        <li>法令に基づく記録の作成・保存（警備業法に基づく書面等）</li>
        <li>当社サービスの品質向上のための分析（統計的に処理し、個人を特定しない形で行います）</li>
      </ul>
    ),
  },
  {
    id: "third",
    title: "4. 第三者への提供",
    body: <p>当社は、ご本人の同意がある場合、法令に基づく場合、人の生命・身体・財産の保護のために必要で同意を得ることが困難な場合を除き、個人情報を第三者に提供しません。業務の一部を協力会社に委託する場合は、必要最小限の情報に限り、秘密保持契約を締結したうえで提供し、当社が監督します。</p>,
  },
  {
    id: "protection",
    title: "5. 身辺警護のご相談情報の取り扱い",
    body: (
      <div className="grid gap-3">
        <p>身辺警護（警備業法第2条第1項第4号）のご相談では、ストーカー・脅迫・トラブルなど、ご相談者の安全に直結する情報をお預かりします。当社はこれらの情報を、通常の個人情報より一段高い基準で扱います。</p>
        <ul className="grid gap-1.5">
          <li><strong>匿名でのご相談</strong>を受け付けています。お名前・連絡先を伏せたまま、状況のご相談と概算のご案内まで進めることができます。</li>
          <li>ご相談内容を知る社内の担当者を、<strong>警護責任者と必要最小限の警護員に限定</strong>します。全隊員が閲覧できる配置システムには、警護対象者の氏名・住所・事情を記録しません。</li>
          <li>ご相談者の同意なく、<strong>加害者とされる方・ご家族・勤務先など関係者に連絡することはありません</strong>。警察への通報・相談は、ご相談者の意思を確認して行います（人の生命・身体に差し迫った危険がある場合を除きます）。</li>
          <li>当社は<strong>調査業務（尾行・身元特定など）を行いません</strong>。必要な場合は提携する探偵業者をご紹介し、情報の受け渡しはご相談者ご自身の判断で行っていただきます。</li>
          <li>ご相談が契約に至らなかった場合、ご相談者からのお申し出があれば、<strong>記録を速やかに削除</strong>します。契約に至った場合も、業務終了後は法令上の保存期間を経て削除します。</li>
          <li>任務に関する写真・記録は、ご相談者の同意なく実績紹介・広告に使用しません。</li>
        </ul>
      </div>
    ),
  },
  {
    id: "security",
    title: "6. 安全管理",
    body: <p>個人情報へのアクセスを業務上必要な担当者に限定し、権限管理・ログの記録・端末の管理を行います。隊員・スタッフには採用時に誓約書の取り交わしと教育を行い、退職後も守秘義務が続くことを明示しています。紙の書類は施錠保管し、不要になった情報は復元できない方法で廃棄します。</p>,
  },
  {
    id: "cookie",
    title: "7. Cookie・アクセス解析",
    body: <p>当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを利用することがあります。これらは個人を特定する情報を含みません。ブラウザの設定でCookieを無効にすることができます。</p>,
  },
  {
    id: "request",
    title: "8. 開示・訂正・削除のご請求",
    body: (
      <div className="grid gap-3">
        <p>ご本人から、保有する個人情報の開示・訂正・利用停止・削除のご請求があった場合、ご本人であることを確認のうえ、法令に従い速やかに対応します。</p>
        <Note title="お問い合わせ窓口">
          {site.name}　個人情報お問い合わせ窓口<br />
          <span className="num">{site.address.full}</span><br />
          メール：<a href={`mailto:${site.email.security}`} className="num underline underline-offset-4">{site.email.security}</a>　電話：<a href={`tel:${site.tel.replace(/-/g, "")}`} className="num">{site.tel}</a>
        </Note>
      </div>
    ),
  },
  {
    id: "revision",
    title: "9. 改定",
    body: <p>本ポリシーは、法令の改正やサービス内容の変更に応じて改定することがあります。改定後の内容は当サイトに掲載した時点から適用します。</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Privacy"
        title="プライバシーポリシー"
        lead="警備業は、お客様の施設・ご家族・ご事情に深く関わる仕事です。お預かりした情報を守ることは、警備そのものだと考えています。"
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
          <nav aria-label="目次" className="lg:sticky lg:top-24">
            <ol className="grid gap-1 text-[13.5px]">
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-muted hover:text-ink">{s.title}</a></li>)}
            </ol>
          </nav>
          <article className="grid gap-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-[20px] font-bold leading-[1.4] sm:text-[22px]">{s.title}</h2>
                <div className="mt-3 max-w-[68ch] text-[15px] leading-[1.9] text-ink [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[13px] [&_li]:before:h-px [&_li]:before:w-2 [&_li]:before:bg-accent">{s.body}</div>
              </section>
            ))}
            <p className="num text-[13px] text-muted">制定日：2026年10月1日</p>
          </article>
        </div>
      </Section>
    </>
  );
}
