export interface NavItem {
  href: string;
  label: string;
}

export const primaryNavItems: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function normalizePath(value: string): string {
  const withoutHash = value.split("#", 1)[0] ?? value;
  const withoutQuery = withoutHash.split("?", 1)[0] ?? withoutHash;
  const cleaned = withoutQuery.replace(/\/+$/, "");

  return cleaned === "" ? "/" : cleaned;
}

export function isNavItemActive(currentPath: string, href: string): boolean {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedHref = normalizePath(href);

  if (normalizedHref === "/gallery") {
    return (
      normalizedCurrentPath === "/gallery" ||
      normalizedCurrentPath.startsWith("/gallery/")
    );
  }

  return normalizedCurrentPath === normalizedHref;
}
