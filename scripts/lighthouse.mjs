import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(projectRoot, ".lighthouse");
const baseUrl = "http://127.0.0.1:4321";
const routes = [
  ["home", "/"],
  ["section", "/gugudata/"],
  ["article", "/gugudata/ai-article-extract/"]
];
const thresholds = {
  performance: 0.9,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: 1
};

fs.mkdirSync(outputDir, { recursive: true });

const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1"], {
  cwd: projectRoot,
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"]
});
preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
preview.stderr.on("data", (chunk) => process.stderr.write(chunk));

let chrome;
try {
  await waitForServer(`${baseUrl}/`);
  chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"] });
  const summaries = [];

  for (const [name, route] of routes) {
    const result = await lighthouse(`${baseUrl}${route}`, {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "error",
      onlyCategories: Object.keys(thresholds),
      preset: "desktop"
    });
    if (!result) throw new Error(`Lighthouse returned no result for ${route}`);

    const scores = Object.fromEntries(
      Object.keys(thresholds).map((category) => [category, result.lhr.categories[category].score ?? 0])
    );
    summaries.push({ name, route, scores });

    const reports = Array.isArray(result.report) ? result.report : [result.report];
    fs.writeFileSync(path.join(outputDir, `${name}.html`), reports[0]);
    fs.writeFileSync(path.join(outputDir, `${name}.json`), reports[1] ?? JSON.stringify(result.lhr));
  }

  fs.writeFileSync(path.join(outputDir, "summary.json"), `${JSON.stringify(summaries, null, 2)}\n`);
  for (const summary of summaries) {
    console.log(`${summary.name}: ${Object.entries(summary.scores).map(([key, value]) => `${key}=${Math.round(value * 100)}`).join(" ")}`);
  }

  const failures = summaries.flatMap((summary) =>
    Object.entries(thresholds)
      .filter(([category, minimum]) => summary.scores[category] < minimum)
      .map(([category, minimum]) => `${summary.route} ${category} ${summary.scores[category]} < ${minimum}`)
  );
  if (failures.length) throw new Error(`Lighthouse thresholds failed:\n${failures.join("\n")}`);
} finally {
  chrome?.kill();
  preview.kill("SIGTERM");
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview process is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}
