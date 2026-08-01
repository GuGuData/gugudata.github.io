import fs from "node:fs";
import path from "node:path";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { startPreviewIfNeeded, stopPreview } from "./preview-process.mjs";

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
const runCount = 3;

fs.mkdirSync(outputDir, { recursive: true });
const preview = await startPreviewIfNeeded(projectRoot, baseUrl);

let chrome;
try {
  chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"] });
  const summaries = [];

  for (const [name, route] of routes) {
    const runs = [];
    for (let runIndex = 0; runIndex < runCount; runIndex += 1) {
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
      runs.push(scores);

      const reports = Array.isArray(result.report) ? result.report : [result.report];
      const suffix = `run-${runIndex + 1}`;
      fs.writeFileSync(path.join(outputDir, `${name}-${suffix}.html`), reports[0]);
      fs.writeFileSync(path.join(outputDir, `${name}-${suffix}.json`), reports[1] ?? JSON.stringify(result.lhr));
    }

    const scores = Object.fromEntries(
      Object.keys(thresholds).map((category) => [category, median(runs.map((run) => run[category]))])
    );
    summaries.push({ name, route, scores, runs });
  }

  fs.writeFileSync(path.join(outputDir, "summary.json"), `${JSON.stringify(summaries, null, 2)}\n`);
  for (const summary of summaries) {
    const medians = Object.entries(summary.scores).map(([key, value]) => `${key}=${Math.round(value * 100)}`).join(" ");
    const samples = summary.runs.map((run) => Math.round(run.performance * 100)).join("/");
    console.log(`${summary.name}: ${medians} performance-samples=${samples}`);
  }

  const failures = summaries.flatMap((summary) =>
    Object.entries(thresholds)
      .filter(([category, minimum]) => summary.scores[category] < minimum)
      .map(([category, minimum]) => `${summary.route} ${category} ${summary.scores[category]} < ${minimum}`)
  );
  if (failures.length) throw new Error(`Lighthouse thresholds failed:\n${failures.join("\n")}`);
} finally {
  chrome?.kill();
  stopPreview(preview);
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}
