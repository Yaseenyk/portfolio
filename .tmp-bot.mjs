import puppeteer from "puppeteer";
import fs from "node:fs";
const OUT = "C:/Users/Yaseen Khatib/Downloads/slide-check";
fs.mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({ headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
const errs = [];
p.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 160)));
p.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().slice(0, 160)); });
p.on("requestfailed", (r) => { if (r.url().includes("chat")) errs.push("FAILED: " + r.url() + " " + r.failure()?.errorText); });
p.on("response", async (r) => { if (r.url().includes("/chat")) errs.push(`chat response: ${r.status()}`); });

await p.goto("https://streamerosai.com/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));

// open the widget
const opened = await p.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((x) => /chat|support|bot/i.test(x.getAttribute("aria-label") || x.textContent || ""));
  if (btn) { btn.click(); return btn.getAttribute("aria-label") || btn.textContent?.trim(); }
  return null;
});
console.log("opened widget via:", opened);
await new Promise((r) => setTimeout(r, 1200));

const typed = await p.evaluate(() => {
  const i = document.querySelector('input[type="text"], input:not([type]), textarea');
  if (!i) return false;
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  setter.call(i, "What are the system requirements?");
  i.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
});
console.log("typed into input:", typed);
const sent = await p.evaluate(() => {
  const form = document.querySelector("form");
  const btn = form?.querySelector('button[type="submit"]') || [...(form?.querySelectorAll("button") || [])].pop();
  if (btn && !btn.disabled) { btn.click(); return "clicked submit"; }
  if (form) { form.requestSubmit ? form.requestSubmit() : form.submit(); return "requestSubmit"; }
  return "no form";
});
console.log("send:", sent);

const labels = new Set();
for (let i = 0; i < 40; i++) {
  const t = await p.evaluate(() => document.body.innerText);
  for (const l of ["Reading your question", "Searching the knowledge base", "Finding the relevant sections", "Writing the answer", "Still working"]) {
    if (t.includes(l)) labels.add(l);
  }
  if (/Windows 10|16 GB|RTX/i.test(t)) break;
  await new Promise((r) => setTimeout(r, 500));
}
await p.screenshot({ path: `${OUT}/chatbot.png` });
const answer = await p.evaluate(() => {
  const t = document.body.innerText;
  const i = t.search(/Windows 10|16 GB|RTX/i);
  return i === -1 ? "NO ANSWER RENDERED" : t.slice(Math.max(0, i - 120), i + 260);
});
console.log("stage labels seen:", [...labels]);
console.log("answer:", answer.replace(/\n+/g, " ").slice(0, 400));
console.log("errors:", errs.length ? [...new Set(errs)] : "none");
await b.close();
