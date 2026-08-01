import { spawn } from "node:child_process";

export async function startPreviewIfNeeded(projectRoot, baseUrl) {
  if (await serverReady(baseUrl)) return undefined;

  const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1"], {
    cwd: projectRoot,
    env: process.env,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"]
  });
  preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
  preview.stderr.on("data", (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer(baseUrl);
    return preview;
  } catch (error) {
    stopPreview(preview);
    throw error;
  }
}

export function stopPreview(preview) {
  if (!preview) return;
  try {
    if (process.platform !== "win32" && preview.pid) process.kill(-preview.pid, "SIGTERM");
    else preview.kill("SIGTERM");
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
  preview.stdout?.destroy();
  preview.stderr?.destroy();
  preview.unref();
}

async function serverReady(baseUrl) {
  try {
    return (await fetch(`${baseUrl}/`)).ok;
  } catch {
    return false;
  }
}

async function waitForServer(baseUrl) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (await serverReady(baseUrl)) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not become ready at ${baseUrl}`);
}
