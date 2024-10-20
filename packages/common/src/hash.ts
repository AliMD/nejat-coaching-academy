export function hashString(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString(36);

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  // Convert to unsigned 32bit integer and then to base-36 string
  return (hash >>> 0).toString(36);
}
