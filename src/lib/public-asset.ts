/** Path to a file in /public that also works when index.html is opened locally. */
export function publicAsset(path: string): string {
  const clean = path.replace(/^\.?\//, "");
  return `./${clean}`;
}
