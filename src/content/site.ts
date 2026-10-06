/**
 * 会社の事実データ。サイト全体で同じ表記・同じ数字を使う（AI検索での事実抽出精度のため）。
 * 数字を更新するときはここだけを変える。
 */
export const site = {
  name: "株式会社OU警備保障",
  shortName: "OU警備保障",
  englishName: "OU Security Co., Ltd.",
  url: "https://www.ou-keibi.com",
  slogan: "One for U（あなたのために）",
  mission: "人を育て、地域を守る",
  tagline: "頼んだ翌日、そこにいる。",
  taglineSub: "急な現場、夜間工事、1名だけの作業。熊本県全域に24時間365日、営業時間内は原則30分以内に一次回答。82名の若い隊が、仕組みで翌日に間に合わせます。",
  founded: "2025年8月",
  foundedISO: "2025-08",
  licenseStarted: "2025年11月",
  license: {
    authority: "熊本県公安委員会",
    number: "第93000308号",
    label: "熊本県公安委員会認定 第93000308号",
    // 標識（警備業法第6条・別記様式第2号）の記載事項。認定の有効期間は5年
    certifiedOn: "令和7年11月12日",
    certifiedOnISO: "2025-11-12",
    validFrom: "令和7年11月12日",
    validUntil: "令和12年11月11日",
    validUntilISO: "2030-11-11",
    /** 標識の所在地欄（主たる営業所）。様式どおり漢数字表記 */
    addressOnSign: "熊本市中央区本荘六丁目10－15",
    categories: ["2号（交通誘導警備・雑踏警備）", "4号（身辺警備）"],
  },
  /** 単価。labor は国交省の公共工事設計労務単価（熊本県・令和8年3月適用、事実）。base は当社の基準単価の目安（1名1日・日中8時間、条件により変動） */
  rates: {
    laborLabel: "令和8年3月適用 公共工事設計労務単価（熊本県）",
    laborA: 17700,
    laborB: 15500,
    baseA: 19400,
    baseB: 17000,
  },
  /** 加入団体 */
  memberships: [
    { name: "一般社団法人熊本県警備業協会", url: "https://www.kssa.or.jp/" },
    { name: "熊本県セキュリティ協同組合", url: "https://kumamoto-security.jp/" },
  ],
  /** 待機所・拠点 */
  bases: [
    { name: "本社（熊本市中央区本荘）", role: "主たる営業所" },
    { name: "八代待機所（八代市）", role: "県南・令和8年熊本地震の復旧工事エリアへの配置拠点。休憩・待機に使用" },
  ],
  address: {
    postal: "860-0811",
    region: "熊本県",
    locality: "熊本市中央区",
    street: "本荘6丁目10-15",
    full: "〒860-0811 熊本県熊本市中央区本荘6丁目10-15",
  },
  tel: "096-245-8550",
  telDisplay: "096-245-8550",
  mobile: "080-7989-3899",
  fax: "050-3145-8083",
  email: {
    security: "official_hp@ou-keibi.com",
    cleaning: "official_hp_clean@ou-keibi.com",
    general: "support@ou-keibi.com",
  },
  line: {
    business: "https://lin.ee/nYttERZ",
    recruit: "https://lin.ee/dpG3GJ5",
  },
  stats: {
    asOf: "2026年10月時点",
    guards: 82,
    averageAge: 32.6,
    protectionTeam: 8,
    cleaningStaff: 10,
    certified2: 5,
    certified2Planned: 5, // 年内取得予定
    instructors: 2,
    instructorsPlanned: 2,
    capital: "300万円",
  },
  hours: "24時間365日受付（夜間・休日は折り返しのご連絡になる場合があります）",
  area: {
    guard: "熊本県全域（県外もご相談ください）",
    protection: "熊本・九州全域、東京・大阪を含む全国（出張対応）",
    cleaning: "熊本市および近郊",
  },
  protectionStart: "2026年10月1日",
  protectionStartISO: "2026-10-01",
  representative: "瀬戸口 了哉",
  principles: [
    { title: "安全第一", body: "どんな現場でも、人の安全を最優先に判断します。" },
    { title: "誠実対応", body: "できること・できないことを正直に伝え、約束したことを守ります。" },
    { title: "わかりやすい誘導", body: "大きく、はっきり、ゆっくり。歩行者にもドライバーにも伝わる合図を。" },
    { title: "気配りの心", body: "現場の周囲、近隣、お客様のお客様まで目を配ります。" },
    { title: "信頼の積み重ね", body: "一日一日の報告と改善が、次のご依頼につながると考えています。" },
  ],
} as const;

