// ローカル検証用：Google Fonts に到達できない環境で next build を通すためのモック。
// 本番（Vercel）では使わない。NEXT_FONT_GOOGLE_MOCKED_RESPONSES=$(pwd)/scripts/font-mock.js npm run build
const css = (family) => `@font-face { font-family: '${family}'; font-style: normal; font-weight: 400; font-display: swap; src: url(https://fonts.gstatic.com/mock/${encodeURIComponent(family)}.woff2) format('woff2'); }`;
const urls = [
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@500&display=swap",
];
module.exports = Object.fromEntries(urls.map((u) => [u, css(decodeURIComponent(u.match(/family=([^:&]+)/)[1].replace(/\+/g, " ")))]));
