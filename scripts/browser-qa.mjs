import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer-core";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputDir = process.env.BROWSER_QA_OUTPUT_DIR ?? path.join(projectRoot, ".browser-qa");
const baseUrl = "http://127.0.0.1:4321";
const chromePath = process.env.CHROME_PATH ?? findChrome();
fs.mkdirSync(outputDir, { recursive: true });

let preview;
if (!(await serverReady())) {
  preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1"], {
    cwd: projectRoot,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"]
  });
  preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
  preview.stderr.on("data", (chunk) => process.stderr.write(chunk));
  await waitForServer();
}

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
});

try {
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await desktop.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
  await assertSingleHeading(desktop, "咕咕数据知识库");
  await desktop.screenshot({ path: path.join(outputDir, "home-desktop.png"), fullPage: true });

  await desktop.goto(`${baseUrl}/gugudata/ai-article-extract/`, { waitUntil: "networkidle0" });
  await assertSingleHeading(desktop, "文章抽取信息化 JSON API 接口");
  await assertSelector(desktop, 'link[rel="canonical"]');
  await assertSelector(desktop, 'script[type="application/ld+json"]');
  await desktop.screenshot({ path: path.join(outputDir, "article-desktop.png"), fullPage: true });

  await desktop.goto(`${baseUrl}/search/`, { waitUntil: "networkidle0" });
  await assertSelector(desktop, "pagefind-input");
  await assertSelector(desktop, "pagefind-results");

  await desktop.goto(`${baseUrl}/archive/jieqi/answers/`, { waitUntil: "networkidle0" });
  const robots = await desktop.$eval('meta[name="robots"]', (element) => element.getAttribute("content"));
  assert(robots === "noindex, follow", `Archive robots value was ${robots}`);
  const sitemap = await fetch(`${baseUrl}/sitemap-0.xml`).then((response) => response.text());
  assert(!sitemap.includes("/archive/"), "Archive URL appeared in the Sitemap");

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobile.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
  const hasOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  assert(!hasOverflow, "Homepage has horizontal overflow at 390px");
  await mobile.screenshot({ path: path.join(outputDir, "home-mobile.png"), fullPage: true });

  console.log(`Browser QA passed. Screenshots: ${outputDir}`);
} finally {
  await browser.close();
  preview?.kill("SIGTERM");
}

async function assertSingleHeading(page, expectedText) {
  const headings = await page.$$eval("h1", (elements) => elements.map((element) => element.textContent?.trim()));
  assert(headings.length === 1, `Expected one H1, found ${headings.length}`);
  assert(headings[0]?.includes(expectedText), `Unexpected H1: ${headings[0]}`);
}

async function assertSelector(page, selector) {
  const element = await page.$(selector);
  assert(Boolean(element), `Missing selector: ${selector}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function serverReady() {
  try {
    return (await fetch(`${baseUrl}/`)).ok;
  } catch {
    return false;
  }
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (await serverReady()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not become ready at ${baseUrl}`);
}

function findChrome() {
  const candidates = process.platform === "darwin"
    ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
    : ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium"];
  const candidate = candidates.find((value) => fs.existsSync(value));
  if (!candidate) throw new Error("Chrome executable was not found. Set CHROME_PATH.");
  return candidate;
}