export const nav = [
  { href: "/services", label: "警備サービス" },
  { href: "/protection", label: "身辺警護" },
  { href: "/cleaning", label: "クリーンサービス" },
  { href: "/company", label: "会社案内" },
  { href: "/column", label: "コラム" },
  { href: "/recruit", label: "採用情報" },
] as const;

export const footerLinks = {
  services: [
    { href: "/services/traffic-control", label: "交通誘導警備" },
    { href: "/services/crowd-control", label: "イベント・雑踏警備" },
    { href: "/services/road-regulation", label: "高速道路・一般道路の規制" },
    { href: "/pricing", label: "料金の考え方" },
    { href: "/works", label: "実績・対応事例" },
    { href: "/faq", label: "よくあるご質問" },
  ],
  protection: [
    { href: "/protection", label: "身辺警護（4号）" },
    { href: "/protection/corporate", label: "企業・医療機関・士業の方へ" },
    { href: "/protection/creators", label: "クリエイター・イベントの方へ" },
    { href: "/protection/personal", label: "個人の方へ" },
    { href: "/en/bodyguard", label: "English" },
  ],
  cleaning: [
    { href: "/cleaning", label: "OUクリーンサービス" },
    { href: "/cleaning/store", label: "店舗・飲食店の清掃" },
    { href: "/cleaning/minpaku", label: "民泊の清掃" },
    { href: "/cleaning/outdoor", label: "草刈り・テント設営" },
  ],
  company: [
    { href: "/company", label: "会社概要" },
    { href: "/company/education", label: "教育・品質体制" },
    { href: "/news", label: "お知らせ" },
    { href: "/column", label: "警備コラム" },
    { href: "/glossary", label: "警備業の用語集" },
    { href: "/recruit", label: "採用情報" },
    { href: "/contact", label: "お見積り・ご相談" },
    { href: "/legal", label: "警備業に関する表示" },
    { href: "/privacy", label: "プライバシーポリシー" },
  ],
} as const;

/** AIが引用しやすい「定義文」。各ページ冒頭・会社概要・構造化データで同じ文を使う。 */
export const definitions = {
  company: `${site.name}は、熊本県熊本市中央区本荘に本社を置く警備会社です。${site.founded}に設立し、${site.license.label}を受けて、交通誘導警備・雑踏警備・道路規制業務（警備業法第2条第1項第2号）と身辺警護業務（同第4号）を行っています。また、OUクリーンサービスの名称で店舗・施設・民泊の清掃業務を提供しています。警備員は${site.stats.guards}名（${site.stats.asOf}）、平均年齢は${site.stats.averageAge}歳です。コンセプトは「${site.slogan}」、ミッションは「${site.mission}」です。`,
  guard: `${site.shortName}の交通誘導警備（2号警備）は、熊本県全域の建設工事・道路工事・イベント会場で、歩行者と車両の安全な通行を確保する警備業務です。交通誘導警備業務検定2級の資格者が在籍し、高速道路や国道での規制業務にも対応します。24時間365日、夜間工事や緊急の要請にも対応します。主なお客様は建設会社、土木・舗装・電気・ガス・水道などの工事業者、イベント主催者、自治体です。`,
  protection: `${site.shortName}の身辺警護（ボディガード）は、警備業法第2条第1項第4号に定める「人の身体に対する危害の発生を、その身辺において警戒し、防止する業務」です。${site.protectionStart}にサービスを開始し、自衛隊出身者を含む警護員${site.stats.protectionTeam}名が、熊本を拠点に東京・大阪を含む全国で対応します。企業の役員・従業員、医療機関・士業、芸能人・クリエイター（YouTuber、配信者など）、訪日VIP、ストーカーやトラブルで身の危険を感じている個人の方からのご依頼をお受けします。料金は警護員の人数・時間・場所・リスク評価に基づく個別見積もりです。`,
  cleaning: `OUクリーンサービスは、${site.name}が運営する清掃事業です。熊本市を中心に、飲食店・店舗・ショッピングセンターの日常清掃と定期清掃、民泊・ゲストハウスのチェックアウトごとの清掃、玄関マットの清掃、草刈り、テント設営などを行います。警備事業で培った深夜・早朝の勤務体制を活かし、営業時間外の作業に対応します。`,
  pricing: `警備料金は、警備員1名1日あたりの単価を基本に、配置人数・時間帯（夜間割増）・資格者配置の有無・曜日・期間で算定します。当社の基準単価の目安は、交通誘導警備員B（資格なし）17,000円、交通誘導警備員A（検定資格者）19,400円（いずれも1名1日・日中8時間）です。参考として、国土交通省の令和8年3月適用 公共工事設計労務単価は、熊本県の交通誘導警備員A 17,700円、同B 15,500円で、当社の単価にはこれに社会保険・教育・装備・管制の費用を加えています。正式なお見積もりは現場の条件を確認したうえで提示します。`,
} as const;
