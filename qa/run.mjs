import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const base = "http://127.0.0.1:3100";
const pages = ["/","/services","/services/traffic-control","/services/crowd-control","/services/road-regulation","/pricing","/works","/faq","/protection","/protection/corporate","/protection/creators","/protection/personal","/protection/flow","/protection/contact","/en/bodyguard","/cleaning","/cleaning/store","/cleaning/minpaku","/cleaning/outdoor","/cleaning/contact","/company","/company/education","/legal","/privacy","/news","/news/2026-07-earthquake-response","/recruit","/recruit/security","/recruit/cleaning","/recruit/bodyguard","/recruit/faq","/recruit/entry","/contact","/contact/thanks","/column","/column/what-is-4go-keibi","/column/sp-vs-bodyguard","/column/kumamoto-security-company-guide","/column/work-as-security-guard-kumamoto","/glossary","/nope-404"];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-proxy-server","--no-sandbox"] });
const results = [];
const links = new Set();
for (const vp of [{ name: "desktop", width: 1366, height: 900 }, { name: "mobile", width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, deviceScaleFactor: vp.deviceScaleFactor ?? 1, locale: "ja-JP" });
  for (const p of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    const res = await page.goto(base + p, { waitUntil: "networkidle" });
    await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); document.querySelectorAll(".reveal").forEach(e => e.dataset.reveal = "in"); await new Promise(r => setTimeout(r, 400)); });
    const status = res?.status();
    const h1 = await page.locator("h1").count();
    const title = await page.title();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (vp.name === "desktop") {
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
      for (const h of hrefs) if (h && h.startsWith("/")) links.add(h.split("#")[0]);
    }
    await page.screenshot({ path: `qa/shots/${vp.name}${p === "/" ? "_home" : p.replace(/\//g, "_")}.png`, fullPage: true });
    results.push({ vp: vp.name, p, status, h1, overflow, title: title.slice(0, 60), errors: errors.slice(0, 3) });
    await page.close();
  }
  await ctx.close();
}
// link check
const ctx = await browser.newContext();
const page = await ctx.newPage();
const broken = [];
for (const l of [...links].sort()) {
  const r = await page.goto(base + l, { waitUntil: "domcontentloaded" });
  if (!r || r.status() >= 400) broken.push({ l, status: r?.status() });
}
await browser.close();
for (const r of results) console.log(`${r.vp.padEnd(7)} ${String(r.status).padEnd(4)} h1=${r.h1} ovf=${String(r.overflow).padStart(3)} ${r.p.padEnd(34)} ${r.title}${r.errors.length ? "  ERR:" + JSON.stringify(r.errors) : ""}`);
console.log("internal links checked:", links.size, "broken:", JSON.stringify(broken));
