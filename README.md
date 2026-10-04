# OU警備保障 コーポレートサイト（ou-keibi.com）

Next.js 16（App Router）＋ TypeScript ＋ Tailwind CSS v4。2号警備（交通誘導・雑踏・道路規制）、4号警備（身辺警護）、OUクリーンサービス、採用の4領域を1サイトに統合。

## セットアップ

```bash
npm install
cp .env.example .env.local   # RESEND_API_KEY / MAIL_FROM を設定（未設定でもフォームは動き、内容はサーバーログに出る）
npm run dev                  # http://localhost:3000
npm run build && npm start   # 本番ビルドの確認
```

## 公開前にやること（チェックリスト）

1. **ロゴ**：`src/components/site/Logo.tsx` の `LogoMark` を正式ロゴ（SVG）に差し替え。`public/` にファビコン（`src/app/icon.svg` など）を置く。
2. **標識**：`src/content/site.ts` の `license.certifiedOn` / `validUntil` に認定年月日・有効期間を入れる（フッターと /legal に反映）。
3. **数字**：`site.stats`（隊員数・平均年齢・検定保持者・指導教育責任者）と `asOf` を確認。半年ごとに更新。
4. **実績**：`src/content/works.ts` の仮事例4件を実案件に差し替え（地震対応以外）。
5. **保険**：各ページの「賠償責任保険に加入」の表現を、実際の加入内容に合わせる（検索：`保険`）。
6. **料金**：自社単価を出す場合は `/pricing` と各サービスページの「料金の考え方」に追記。
7. **採用条件**：`src/content/recruit.ts` の日給・寮費・研修中給与・日払いの規定を Indeed／バイトルの掲載と一致させる。
8. **4号のコピー**：公開前に顧問弁護士の確認（警備業法・弁護士法・探偵業法・景表法）。
9. **メール送信**：Resend でドメイン認証（DNS）→ `RESEND_API_KEY` と `MAIL_FROM` を Vercel の環境変数に設定。受信先は `src/lib/actions.ts`（警備・4号→official_hp@、清掃→official_hp_clean@）。
10. **ドメイン**：Vercel プロジェクトに `www.ou-keibi.com` を追加し、DNS を切替。Search Console／Bing Webmaster に登録。Googleビジネスプロフィールの NAP（名称・住所・電話 096-245-8550）を一致させる。
11. **写真**：撮影後、`<figure>` のプレースホルダー（「撮影予定：…」）を `next/image` に差し替え。

## 構成

- `src/content/*.ts` — 文章・数字のデータ（site / services / protection / cleaning / recruit / news / works）。文章の修正はここ。
- `src/components/ui/*` — 共通部品（primitives / blocks / form / Icon / Reveal）
- `src/components/site/*` — Header / Footer / StickyCta / Logo
- `src/lib/jsonld.tsx` — 構造化データ（Organization / Service / FAQPage / JobPosting / BreadcrumbList / NewsArticle）
- `src/lib/actions.ts` — フォーム送信（Server Action、Resend）
- `src/app/**` — ページ。テーマは各ページ最上位の `data-theme="protect|clean|recruit"` で切替（`globals.css`）
- `docs/AGENT_BRIEF.md` — 実装ルール（文章・表現規制・テーマ）

## ローカルで Google Fonts に到達できない環境でのビルド

```bash
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=$(pwd)/scripts/font-mock.js npx next build --webpack
```
（本番の Vercel では不要）

## SEO / AI検索（AIO）— 公開直後にやること

実装済み：狙いの検索語をページに割り当て（下表）、コラム14本（/column）、用語集25語（/glossary、DefinedTermSet）、Article/FAQ/Service/JobPosting/Organization の構造化データ、/llms.txt（AI向けの事実ファイル）、robots.txt で AI クローラー許可、sitemap.xml。

| 検索語 | 受けるページ |
|---|---|
| 熊本 警備／熊本 警備会社 | `/`（title「熊本の警備会社｜…」）、`/services`、`/column/kumamoto-security-company-guide` |
| 熊本 交通誘導／交通誘導員 依頼 | `/services/traffic-control`、`/column/kumamoto-traffic-control-request` |
| 熊本 警備員／警備員 求人 熊本 | `/recruit/security`、`/recruit`、`/column/work-as-security-guard-kumamoto` |
| 4号警備 | `/protection`（H1「身辺警護（4号警備・ボディガード）」）、`/column/what-is-4go-keibi` |
| 身辺警護／ボディガード 費用 | `/protection`、`/column/bodyguard-cost-guide`、`/protection/*` |
| SP／SP 違い | `/column/sp-vs-bodyguard`（民間はSPを名乗れない、を正しく説明して検索意図を受ける） |
| セキュリティ（種類・違い） | `/column/security-types-1-to-4`、`/glossary` |

公開後、順番に：
1. **Google Search Console** にドメイン登録 → `https://www.ou-keibi.com/sitemap.xml` を送信。インデックス状況を1週間後に確認
2. **Bing Webmaster Tools** にも登録（Copilot／ChatGPT検索の供給源）
3. **Googleビジネスプロフィール**：カテゴリ「警備会社」、名称・住所・電話（096-245-8550）をサイトと完全一致、サービスに「交通誘導警備」「雑踏警備」「身辺警護」を登録、営業時間24時間、写真を追加、口コミ依頼を開始
4. **旧サイト（v0）からの切替**：ドメインを新プロジェクトへ。旧URLは `/` に着地（アンカー `#services` 等はサーバーに届かない）
5. 2〜4週間後：Search Console の「検索パフォーマンス」で表示回数の多いクエリを確認し、コラムの追加・見出しの調整を行う（`src/content/columns/*.ts` に追記するだけで公開できる）
6. 毎月：`site.ts` の数字（隊員数・検定保持者・asOf）を更新。ニュースを1本以上追加（稼働感はAI検索・SEO双方に効く）
7. 半年後：英語クエリ（`/en/bodyguard`）の表示回数を見て、英語ページ追加を判断
