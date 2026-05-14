export const fieldSeparator = "\u001f";
export const recordSeparator = "\u001e";

export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

export function splitSpaceSeparatedRefs(value: string | undefined): string[] {
  return (value ?? "")
    .split(" ")
    .map((ref) => ref.trim())
    .filter(Boolean);
}
