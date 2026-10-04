import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs } from "@/components/ui/blocks";
import { Field, Input, Textarea, Select, ChoiceGroup, Honeypot, FormSection } from "@/components/ui/form";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { sendInquiry } from "@/lib/actions";
import { site } from "@/content/site";
import { protection } from "@/content/protection";
import { LegalNote } from "../_components/shared";

const path = protection.contactPath;
const title = "身辺警護のご相談（法人・個人／匿名可）";
const description = "身辺警護のご相談フォーム。法人・団体の方は案件種別・日程・場所を、個人の方は匿名で安全に受け取れる連絡手段をご指定ください。営業時間内は原則2時間以内に一次回答。LINEは使いません。緊急時は110番へ。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
  robots: { index: false, follow: true },
};

const crumbs = [{ href: protection.path, label: "身辺警護" }, { href: path, label: "ご相談" }];
const tel = `tel:${site.tel.replace(/-/g, "")}`;

export default function ProtectionContactPage() {
  return (
    <div data-theme="protect" className="bg-bg">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <PageHero
        eyebrow="Contact — 身辺警護のご相談"
        title={<span className="font-serif font-medium">身辺警護のご相談</span>}
        lead="法人・団体の方と、個人の方で、お聞きする内容が異なります。該当するフォームからお送りください。相談だけで終わっても構いません。送信内容は担当者のみが確認し、第三者に提供することはありません。"
        chips={[protection.responseNote, "個人の方は匿名可", "LINEは使いません", "緊急時は110番へ"]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#corporate" className="inline-flex min-h-[46px] items-center gap-2 rounded-sm border border-line px-5 text-[15px] font-bold text-ink hover:border-ink"><Icon name="report" size={18} className="text-accent" />法人・団体の方のフォームへ</a>
          <a href="#personal" className="inline-flex min-h-[46px] items-center gap-2 rounded-sm border border-line px-5 text-[15px] font-bold text-ink hover:border-ink"><Icon name="home" size={18} className="text-accent" />個人の方のフォームへ</a>
        </div>
        <p className="mt-5 text-[13.5px] text-muted">お電話でのご相談：<a href={tel} className="num font-semibold text-ink underline underline-offset-4">{site.telDisplay}</a>（24時間受付。夜間・休日は折り返しのご連絡になる場合があります）</p>
        <LegalNote className="mt-3" />
      </PageHero>

      {/* A. 法人・団体 */}
      <Section id="corporate" eyebrow="A — Corporate" title="法人・団体の方" lead="企業・医療機関・士業・自治体・芸能事務所・イベント主催者の方はこちら。NDAをご希望の場合は、相談の段階から締結できます。">
        <form action={sendInquiry} data-hide-sticky className="grid gap-6">
          <input type="hidden" name="kind" value="protection" />
          <Honeypot />
          <FormSection step="01" title="ご所属とご連絡先">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="会社名・団体名" name="organization" required><Input name="organization" required autoComplete="organization" placeholder="株式会社◯◯／◯◯クリニック／◯◯法律事務所" /></Field>
              <Field label="部署・役職" name="department"><Input name="department" autoComplete="organization-title" placeholder="総務部／人事部／マネージャー" /></Field>
              <Field label="お名前" name="name" required><Input name="name" required autoComplete="name" /></Field>
              <Field label="電話番号" name="phone" required><Input name="phone" type="tel" required autoComplete="tel" inputMode="tel" /></Field>
              <Field label="メールアドレス" name="email" required className="sm:col-span-2"><Input name="email" type="email" required autoComplete="email" inputMode="email" /></Field>
            </div>
          </FormSection>
          <FormSection step="02" title="ご相談の内容">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="案件の種別" name="caseType" required className="sm:col-span-2"><Select name="caseType" required options={protection.form.corporateCaseTypes} placeholder="選択してください" /></Field>
              <Field label="希望日程" name="date" hint="決まっていなければ「未定」や「◯月中」で構いません"><Input name="date" placeholder="2026年11月20日（1日）／11月中旬〜下旬" /></Field>
              <Field label="場所" name="place" hint="都道府県・市区町村、会場名が分かれば"><Input name="place" placeholder="熊本市中央区 ◯◯ホール／東京都港区 本社" /></Field>
              <Field label="想定人数" name="people" hint="警護対象者の人数、来場者・参加者の見込み" className="sm:col-span-2"><Input name="people" placeholder="対象者2名、来場見込み300名" /></Field>
            </div>
            <ChoiceGroup name="nda" type="checkbox" columns={1} options={["NDA（秘密保持契約）の締結を希望する"]} />
          </FormSection>
          <FormSection step="03" title="ご連絡の方法と補足">
            <Field label="希望する連絡手段" name="contactMethod" required>
              <ChoiceGroup name="contactMethod" options={protection.form.contactMethods} columns={3} />
            </Field>
            <Field label="状況・ご質問" name="message" hint="経緯、相手方の有無、これまでの警察・弁護士への相談状況など。分かる範囲で構いません。相手方の氏名などの個人情報は、この段階では不要です。">
              <Textarea name="message" rows={6} />
            </Field>
          </FormSection>
          <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
            <p className="text-[12.5px] leading-[1.7] text-muted">送信により<Link href="/privacy" className="underline underline-offset-4">プライバシーポリシー</Link>に同意したものとします。送信内容は担当者のみが確認します。</p>
            <Button size="lg" className="sm:shrink-0"><Icon name="doc" size={20} />この内容で相談する</Button>
          </div>
        </form>
      </Section>

      {/* B. 個人（匿名可） */}
      <Section id="personal" tone="surface" eyebrow="B — Personal" title="個人の方（匿名可）" lead="お名前は任意です。安全に受け取れる連絡手段と時間帯をご指定ください。ご指定の方法以外でご連絡することはありません。">
        <div className="mb-6 grid gap-3 md:grid-cols-2">
          <Note title="身の危険が差し迫っている場合" tone="accent">
            まず<a href="tel:110" className="num mx-1 font-bold text-ink underline underline-offset-4">110番</a>へ通報してください。私たちは警察の代わりにはなれず、緊急の駆けつけはお約束できません。
          </Note>
          <Note title="LINEでのご相談は受け付けていません">
            LINEは共有端末や第三者に見られるおそれがあるため、個人のご相談にはおすすめしていません。このフォームか、お電話をご利用ください。
          </Note>
        </div>
        <form action={sendInquiry} data-hide-sticky className="grid gap-6">
          <input type="hidden" name="kind" value="protection-anonymous" />
          {/* 法人フォームの Honeypot と id が重複しないよう、同じ name のまま id を変えて置く */}
          <div className="hidden" aria-hidden="true"><label htmlFor="website-personal">Website</label><input id="website-personal" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <FormSection step="01" title="ご連絡の受け取り方">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="お名前（ニックネーム可）" name="personal-name"><Input id="personal-name" name="name" autoComplete="off" placeholder="空欄のままでも構いません" /></Field>
              <Field label="お住まいの地域" name="area" required hint="市区町村まで。番地は不要です"><Input name="area" required autoComplete="off" placeholder="熊本市東区／福岡市博多区" /></Field>
              <Field label="安全に受け取れる連絡手段" name="contact" required hint="捨てアドレス可。電話の場合は番号と「非通知でかけてほしい」などの希望も" className="sm:col-span-2">
                <Input name="contact" required autoComplete="off" placeholder="例：xxxx@example.com／090-xxxx-xxxx（平日昼のみ）" />
              </Field>
              <Field label="連絡してよい時間帯" name="contactTime" required className="sm:col-span-2">
                <ChoiceGroup name="contactTime" options={protection.form.contactTimes} columns={3} />
              </Field>
            </div>
          </FormSection>
          <FormSection step="02" title="状況">
            <Field label="急ぎの度合い" name="urgency" required>
              <ChoiceGroup name="urgency" options={protection.form.urgencies} columns={3} />
            </Field>
            <Field label="いま困っていること" name="situation" hint="相手との関係（元交際相手・知人・不明など）、いつから、どんなことがあったか。書ける範囲で構いません。相手の氏名は不要です。">
              <Textarea name="situation" rows={5} />
            </Field>
            <Field label="希望すること・ご質問" name="personal-message" hint="通勤に同行してほしい、引越しに立ち会ってほしい、まず話を聞いてほしい、費用を知りたい、など">
              <Textarea id="personal-message" name="message" rows={4} />
            </Field>
          </FormSection>
          <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
            <p className="text-[12.5px] leading-[1.7] text-muted">送信により<Link href="/privacy" className="underline underline-offset-4">プライバシーポリシー</Link>に同意したものとします。ご契約の際には本人確認を行います。</p>
            <Button size="lg" className="sm:shrink-0"><Icon name="doc" size={20} />この内容で相談する</Button>
          </div>
        </form>
      </Section>

      <div className="border-t border-line bg-bg">
        <Container className="flex flex-col gap-2 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{protection.responseNote}。{site.hours}</p>
          <p className="num">{protection.legalName}</p>
        </Container>
      </div>
    </div>
  );
}
