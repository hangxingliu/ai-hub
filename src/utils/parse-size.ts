// Define the unit prefixes (lowercase, index corresponds to exponent)
const UNITS = ["", "k", "m", "g", "t", "p", "e", "z", "y"];

/**
 * Parses a size string into the equivalent number of bytes.
 * Supports both SI (metric, powers of 1000) and binary (IEC, powers of 1024) units.
 * Examples:
 * - parseSizeString("100") => 100
 * - parseSizeString("100k") => 100000
 * - parseSizeString("100kib") => 102400
 * Handles optional 'b' or 'B' suffix, and case-insensitively distinguishes SI vs binary via 'i' presence.
 * Returns NaN for invalid inputs.
 * @param sizeStr The size string to parse.
 * @returns The number of bytes as a number, or NaN if invalid.
 */
export function parseSizeString(sizeStr: string | number): number {
  let num: number;
  let suffix: string;
  if (typeof sizeStr === "number") {
    num = sizeStr;
    suffix = "";
  } else {
    // Match the numeric part and the suffix
    const match = sizeStr.match(/^([\d.]+)(.*)$/);
    if (!match) {
      return NaN;
    }
    // Parse the number
    num = parseFloat(match[1]);
    // Normalize suffix to lowercase
    suffix = match[2].toLowerCase();
  }

  // Default to SI units (powers of 1000)
  let si = true;

  // Remove optional 'b' suffix if present
  if (suffix.endsWith("b")) {
    suffix = suffix.slice(0, -1);
  }

  // Check for 'i' indicating binary units (powers of 1024)
  if (suffix.endsWith("i")) {
    si = false;
    suffix = suffix.slice(0, -1);
  }

  // The remaining suffix is the prefix (e.g., 'k', 'm', '')
  const prefix = suffix;

  // Find the exponent for the prefix
  const exp = UNITS.indexOf(prefix);
  if (exp === -1) {
    return NaN;
  }

  // Determine the base
  const base = si ? 1000 : 1024;

  // Calculate and return the bytes
  return num * Math.pow(base, exp);
}
