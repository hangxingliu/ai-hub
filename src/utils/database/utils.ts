const QUOTE_RE = /"/g;
const QUOTE = '"';
const QUOTE_ESCAPED = '""';

export function escapeId(val: string): string {
  let lastIndex = (QUOTE_RE.lastIndex = 0);
  let escapedVal = "";
  let match: RegExpMatchArray | null;

  while ((match = QUOTE_RE.exec(val))) {
    escapedVal += val.slice(lastIndex, match.index) + QUOTE_ESCAPED;
    lastIndex = QUOTE_RE.lastIndex;
  }

  if (lastIndex === 0) return QUOTE + val + QUOTE;
  if (lastIndex < val.length) return QUOTE + escapedVal + val.slice(lastIndex) + QUOTE;
  return QUOTE + escapedVal + QUOTE;
}
