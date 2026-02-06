import { describe, expect, it } from "vitest";

import {
  GALLERY_PAGE_SIZE,
  getGalleryEntriesForPage,
  getGalleryPageNumbers,
  galleryEntries
} from "../src/lib/gallery";

describe("gallery content integrity", () => {
  it("keeps unique gallery titles and non-empty alt text", () => {
    const titles = galleryEntries.map((entry) => entry.title);
    expect(new Set(titles).size).toBe(titles.length);

    for (const entry of galleryEntries) {
      expect(entry.alt.length).toBeGreaterThan(20);
    }
  });

  it("keeps image metadata source references available", () => {
    for (const entry of galleryEntries) {
      const imageRef = entry.image as unknown;

      if (typeof imageRef === "string") {
        expect(imageRef.endsWith(".jpg")).toBe(true);
        continue;
      }

      expect(typeof imageRef).toBe("object");
      expect(imageRef).not.toBeNull();
    }
  });

  it("maps pages consistently with page numbers", () => {
    const pageNumbers = getGalleryPageNumbers();
    const flattened = pageNumbers.flatMap((page) =>
      getGalleryEntriesForPage(page, GALLERY_PAGE_SIZE)
    );

    expect(flattened).toEqual(galleryEntries);
  });
});
