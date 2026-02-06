export function getTotalPages(totalItems: number, pageSize: number): number {
  if (pageSize < 1) {
    throw new Error("pageSize must be at least 1");
  }

  if (totalItems < 1) {
    return 1;
  }

  return Math.ceil(totalItems / pageSize);
}

export function clampPage(page: number, totalPages: number): number {
  if (!Number.isInteger(page)) {
    throw new Error("page must be an integer");
  }

  if (totalPages < 1) {
    throw new Error("totalPages must be at least 1");
  }

  return Math.min(Math.max(page, 1), totalPages);
}

export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): T[] {
  const totalPages = getTotalPages(items.length, pageSize);
  const safePage = clampPage(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return items.slice(start, start + pageSize);
}

export function getPageNumbers(totalItems: number, pageSize: number): number[] {
  const totalPages = getTotalPages(totalItems, pageSize);

  return Array.from({ length: totalPages }, (_, index) => index + 1);
}
