export function slugGenerator(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
