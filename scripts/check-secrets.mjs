import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const roots = [
  path.join(projectRoot, "src"),
  path.join(projectRoot, "public"),
  path.join(projectRoot, ".github")
];
const findings = [];
const ignoredDirectories = new Set(["node_modules", "dist", ".git", ".astro"]);
const textExtensions = new Set([".md", ".mjs", ".js", ".ts", ".astro", ".css", ".json", ".xml", ".txt", ".yml", ".yaml"]);
const placeholder = /^(?:your[_-]?[a-z0-9_-]*|example|demo|test|token|password|secret|redacted|x{3,}|\*{3,}|<[^>]+>|\$\{[^}]+\}|\{\{[^}]+\})$/i;

const directPatterns = [
  ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/i],
  ["github-token", /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ["aws-access-key", /\bAKIA[0-9A-Z]{16}\b/],
  ["private-network", /\b(?:10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})\b/],
  ["connection-string", /\b(?:mongodb|postgres(?:ql)?|mysql|redis):\/\/[^\s)]+/i],
  ["absolute-local-path", /\/(?:Users|home)\/[A-Za-z0-9._-]+\//]
];

for (const root of roots) scan(root);

if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Secret and internal-path scan passed.");
}

function scan(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    if (ignoredDirectories.has(path.basename(target))) return;
    for (const entry of fs.readdirSync(target)) scan(path.join(target, entry));
    return;
  }
  if (!textExtensions.has(path.extname(target).toLowerCase())) return;
  const relativePath = path.relative(projectRoot, target);
  const lines = fs.readFileSync(target, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const [label, pattern] of directPatterns) {
      if (pattern.test(line)) findings.push(`${relativePath}:${index + 1}: ${label}`);
    }
    const queryMatches = line.matchAll(/[?&](?:secret|token|password|passwd|appkey|access[_-]?key|api[_-]?key)=([^&#\s)"'`]+)/gi);
    for (const match of queryMatches) {
      if (!placeholder.test(match[1])) findings.push(`${relativePath}:${index + 1}: sensitive-query-value`);
    }
    const auth = line.match(/Authorization\s*:\s*(?:Bearer|Basic)\s+([^\s'"`]+)/i);
    if (auth && !placeholder.test(auth[1])) findings.push(`${relativePath}:${index + 1}: authorization-value`);
  });
}
