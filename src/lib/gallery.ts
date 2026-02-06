import type { ImageMetadata } from "astro";

import airyPinkMeadow from "../assets/images/gallery/airy-pink-meadow.jpg";
import blushBowlArrangement from "../assets/images/gallery/blush-bowl-arrangement.jpg";
import citrusCenterpiece from "../assets/images/gallery/citrus-centerpiece.jpg";
import pastelHandTiedBouquet from "../assets/images/gallery/pastel-hand-tied-bouquet.jpg";
import springAtelierArrangement from "../assets/images/gallery/spring-atelier-arrangement.jpg";
import weddingTableArrangement from "../assets/images/gallery/wedding-table-arrangement.jpg";
import { getPageNumbers, getTotalPages, paginate } from "./pagination";

export interface GalleryEntry {
  alt: string;
  image: ImageMetadata;
  title: string;
}

export const GALLERY_PAGE_SIZE = 3;

export const galleryEntries: readonly GalleryEntry[] = [
  {
    alt: "Airy pink bouquet arranged in a glass vessel with sweet peas and blush blooms.",
    image: airyPinkMeadow,
    title: "Airy Pink Meadow"
  },
  {
    alt: "Blush and green floral arrangement styled low and lush in a ceramic bowl.",
    image: blushBowlArrangement,
    title: "Blush Bowl Arrangement"
  },
  {
    alt: "Citrus-toned arrangement with orange garden roses and white accent blooms.",
    image: citrusCenterpiece,
    title: "Citrus Centerpiece"
  },
  {
    alt: "Hand-tied pastel bouquet with peach roses and bright yellow floral accents.",
    image: pastelHandTiedBouquet,
    title: "Pastel Hand-Tied Bouquet"
  },
  {
    alt: "Spring floral composition with layered pink blossoms and feathery greenery.",
    image: springAtelierArrangement,
    title: "Spring Atelier Arrangement"
  },
  {
    alt: "Wedding table floral arrangement with textured petals in pink and ivory tones.",
    image: weddingTableArrangement,
    title: "Wedding Table Arrangement"
  }
];

export function getGalleryPageNumbers(
  pageSize: number = GALLERY_PAGE_SIZE
): number[] {
  return getPageNumbers(galleryEntries.length, pageSize);
}

export function getGalleryTotalPages(pageSize: number = GALLERY_PAGE_SIZE): number {
  return getTotalPages(galleryEntries.length, pageSize);
}

export function getGalleryEntriesForPage(
  page: number,
  pageSize: number = GALLERY_PAGE_SIZE
): GalleryEntry[] {
  return paginate(galleryEntries, page, pageSize);
}
