import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Button, Eyebrow } from "@/components/ui/primitives";
import { StatTiles, FeatureCard, CardGrid, Steps, ContactBand, AreaDiagram, Marquee } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Kinetic } from "@/components/ui/Reveal";
import { site, definitions } from "@/content/site";
import { guardServices, guardFlow } from "@/content/services";
import { works } from "@/content/works";
import { news } from "@/content/news";
import { columns } from "@/content/columns";

export const metadata: Metadata = {
  title: { absolute: "熊本の警備会社｜交通誘導・雑踏警備・身辺警護（4号）｜株式会社OU警備保障" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featuredWorks = ["earthquake-2026", "house-maker-sites", "lifeline-emergency-works"].map((slug) => works.find((w) => w.slug === slug)!).filter(Boolean);
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* 1. ヒーロー（A案：文字が主役）：見出し → 電話 → 事実 */}
      <section className="relative border-b border-line bg-bg">
        <Container className="relative pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
          <Eyebrow><span>Kumamoto · Security · Since 2025 · Lic. 93000308</span></Eyebrow>
          <div className="mt-6 grid gap-7 lg:mt-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-x-12 lg:gap-y-8 lg:[grid-template-areas:'h1_h1'_'lead_tel'_'act_facts']">
            <Kinetic
              as="h1"
              className="text-[42px] font-black leading-[1.06] tracking-[-0.035em] sm:text-[72px] lg:text-[112px] lg:[grid-area:h1]"
              lines={[{ text: "頼んだ翌日、" }, { text: "そこにいる。", accent: true }]}
            />
            {/* 電話：PCは見出し右下にカード、スマホは見出し直下に1行の控えめなピル */}
            <a href={`tel:${site.tel.replace(/-/g, "")}`} className="group flex items-center gap-3 rounded-full border-[1.5px] border-navy bg-card px-4 py-2.5 text-ink transition-colors hover:bg-surface lg:grid lg:gap-1 lg:self-end lg:rounded-[18px] lg:px-6 lg:py-5 lg:[grid-area:tel]">
              <Icon name="phone" size={18} className="shrink-0 text-engi lg:hidden" />
              <span className="num hidden text-[12px] font-bold tracking-[0.06em] text-engi lg:block">電話で今すぐ相談 — 24時間受付</span>
              <span className="num text-[19px] font-black leading-none tracking-[-0.01em] text-navy sm:text-[22px] lg:text-[38px]">{site.telDisplay}</span>
              <span className="num ml-auto text-[11px] text-muted lg:hidden">24時間受付</span>
              <span className="hidden text-[11.5px] leading-[1.6] text-muted lg:block">緊急対応可。営業時間内は原則30分以内に一次回答します。</span>
            </a>
            <Reveal delay={400} className="max-w-[44ch] text-[15.5px] leading-[1.9] text-ink sm:text-[17px] lg:[grid-area:lead]">
              <p>{site.taglineSub}</p>
            </Reveal>
            <Reveal delay={550} className="flex flex-wrap gap-3 lg:[grid-area:act]">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">見積を依頼する <Icon name="arrow" size={18} /></Button>
              <Button href={site.line.business} variant="secondary" size="lg" className="w-full sm:w-auto"><Icon name="line" size={20} />LINEで相談</Button>
            </Reveal>
            <Reveal delay={650} className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 lg:[grid-area:facts] lg:self-end">
              {[
                { v: String(site.stats.guards), l: "在籍隊員" },
                { v: String(site.stats.averageAge), l: "平均年齢" },
                { v: "24/365", l: "受付・緊急対応" },
                { v: `${site.stats.certified2}+${site.stats.certified2Planned}`, l: "検定2級（年内）" },
              ].map((f) => (
                <div key={f.l} className="border-t-[1.5px] border-ink/80 pt-2.5">
                  <p className="num text-[28px] font-black leading-none tracking-[-0.03em] text-heading sm:text-[34px]">{f.v}</p>
                  <p className="mt-1 text-[12px] text-muted">{f.l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <Marquee items={["交通誘導警備", "雑踏・イベント警備", "高速道路・一般道路の規制", "身辺警護（4号）— 2026.10.01 開始", "OUクリーンサービス", site.license.label]} />

      {/* 2. 信頼バー */}
      <div className="border-b border-line bg-bg">
        <Container>
          <ul className="grid grid-cols-2 divide-line text-[13px] sm:grid-cols-4 sm:divide-x">
            {[
              { k: "認定", v: site.license.label },
              { k: "対応エリア", v: "熊本県全域（県外もご相談を）" },
              { k: "受付", v: "24時間365日・緊急対応可" },
              { k: "設立・体制", v: `${site.founded}設立・隊員${site.stats.guards}名` },
            ].map((it) => (
              <li key={it.k} className="px-4 py-3 first:pl-0 sm:px-6"><span className="block text-[11.5px] text-muted">{it.k}</span><span className="num block font-semibold text-ink">{it.v}</span></li>
            ))}
          </ul>
        </Container>
      </div>

      {/* 定義文（AI検索・SEO用の明文） */}
      <Section narrow eyebrow="About" title={<>{site.shortName}とは</>} lead={definitions.company}>
        <StatTiles items={[
          { value: site.stats.guards, suffix: "名", label: "在籍隊員（2号）" },
          { value: site.stats.averageAge, decimals: 1, suffix: "歳", label: "平均年齢" },
          { value: site.stats.certified2, suffix: "名", label: "交通誘導検定2級", note: `年内に＋${site.stats.certified2Planned}名取得予定` },
          { value: site.stats.protectionTeam, suffix: "名", label: "身辺警護チーム", note: "自衛隊出身者を中心に" },
        ]} />
      </Section>

      {/* 3. 選ばれる理由 */}
      <Section tone="surface" eyebrow="Why OU" title="若い会社が、選ばれている理由" lead="設立1年強で82名。歴史の代わりに、仕組みと人と行動基準で信頼をつくっています。">
        <CardGrid cols={3}>
          <FeatureCard icon="users" title="若さ × 教育体制" body={`平均年齢${site.stats.averageAge}歳。警備業法に基づく新任・現任教育を自社で実施し、指導教育責任者${site.stats.instructors}名が配置計画と現場指導にあたります。`} href="/company/education" />
          <FeatureCard icon="clock" title="即応配置。1名・1日から" body="夜間・当日・翌日の現場、少人数の作業にも対応。営業時間内はLINE・電話に原則30分以内に一次回答します。" href="/services/traffic-control" />
          <FeatureCard icon="report" title="自社システムで出退勤・報告が速い" body="配置・出退勤・報告を自社開発のシステムで管理。欠員が出にくく、現場の報告が当日中に届きます。" href="/company" />
        </CardGrid>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["無断で配置を変更しません", "見積後の追加請求はしません", "営業時間内の連絡は原則30分以内に返します"].map((t) => (
            <p key={t} className="flex items-start gap-2 text-[14px] text-ink"><Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />{t}</p>
          ))}
        </div>
      </Section>

      {/* 4. 警備サービス（2号） */}
      <Section eyebrow="Services" title="警備サービス（2号警備）" lead={definitions.guard}>
        <CardGrid cols={3}>
          {guardServices.map((s) => <FeatureCard key={s.slug} icon={s.icon} title={s.name} body={s.short} href={s.path} />)}
        </CardGrid>
        <div className="mt-6 flex flex-wrap gap-4 text-[14px] font-bold text-action">
          <Link href="/services" className="inline-flex items-center gap-1">サービス一覧 <Icon name="arrow" size={16} /></Link>
          <Link href="/pricing" className="inline-flex items-center gap-1">料金の考え方 <Icon name="arrow" size={16} /></Link>
        </div>
      </Section>

      {/* 5. 対応エリア */}
      <Section tone="surface" eyebrow="Area" title="対応エリア" lead="交通誘導・雑踏・道路規制・清掃は熊本県全域。身辺警護は九州全域と、東京・大阪を含む全国に出張対応します。">
        <AreaDiagram emphasis="kumamoto" />
      </Section>

      {/* 6. 流れ＋料金 */}
      <Section eyebrow="Flow" title="ご依頼から配置までの流れ" lead="お見積りは無料。契約前には警備業法に基づく書面でご説明します。">
        <Steps items={guardFlow} />
        <div className="mt-10 rounded-sm border border-line bg-surface p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-[16px] font-bold text-heading">料金の考え方を公開しています</p>
            <p className="mt-1 text-[14px] text-muted">基準単価は交通誘導警備員B 17,000円〜／A（検定資格者）19,400円〜（1名1日・日中8時間の目安）。公共工事設計労務単価（熊本県）を基準に、人数・時間帯・資格者配置で算定します。</p>
          </div>
          <Button href="/pricing" variant="secondary" className="mt-4 shrink-0 sm:mt-0">料金の考え方 <Icon name="arrow" size={16} /></Button>
        </div>
      </Section>

      {/* 7. 実績 */}
      <Section tone="surface" eyebrow="Works" title="実績・対応事例" lead="令和8年熊本地震の緊急警備をはじめ、道路・イベント・商業施設での対応事例です（発注者は匿名）。">
        <CardGrid cols={3}>
          {featuredWorks.map((w) => <FeatureCard key={w.slug} icon={w.icon} meta={w.category} title={w.title} body={w.summary} href={`/works#${w.slug}`} />)}
        </CardGrid>
        <div className="mt-6"><Link href="/works" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">すべての実績を見る <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* 8. 身辺警護バンド（ダーク） */}
      <section data-theme="protect" className="bg-bg py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <Eyebrow className="mb-4">Protection — 2026.10.01 開始</Eyebrow>
            <h2 className="font-serif text-[32px] font-medium leading-[1.3] sm:text-[44px]">身辺警護（4号警備）を<br className="hidden sm:block" />開始しました。</h2>
            <p className="mt-6 max-w-[46ch] text-[15.5px] leading-[1.9] text-muted">株主総会・不当要求・退職トラブルなどの企業の危機対応から、出演者の随行と会場警備を一体で行うイベントまで。自衛隊出身者を中心とする警護員{site.stats.protectionTeam}名が、熊本を拠点に全国で対応します。個人の方の匿名相談もお受けしています。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/protection" size="lg">身辺警護について <Icon name="arrow" size={18} /></Button>
              <Button href="/protection/contact" variant="secondary" size="lg">相談する（匿名可）</Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {[
                { t: "企業・医療機関・士業", d: "株主総会、不当要求、カスハラ、退職トラブルの当事者対応" , href: "/protection/corporate" },
                { t: "クリエイター・イベント", d: "出演者の随行（4号）と会場の雑踏（2号）をひとつのチームで", href: "/protection/creators" },
                { t: "個人の方", d: "つきまとい・脅迫。通勤・引越し・裁判所への同行。匿名相談可", href: "/protection/personal" },
                { t: "English", d: "Executive protection for visiting executives and VIPs. English support.", href: "/en/bodyguard" },
              ].map((c) => (
                <li key={c.t}><Link href={c.href} className="block h-full bg-surface p-5 hover:bg-surface-2"><p className="text-[15px] font-bold text-heading">{c.t}</p><p className="mt-1 text-[13.5px] leading-[1.7] text-muted">{c.d}</p></Link></li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 9. クリーンサービス */}
      <section data-theme="clean" className="bg-surface py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow className="mb-3">OU Clean Service</Eyebrow>
            <h2 className="text-[30px] font-black leading-[1.2] tracking-[-0.02em] sm:text-[40px]"><span className="inline-block">営業が終わった店に、</span><span className="inline-block">朝いちばんの気持ちよさを。</span></h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.9] text-muted">飲食店・店舗の日常清掃と定期清掃、ショッピングセンターの館内清掃、民泊のチェックアウトごとの清掃、草刈り・テント設営まで。警備で培った深夜・早朝の勤務体制で、営業時間を邪魔しない時間に伺います。</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/cleaning" size="lg">クリーンサービスについて <Icon name="arrow" size={18} /></Button>
              <Button href="/cleaning/contact" variant="secondary" size="lg">無料で現地確認を依頼</Button>
            </div>
          </div>
          <CardGrid cols={2}>
            <FeatureCard icon="broom" title="店舗・飲食店" body="日常清掃・定期清掃。閉店後の深夜作業に対応。" href="/cleaning/store" />
            <FeatureCard icon="home" title="民泊・ゲストハウス" body="チェックアウトごとの清掃、リネン、写真報告。" href="/cleaning/minpaku" />
            <FeatureCard icon="grass" title="草刈り・テント設営" body="空き地・店舗周りの除草、イベントのテント設営。" href="/cleaning/outdoor" />
            <FeatureCard icon="report" title="警備と同時発注" body="商業施設・イベントで警備と清掃の窓口を一本化。" href="/cleaning" />
          </CardGrid>
        </Container>
      </section>

      {/* 10. 会社・隊員データ */}
      <Section eyebrow="Company" title="人を育て、地域を守る。" lead="自衛隊出身者が立ち上げた会社です。規律・時間厳守・報告を大切にしながら、若い隊員が力を発揮できる仕組みをつくっています。">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-3">
            {site.principles.map((p, i) => (
              <div key={p.title} className="grid grid-cols-[44px_1fr] gap-3 rounded-sm border border-line bg-bg p-4">
                <span className="num text-[13px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div><p className="text-[15px] font-bold text-heading">{p.title}</p><p className="mt-0.5 text-[13.5px] text-muted">{p.body}</p></div>
              </div>
            ))}
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="num text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">One for U</p>
            <p className="mt-3 text-[15.5px] leading-[1.9] text-ink">「あなたのために」。現場のご担当者のために、守られる方のために、そして隊員ひとりひとりのために。私たちは、設立1年の若い会社です。歴史の代わりに、毎日の配置と報告、教育の時間、そして「しないこと」の約束で信頼を積み重ねます。</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-[13.5px]">
              <div><dt className="text-muted">設立</dt><dd className="num font-semibold">{site.founded}</dd></div>
              <div><dt className="text-muted">認定</dt><dd className="num font-semibold">{site.license.number}</dd></div>
              <div><dt className="text-muted">所在地</dt><dd className="font-semibold">熊本市中央区本荘</dd></div>
              <div><dt className="text-muted">指導教育責任者</dt><dd className="num font-semibold">{site.stats.instructors}名（年内＋{site.stats.instructorsPlanned}名）</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-4 text-[14px] font-bold text-action">
              <Link href="/company" className="inline-flex items-center gap-1">会社概要 <Icon name="arrow" size={16} /></Link>
              <Link href="/company/education" className="inline-flex items-center gap-1">教育・品質体制 <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 10.5 コラム（SEO／AI検索の入口） */}
      <Section eyebrow="Column" title="発注する前に、知っておきたいこと" lead="熊本の警備会社として、交通誘導の手配と料金、4号警備（身辺警護）とSPの違い、警備員の働き方を、警備業法と現場の実務に基づいて解説しています。">
        <CardGrid cols={3}>
          {columns.filter((c) => ["kumamoto-security-company-guide", "what-is-4go-keibi", "kumamoto-traffic-control-request"].includes(c.slug)).map((c) => (
            <FeatureCard key={c.slug} icon={c.icon} meta={c.category} title={c.title} body={c.description} href={`/column/${c.slug}`} />
          ))}
        </CardGrid>
        <div className="mt-6 flex flex-wrap gap-4 text-[14px] font-bold text-action">
          <Link href="/column" className="inline-flex items-center gap-1">コラム一覧 <Icon name="arrow" size={16} /></Link>
          <Link href="/glossary" className="inline-flex items-center gap-1">警備業の用語集 <Icon name="arrow" size={16} /></Link>
        </div>
      </Section>

      {/* 11. ニュース */}
      <Section tone="surface" eyebrow="News" title="お知らせ">
        <ul className="divide-y divide-line border-y border-line">
          {latestNews.map((n) => (
            <li key={n.slug}>
              <Link href={`/news/${n.slug}`} className="grid gap-1 py-4 sm:grid-cols-[120px_90px_1fr] sm:items-baseline sm:gap-4 hover:text-action">
                <time dateTime={n.date} className="num text-[13px] text-muted">{n.date.replace(/-/g, ".")}</time>
                <span className="text-[12px] font-semibold text-accent">{n.category}</span>
                <span className="text-[15px] font-semibold text-ink">{n.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6"><Link href="/news" className="inline-flex items-center gap-1 text-[14px] font-bold text-action">お知らせ一覧 <Icon name="arrow" size={16} /></Link></div>
      </Section>

      {/* 12. 採用バンド */}
      <section data-theme="recruit" className="bg-bg py-16 sm:py-20">
        <Container className="grid gap-8 rounded-sm border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow className="mb-3">Recruit</Eyebrow>
            <h2 className="text-[30px] font-black leading-[1.2] tracking-[-0.02em] sm:text-[40px]">家から現場へ。現場から家へ。<br className="hidden sm:block" />会社に寄る必要はありません。</h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.9] text-muted">出退勤はLINEで報告、日払いもLINEから申請して当日中に振込。日給10,000円〜、社会保険あり、資格取得は会社が支援します。隊員{site.stats.guards}名の平均年齢は{site.stats.averageAge}歳。警備の経験がない人のほうが多い会社です。</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/recruit" size="lg">採用情報を見る <Icon name="arrow" size={18} /></Button>
              <Button href={site.line.recruit} variant="secondary" size="lg"><Icon name="line" size={20} />LINEで「話を聞きたい」と送る</Button>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-[13.5px]">
            {[["直行直帰", "car"], ["LINEで出退勤", "line"], ["日払い申請・当日振込", "wallet"], ["社会保険あり", "check"], ["資格取得を支援", "doc"], ["寮あり（遠方の方）", "home"]].map(([t, ic]) => (
              <li key={t} className="flex items-center gap-2 rounded-sm border border-line bg-bg px-3 py-2.5 font-semibold text-ink"><Icon name={ic as "car"} size={18} className="text-accent" />{t}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 13. お問い合わせ */}
      <ContactBand
        title="お見積り・ご相談は24時間受け付けています"
        lead="現場の種類・場所・期間・人数をお知らせください。営業時間内は原則30分以内に一次回答し、お見積りは営業日内24時間以内にお届けします。"
        note={<>身辺警護のご相談は<Link href="/protection/contact" className="underline underline-offset-4">専用フォーム（匿名可）</Link>へ。清掃のご相談は<Link href="/cleaning/contact" className="underline underline-offset-4">こちら</Link>。</>}
      />
    </>
  );
}
