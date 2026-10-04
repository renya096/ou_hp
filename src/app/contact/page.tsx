import type { Metadata } from "next";
import Link from "next/link";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs } from "@/components/ui/blocks";
import { Field, Input, Textarea, ChoiceGroup, Honeypot, FormSection } from "@/components/ui/form";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { sendInquiry } from "@/lib/actions";
import { site } from "@/content/site";

const path = "/contact";
const title = "お見積り・ご相談（警備）｜2分で終わる見積フォーム";
const description = "熊本の交通誘導・雑踏警備・道路規制のお見積りフォーム。現場の種類・場所・期間・人数を選ぶだけ、2分で送信。営業時間内は原則30分以内に一次回答、お見積りは営業日内24時間以内。電話・LINEでも受け付けています。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
  robots: { index: false, follow: true },
};

const crumbs = [{ href: path, label: "お見積り・ご相談" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Contact"
        title="お見積り・ご相談（警備）"
        lead="2ステップ・2分で終わります。分からない項目は空欄で構いません。営業時間内は原則30分以内に一次回答し、お見積りは営業日内24時間以内にお届けします。"
        chips={["お見積り無料", "一次回答 原則30分以内", "見積書 営業日内24時間以内", "1名・1日から"]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span>（24時間）</Button>
          <Button href={site.line.business} variant="secondary"><Icon name="line" size={18} />LINEで相談</Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <form action={sendInquiry} data-hide-sticky className="grid gap-6">
            <input type="hidden" name="kind" value="guard" />
            <Honeypot />

            <FormSection step="01" title="案件について">
              <Field label="警備の種類" name="service" required>
                <ChoiceGroup name="service" options={["交通誘導", "雑踏・イベント", "高速道路規制", "一般道路規制", "駐車場", "その他"]} columns={3} />
              </Field>
              <Field label="現場の種別" name="siteType">
                <ChoiceGroup name="siteType" options={["建築", "土木・道路", "電気・ガス・通信", "イベント", "商業施設", "学校・地域", "その他"]} columns={3} />
              </Field>
              <Field label="現場の所在地" name="location" required hint="市区町村まででも構いません。分かれば住所も">
                <Input name="location" required placeholder="例：熊本市東区 ◯◯町" />
              </Field>
              <Field label="期間" name="period" required>
                <ChoiceGroup name="period" options={["日程を入力する", "1日のみ", "未定（相談したい）"]} columns={3} />
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="startDate" className="text-[12.5px] text-muted">開始日</label>
                    <Input name="startDate" type="date" />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="endDate" className="text-[12.5px] text-muted">終了日（1日のみなら空欄）</label>
                    <Input name="endDate" type="date" />
                  </div>
                </div>
              </Field>
              <Field label="時間帯" name="timeBand" hint="具体的な時間が決まっていれば備考に">
                <ChoiceGroup name="timeBand" options={["昼", "夜", "昼夜", "時間を備考に書く"]} columns={2} />
              </Field>
              <Field label="必要人数" name="headcount" required>
                <ChoiceGroup name="headcount" options={["1〜3名", "4〜9名", "10名以上", "相談したい"]} columns={2} />
              </Field>
              <Field label="有資格者（検定2級）の配置" name="certified" hint="資格者配置路線かどうかの判断もお手伝いします">
                <ChoiceGroup name="certified" options={["必要", "不要", "わからない"]} columns={3} />
              </Field>
              <Field label="希望の回答期限" name="deadline">
                <ChoiceGroup name="deadline" options={["本日中", "3日以内", "1週間以内"]} columns={3} />
              </Field>
            </FormSection>

            <FormSection step="02" title="連絡先">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="会社名" name="company" required>
                  <Input name="company" required autoComplete="organization" />
                </Field>
                <Field label="部署・ご担当者名" name="department">
                  <Input name="department" placeholder="例：工事部 山田" autoComplete="off" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="電話番号" name="phone" required>
                  <Input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
                </Field>
                <Field label="メールアドレス" name="email" hint="見積書の送付先">
                  <Input name="email" type="email" autoComplete="email" inputMode="email" />
                </Field>
              </div>
              <Field label="希望の連絡手段" name="contactMethod">
                <ChoiceGroup name="contactMethod" options={["電話", "メール", "LINE"]} columns={3} />
              </Field>
              <Field label="備考" name="message" hint="具体的な時間帯、現場の状況、図面の有無など">
                <Textarea name="message" placeholder="例：7:30〜17:00。片側交互通行、2名。図面はメールで送れます。" />
              </Field>
            </FormSection>

            <Note title="警備業法に基づき、契約前に書面でご説明します">
              お見積りに合意いただいた後、警備業法第19条に基づく契約前書面（業務内容・料金・解除条件・損害賠償など）をお渡しし、ご説明したうえでご契約となります。いただいた情報はお見積りとご連絡のためにのみ使用します（<Link href="/privacy" className="underline underline-offset-4">プライバシーポリシー</Link>）。
            </Note>
            <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
              <p className="text-[13px] text-muted">営業時間内は原則30分以内に一次回答します。</p>
              <Button size="lg"><Icon name="doc" size={20} />この内容で見積を依頼する</Button>
            </div>
          </form>

          <aside className="grid gap-4 lg:sticky lg:top-24">
            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="text-[15px] font-bold text-heading">急ぎの現場は電話で</p>
              <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num mt-1 block text-[24px] font-semibold text-ink">{site.tel}</a>
              <p className="text-[13px] text-muted">{site.hours}</p>
              <p className="mt-3 text-[13.5px] leading-[1.8] text-muted">当日・翌日の配置は、電話がいちばん早く確認できます。</p>
            </div>
            <div className="rounded-sm border border-line bg-bg p-5">
              <p className="text-[15px] font-bold text-heading">LINEなら図面や写真も送れます</p>
              <p className="mt-2 text-[13.5px] leading-[1.8] text-muted">現場の写真・図面・工程表をそのまま送ってください。配置案とあわせて見積をお返しします。</p>
              <Button href={site.line.business} variant="secondary" className="mt-4 w-full"><Icon name="line" size={18} />LINEで相談する</Button>
            </div>
            <div className="rounded-sm border border-line bg-bg p-5 text-[13.5px] leading-[1.8] text-muted">
              <p className="font-bold text-heading">他のご相談</p>
              <ul className="mt-2 grid gap-1">
                <li><Link href="/protection/contact" className="inline-flex items-center gap-1 font-bold text-action">身辺警護のご相談（匿名可） <Icon name="arrow" size={14} /></Link></li>
                <li><Link href="/cleaning/contact" className="inline-flex items-center gap-1 font-bold text-action">清掃の現地確認 <Icon name="arrow" size={14} /></Link></li>
                <li><Link href="/recruit" className="inline-flex items-center gap-1 font-bold text-action">採用について <Icon name="arrow" size={14} /></Link></li>
              </ul>
              <p className="mt-3">メール：<a href={`mailto:${site.email.security}`} className="num underline underline-offset-4">{site.email.security}</a></p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
