import { describe, expect, it } from "vitest";

import {
  isNavItemActive,
  normalizePath,
  primaryNavItems
} from "../src/lib/navigation";

describe("navigation helpers", () => {
  it("returns stable primary navigation entries", () => {
    expect(primaryNavItems).toEqual([
      { href: "/", label: "Home" },
      { href: "/gallery", label: "Gallery" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" }
    ]);
  });

  it("normalizes root and trailing slashes", () => {
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("/about/")).toBe("/about");
    expect(normalizePath("/gallery///")).toBe("/gallery");
  });

  it("normalizes paths that contain query strings and hashes", () => {
    expect(normalizePath("/contact/?from=nav")).toBe("/contact");
    expect(normalizePath("/gallery/2#top")).toBe("/gallery/2");
  });

  it("marks gallery navigation as active for child pages", () => {
    expect(isNavItemActive("/gallery", "/gallery")).toBe(true);
    expect(isNavItemActive("/gallery/2", "/gallery")).toBe(true);
    expect(isNavItemActive("/gallery/12/", "/gallery")).toBe(true);
  });

  it("does not mark unrelated routes as active", () => {
    expect(isNavItemActive("/about", "/gallery")).toBe(false);
    expect(isNavItemActive("/contact", "/about")).toBe(false);
  });

  it("supports exact matching for non-gallery routes", () => {
    expect(isNavItemActive("/contact", "/contact")).toBe(true);
    expect(isNavItemActive("/contact/", "/contact")).toBe(true);
    expect(isNavItemActive("/", "/")).toBe(true);
  });
});
