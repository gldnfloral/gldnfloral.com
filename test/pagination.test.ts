import { describe, expect, it } from "vitest";

import {
  clampPage,
  getPageNumbers,
  getTotalPages,
  paginate
} from "../src/lib/pagination";

describe("pagination utilities", () => {
  it("returns at least one page for empty lists", () => {
    expect(getTotalPages(0, 3)).toBe(1);
  });

  it("calculates page counts for non-even totals", () => {
    expect(getTotalPages(10, 3)).toBe(4);
  });

  it("clamps page numbers into a valid range", () => {
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(2, 3)).toBe(2);
    expect(clampPage(99, 3)).toBe(3);
  });

  it("throws for invalid page sizes", () => {
    expect(() => getTotalPages(10, 0)).toThrow("pageSize must be at least 1");
  });

  it("throws for non-integer page values", () => {
    expect(() => clampPage(1.5, 3)).toThrow("page must be an integer");
  });

  it("throws for invalid total page counts", () => {
    expect(() => clampPage(1, 0)).toThrow("totalPages must be at least 1");
  });

  it("returns the correct slice for a page", () => {
    expect(paginate(["a", "b", "c", "d", "e"], 2, 2)).toEqual(["c", "d"]);
  });

  it("returns complete page numbers", () => {
    expect(getPageNumbers(6, 3)).toEqual([1, 2]);
  });
});
