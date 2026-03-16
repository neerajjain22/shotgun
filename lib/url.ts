export function toAbsoluteUrl(path: string, baseUrl: string): string {
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(sanitizedPath, baseUrl).toString();
}
