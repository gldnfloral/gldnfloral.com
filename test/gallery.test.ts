import { describe, expect, it } from "vitest";

import {
  GALLERY_PAGE_SIZE,
  getGalleryEntriesForPage,
  getGalleryPageNumbers,
  getGalleryTotalPages,
  galleryEntries
} from "../src/lib/gallery";

describe("gallery data", () => {
  it("uses a stable page size for paginated output", () => {
    expect(GALLERY_PAGE_SIZE).toBe(3);
  });

  it("returns total pages for the current catalog", () => {
    expect(getGalleryTotalPages()).toBe(2);
    expect(getGalleryPageNumbers()).toEqual([1, 2]);
  });

  it("returns page-sized items for page one", () => {
    expect(getGalleryEntriesForPage(1)).toHaveLength(3);
  });

  it("clamps out-of-range pages to the last page", () => {
    const lastPageEntries = getGalleryEntriesForPage(99);
    expect(lastPageEntries).toEqual(galleryEntries.slice(3, 6));
  });
});
