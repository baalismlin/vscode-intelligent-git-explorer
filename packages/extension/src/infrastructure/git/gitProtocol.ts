export const fieldSeparator = "\u001f";
export const recordSeparator = "\u001e";

export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}
