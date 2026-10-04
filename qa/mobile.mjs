import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-proxy-server", "--no-sandbox"] });
const c = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
for (const p of ["/pricing", "/", "/recruit/security", "/protection", "/contact"]) {
  const pg = await c.newPage();
  await pg.goto("http://127.0.0.1:3100" + p, { waitUntil: "networkidle" });
  await pg.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); document.querySelectorAll(".reveal").forEach(e => e.dataset.reveal = "in"); await new Promise(r => setTimeout(r, 400)); });
  console.log(p, await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
  await pg.screenshot({ path: "qa/shots/mobile" + (p === "/" ? "_home" : p.replace(/\//g, "_")) + ".png", fullPage: true });
  await pg.close();
}
await b.close();
