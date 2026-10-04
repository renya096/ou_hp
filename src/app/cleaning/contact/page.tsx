import type { Metadata } from "next";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs } from "@/components/ui/blocks";
import { Field, Input, Textarea, Select, ChoiceGroup, Honeypot, FormSection } from "@/components/ui/form";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { sendInquiry } from "@/lib/actions";
import { site } from "@/content/site";

const path = "/cleaning/contact";
const title = "清掃の現地確認・お見積り依頼（無料）";
const description = "OUクリーンサービスの現地確認・お見積りのご依頼フォーム。店舗・飲食店、商業施設・オフィス、民泊、草刈り・テント設営。希望の頻度と時間帯をお知らせください。営業時間内は原則30分以内に一次回答します。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
  robots: { index: false, follow: true },
};

const crumbs = [{ href: "/cleaning", label: "OUクリーンサービス" }, { href: path, label: "現地確認を依頼" }];

export default function CleaningContactPage() {
  return (
    <div data-theme="clean">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="OU Clean Service"
        title="清掃の現地確認・お見積り依頼"
        lead="現地確認とお見積りは無料です。分かる範囲で構いませんので、対象・広さ・希望の頻度と時間帯をお知らせください。写真があればLINEで送っていただくほうが早く概算をお答えできます。"
        chips={["お見積り無料", "営業時間内は原則30分以内に一次回答", `受信先：${site.email.cleaning}`]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.line.business} variant="secondary"><Icon name="line" size={18} />LINEで写真を送って相談</Button>
          <Button href={`tel:${site.tel.replace(/-/g, "")}`} variant="secondary"><Icon name="phone" size={18} /><span className="num">{site.tel}</span></Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <form action={sendInquiry} data-hide-sticky className="grid gap-6">
            <input type="hidden" name="kind" value="cleaning" />
            <Honeypot />

            <FormSection step="01" title="清掃の内容">
              <Field label="対象" name="target" required>
                <ChoiceGroup name="target" options={["店舗・飲食店", "商業施設・オフィス", "民泊・ゲストハウス", "屋外・草刈り・テント", "その他"]} columns={2} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="業種" name="industry" hint="例：居酒屋、美容室、不動産管理">
                  <Input name="industry" placeholder="例：居酒屋" autoComplete="off" />
                </Field>
                <Field label="現場の所在地" name="location" required hint="市区町村まででも構いません">
                  <Input name="location" required placeholder="例：熊本市中央区" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="広さの目安" name="size" hint="坪・㎡・部屋数など、分かる範囲で">
                  <Input name="size" placeholder="例：30坪、2LDK、100㎡" />
                </Field>
                <Field label="希望の頻度" name="frequency" required>
                  <Select name="frequency" required placeholder="選んでください" options={["毎日", "週◯回", "月◯回", "都度（チェックアウトごとなど）", "1回だけ試したい"]} />
                </Field>
              </div>
              <Field label="希望の時間帯" name="timeBand">
                <ChoiceGroup name="timeBand" options={["営業前（早朝）", "閉店後", "深夜", "日中"]} columns={2} />
              </Field>
              <Field label="現在の清掃状況" name="current">
                <ChoiceGroup name="current" options={["自社（自分たち）で清掃", "他社に依頼中", "これから（新規開業など）"]} columns={3} />
              </Field>
              <label className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-line bg-bg px-3.5 py-2.5 text-[14.5px] has-[:checked]:border-action has-[:checked]:bg-accent-soft">
                <input type="checkbox" name="withGuard" value="警備も検討中" className="h-4 w-4 accent-[var(--action)]" />
                警備（駐車場誘導・雑踏警備）もあわせて検討している
              </label>
            </FormSection>

            <FormSection step="02" title="連絡先">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="会社名・店舗名" name="company">
                  <Input name="company" autoComplete="organization" />
                </Field>
                <Field label="お名前" name="name" required>
                  <Input name="name" required autoComplete="name" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="電話番号" name="phone" required>
                  <Input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
                </Field>
                <Field label="メールアドレス" name="email">
                  <Input name="email" type="email" autoComplete="email" inputMode="email" />
                </Field>
              </div>
              <Field label="希望の連絡手段" name="contactMethod">
                <ChoiceGroup name="contactMethod" options={["電話", "メール", "LINE"]} columns={3} />
              </Field>
              <Field label="ご要望・気になる汚れなど" name="message">
                <Textarea name="message" placeholder="例：トイレの臭いが気になる。閉店は24時、鍵はキーボックスで渡せます。" />
              </Field>
            </FormSection>

            <Note>
              いただいた情報は、お見積りとご連絡のためにのみ使用します。詳しくは<a href="/privacy" className="underline underline-offset-4">プライバシーポリシー</a>をご覧ください。
            </Note>
            <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
              <p className="text-[13px] text-muted">送信後、担当からご連絡します。営業時間内は原則30分以内に一次回答します。</p>
              <Button size="lg"><Icon name="doc" size={20} />この内容で現地確認を依頼する</Button>
            </div>
          </form>

          <aside className="grid gap-4 lg:sticky lg:top-24">
            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="text-[15px] font-bold text-heading">写真を送るほうが早い場合</p>
              <p className="mt-2 text-[13.5px] leading-[1.8] text-muted">汚れの状態と広さが分かる写真を数枚、LINEで送ってください。「できる・できない・提携業者を紹介する」と概算をお答えします。</p>
              <Button href={site.line.business} className="mt-4 w-full"><Icon name="line" size={18} />LINEで写真を送る</Button>
            </div>
            <div className="rounded-sm border border-line bg-bg p-5 text-[13.5px] leading-[1.8]">
              <p className="font-bold text-heading">お電話でも</p>
              <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num mt-1 block text-[20px] font-semibold text-ink">{site.tel}</a>
              <p className="text-muted">{site.hours}</p>
              <p className="mt-3 text-muted">メール：<a href={`mailto:${site.email.cleaning}`} className="num underline underline-offset-4">{site.email.cleaning}</a></p>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
