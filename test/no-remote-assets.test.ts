import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "..");

function walk(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return [fullPath];
  });
}

describe("local asset guardrails", () => {
  it("keeps critical font assets vendored locally", () => {
    const vendoredFonts = [
      path.join(repoRoot, "public", "fonts", "cormorant-garamond-latin.woff2"),
      path.join(repoRoot, "public", "fonts", "source-sans-3-latin.woff2")
    ];

    for (const fontPath of vendoredFonts) {
      const fileContents = readFileSync(fontPath);
      expect(fileContents.byteLength).toBeGreaterThan(1000);
    }
  });

  it("does not reference remote font CDNs in source files", () => {
    const sourceFiles = walk(path.join(repoRoot, "src")).filter((filePath) =>
      /\.(astro|ts|css)$/.test(filePath)
    );

    const bannedPatterns = [
      "fonts.googleapis.com",
      "fonts.gstatic.com",
      "unpkg.com",
      "jsdelivr.net"
    ];

    for (const filePath of sourceFiles) {
      const text = readFileSync(filePath, "utf-8");

      for (const pattern of bannedPatterns) {
        expect(text.includes(pattern), `${filePath} includes ${pattern}`).toBe(false);
      }
    }
  });
});
