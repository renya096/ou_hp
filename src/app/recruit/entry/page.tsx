import type { Metadata } from "next";
import { Section, Button, Note } from "@/components/ui/primitives";
import { PageHero, Breadcrumbs } from "@/components/ui/blocks";
import { Field, Input, Textarea, ChoiceGroup, Honeypot, FormSection } from "@/components/ui/form";
import { Icon } from "@/components/ui/Icon";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { sendInquiry } from "@/lib/actions";
import { site } from "@/content/site";
import { recruitFacts } from "@/content/recruit";

const path = "/recruit/entry";
const title = "応募フォーム（警備・清掃・警護員）";
const description = "株式会社OU警備保障の応募フォーム。警備スタッフ・清掃スタッフ・警護員、または「まず話を聞きたい」から選べます。履歴書不要。2営業日以内にLINEまたは電話でご連絡します。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
  robots: { index: false, follow: true },
};

const crumbs = [{ href: "/recruit", label: "採用情報" }, { href: path, label: "応募フォーム" }];

export default function RecruitEntryPage() {
  return (
    <div data-theme="recruit">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <PageHero
        eyebrow="Recruit — Entry"
        title="応募フォーム"
        lead="履歴書は不要です。分かる範囲で入力してください。2営業日以内にLINEまたは電話でご連絡し、カジュアル面談（私服OK・30分・オンライン可）の日程を決めます。"
        chips={["履歴書不要", "2営業日以内に連絡", ...recruitFacts.casualInterview]}
      >
        <Button href={site.line.recruit} variant="secondary"><Icon name="line" size={18} />フォームよりLINEが楽な方はこちら</Button>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <form action={sendInquiry} data-hide-sticky className="grid gap-6">
            <input type="hidden" name="kind" value="recruit" />
            <Honeypot />

            <FormSection step="01" title="希望の職種">
              <Field label="希望職種" name="job" required hint="決まっていなければ「まず話を聞きたい」で構いません">
                <ChoiceGroup name="job" options={["警備スタッフ（交通誘導・雑踏）", "清掃スタッフ", "警護員（身辺警護）", "まず話を聞きたい"]} columns={2} />
              </Field>
            </FormSection>

            <FormSection step="02" title="あなたについて">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="お名前" name="name" required>
                  <Input name="name" required autoComplete="name" />
                </Field>
                <Field label="ふりがな" name="furigana">
                  <Input name="furigana" autoComplete="off" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="電話番号" name="phone" required hint="LINEと同じ番号だと連絡が早いです">
                  <Input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
                </Field>
                <Field label="メールアドレス" name="email">
                  <Input name="email" type="email" autoComplete="email" inputMode="email" />
                </Field>
              </div>
              <Field label="お住まい（市区町村）" name="address" hint="現場の割り当てと、寮の要否の参考にします">
                <Input name="address" placeholder="例：熊本市東区／県外（福岡市）" autoComplete="address-level2" />
              </Field>
              <label className="flex cursor-pointer items-start gap-2.5 rounded-sm border border-line bg-bg px-3.5 py-3 text-[14.5px] has-[:checked]:border-action has-[:checked]:bg-accent-soft">
                <input type="checkbox" name="age" value="18歳以上であることを確認" required className="mt-1 h-4 w-4 accent-[var(--action)]" />
                <span>
                  18歳以上です<span className="num ml-1.5 rounded-sm bg-engi px-1.5 py-0.5 text-[10.5px] font-bold text-white">必須</span>
                  <span className="mt-0.5 block text-[12.5px] text-muted">警備業務は警備業法第14条により18歳以上の方に限られます。清掃スタッフ希望で18歳未満の方は、LINEからご相談ください。</span>
                </span>
              </label>
            </FormSection>

            <FormSection step="03" title="働き方の希望">
              <Field label="希望の働き方" name="workStyle" hint="週◯日・日勤／夜勤・曜日・時間帯など、自由に">
                <Textarea name="workStyle" placeholder="例：週4日、日勤のみ。土日は休みたい。／週3日、閉店後の2時間だけ。" className="min-h-[90px]" />
              </Field>
              <Field label="これまでの経験" name="experience" hint="警備・清掃に限らず、前職や経験を簡単に。未経験なら「未経験」でOK">
                <Textarea name="experience" placeholder="例：未経験。飲食店で3年。／施設警備2年。" className="min-h-[90px]" />
              </Field>
              <Field label="面談の希望日時" name="interviewDate" hint="候補を2〜3つ。「平日夜」「土曜午前」などでも構いません">
                <Input name="interviewDate" placeholder="例：10/8（水）19時以降、10/11（土）午前" />
              </Field>
              <Field label="質問・伝えておきたいこと" name="message">
                <Textarea name="message" placeholder="例：寮について詳しく知りたい。／警備と清掃の両方に興味がある。" />
              </Field>
            </FormSection>

            <Note>
              応募情報は採用選考とご連絡のためにのみ使用し、選考終了後は適切に廃棄します。詳しくは<a href="/privacy" className="underline underline-offset-4">プライバシーポリシー</a>をご覧ください。
            </Note>
            <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
              <p className="text-[13px] text-muted">送信後、2営業日以内にLINEまたは電話でご連絡します。</p>
              <Button size="lg"><Icon name="doc" size={20} />この内容で応募する</Button>
            </div>
          </form>

          <aside className="grid gap-4 lg:sticky lg:top-24">
            <div className="rounded-sm border border-line bg-surface p-5">
              <p className="text-[15px] font-bold text-heading">LINEのほうが早いです</p>
              <p className="mt-2 text-[13.5px] leading-[1.8] text-muted">「話を聞きたい」の一言で構いません。採用担当が返信し、面談の日程を決めます。</p>
              <Button href={site.line.recruit} className="mt-4 w-full"><Icon name="line" size={18} />採用LINEを開く</Button>
            </div>
            <div className="rounded-sm border border-line bg-bg p-5 text-[13.5px] leading-[1.8]">
              <p className="font-bold text-heading">お電話でも</p>
              <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num mt-1 block text-[20px] font-semibold text-ink">{site.tel}</a>
              <p className="text-muted">「採用の件で」とお伝えください。{site.hours}</p>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
