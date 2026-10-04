# 実装ブリーフ（ページ担当エージェント向け）

対象：株式会社OU警備保障のコーポレートサイト（Next.js 16 App Router / TypeScript / Tailwind v4）。
**必ず最初に読むファイル**：`src/content/site.ts`（会社の事実・連絡先・定義文）、`src/components/ui/primitives.tsx`、`src/components/ui/blocks.tsx`、`src/components/ui/form.tsx`、`src/lib/jsonld.tsx`、`src/lib/actions.ts`、そして**お手本ページ** `src/app/services/[slug]/page.tsx` と `src/app/page.tsx`。
Next.js 16 の注意：`params` は Promise（`await params`）。`node_modules/next/dist/docs/` が正。

## ページの型（必ずこの順）
1. `export const metadata: Metadata = { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path } }`（title は layout の template `%s｜株式会社OU警備保障` が付くので会社名を入れない。32字目安）
2. `<JsonLd data={[...]} />`（Service / FAQPage / BreadcrumbList / JobPosting など、`src/lib/jsonld.tsx` のヘルパーを使う）
3. `<Breadcrumbs items=[...] />`
4. `<PageHero eyebrow title lead chips>`（H1は1ページ1つ。検索語を含む名詞句。装飾英語はH要素にしない）
5. `<Section>` を積む（eyebrow は短い英語ラベル可：Scenes / Flow / FAQ など。title は日本語）
6. 最後に `<ContactBand variant=...>`（4号は variant="protect"、清掃は "clean"、採用は "recruit"）

## コンポーネント
- `primitives.tsx`：Container, Eyebrow, Section(tone="bg"|"surface"), Button(variant primary|secondary|ghost|engi, size sm|md|lg, href 外部/tel は自動で <a>), Chip, Note(title, tone), DefList(items)
- `blocks.tsx`：PageHero, StatTiles, FeatureCard(icon,title,body,href,meta), CardGrid(cols 2|3|4), Steps(items{title,body,note}), Faq(items{q,a}), ContactBand(title,lead,variant,formHref,formLabel,showLine,tel,lineHref,lineLabel,note), AreaDiagram(emphasis kumamoto|kyushu|japan), TwoColumnList(left,right), Breadcrumbs
- `form.tsx`：Field(label,name,required,hint), Input, Textarea, Select(options,placeholder), ChoiceGroup(name,options,type,columns), Honeypot, FormSection(step,title)
- `Icon.tsx`：name は cone baton road crowd earpiece broom home grass phone line mail arrow check clock pin doc shield-off plus menu close external users calendar report wallet car globe
- `Reveal.tsx`：Reveal（1回だけのフェード）, CountUp
- 新しいライブラリは追加しない。画像は使わない（写真は後日差し込む。`<figure>` の枠だけ置くなら `bg-surface aspect-[16/9]` のプレースホルダーに「撮影予定：◯◯」とキャプションで何を撮るかを書く）。絵文字・ストック写真・既製アイコン禁止。

## テーマ
- 2号／会社／お知らせ：デフォルト（白＋ネイビー見出し、CTAはアクションブルー、エンジ #9b2335 がアクセント）
- 4号：ページ最上位の要素に `data-theme="protect"`（ダーク面）。見出しに `font-serif`（Shippori Mincho）を限定使用可。LINEは出さない。写真は顔なし前提。
- 清掃：最上位に `data-theme="clean"`（温かい白面、緑アクセント）
- 採用：最上位に `data-theme="recruit"`（密度高め、CTA多め）
- ヘッダー・フッター・固定CTAは layout 側で自動。ページ側で作らない。

## フォーム
- `<form action={sendInquiry} data-hide-sticky className="grid gap-6">` ＋ `<input type="hidden" name="kind" value="guard|protection|protection-anonymous|cleaning|recruit" />` ＋ `<Honeypot />`。送信後は `/…/thanks` へ redirect される（thanks ページも作る：「◯時間以内に担当から連絡」＋電話＋LINE再提示）。
- 必須は最小限。フィールド名は `src/lib/actions.ts` の labels にあるものを使う（無いものは labels に追加してよい）。

## 文章ルール（全員）
- 一人称は「私たち」。「弊社は若い会社ですが」と言わない。数字は `site.ts` から取り、表記を統一（82名／32.6歳／第93000308号／2025年8月／2026年10月1日）。隊員数・年齢には `site.stats.asOf` を添える。
- 禁止語：アットホーム／やりがい／成長できる（採用のテンプレ語）、No.1／唯一／最安／絶対／100%／必ず。年齢制限表現（若手歓迎・20代限定）は不可。「平均年齢32.6歳」の事実表示のみ可。
- 4号の禁止語と置き換え：「SP／元SP」→「警護員」「身辺警護」（SPはFAQ「SPとボディガードの違い」で吸収）／「排除・制圧・取り押さえ・逮捕・撃退」→「危害の発生を未然に警戒・回避」「退避誘導」「警察への即時通報」／「武装・武器」→「公安委員会に届け出た護身用具のみ」／「調査・尾行・身元特定」→「調査は行わない（必要に応じ提携探偵業者を紹介）」／「交渉・示談・警告書」→「弁護士・警察への相談に同行」／「元○○部隊・特殊部隊」→「自衛隊出身者」まで／「女性隊員が必ず」→「ご希望により女性警護員の配置を調整（要相談）」。
- 料金：自社単価は書かない（「◯円〜」の空欄を置かず、「見積は無料・現場条件を確認後に書面で提示」とする）。2号は「公共工事設計労務単価（令和8年3月適用・熊本県 交通誘導警備員A 17,700円／B 15,500円）を基準に算定」と割増・内訳の考え方のみ。4号は「事例ごとの個別見積。2名体制が基本、交通・宿泊実費別、最低稼働1日」とし、業界相場（1名1日3.6〜5.4万円が中心帯）は「一般的な相場」として参考掲載可。
- 連絡先：電話 096-245-8550（site.tel）、警備・4号メール official_hp@ou-keibi.com、清掃メール official_hp_clean@ou-keibi.com、法人LINE site.line.business、採用LINE site.line.recruit。4号ページではLINEを出さない。

## 品質
- `npx tsc --noEmit` と `npx eslint src` を通してから報告。`"use client"` は本当に必要な部品だけ。
- スマホ幅で崩れない（grid は `sm:` で2列、`lg:` で3列）。長文は `max-w-[68ch]`。
- 担当外のファイルは触らない。共通部品に不足があれば、新しい部品を自分の担当フォルダ内に作る（共通ファイルは編集しない）。
