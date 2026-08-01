import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://gugudata.github.io",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  },
  vite: {
    build: {
      sourcemap: false
    }
  }
});
