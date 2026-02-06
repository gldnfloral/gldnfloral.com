import { describe, expect, it } from "vitest";

import { siteConfig } from "../src/lib/site";

describe("siteConfig", () => {
  it("contains the expected location", () => {
    expect(siteConfig.location).toBe("San Francisco, California");
  });

  it("contains a valid studio email", () => {
    expect(siteConfig.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has required title and name", () => {
    expect(siteConfig.title.length).toBeGreaterThan(0);
    expect(siteConfig.name.length).toBeGreaterThan(0);
  });

  it("has unique social links with https URLs", () => {
    const labels = siteConfig.socials.map((social) => social.label);
    const uniqueLabels = new Set(labels);

    expect(uniqueLabels.size).toBe(labels.length);

    for (const social of siteConfig.socials) {
      expect(social.href.startsWith("https://")).toBe(true);
      expect(social.label.length).toBeGreaterThan(0);
    }
  });
});
