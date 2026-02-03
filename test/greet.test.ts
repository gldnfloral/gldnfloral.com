import { describe, expect, it } from "vitest";
import { greet } from "../src/lib/greet";

describe("greet", () => {
  it("returns a friendly message", () => {
    expect(greet("Astro")).toBe("Hello, Astro!");
  });
});
