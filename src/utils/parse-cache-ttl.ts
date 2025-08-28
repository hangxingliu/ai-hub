/**
 * Parses a string representing a time duration (e.g., "10s", "5m", "2h", "1d") into its equivalent value in seconds.
 * If a number is provided, it is treated as seconds.
 * Supported units are "s" (seconds), "m" (minutes), "h" (hours), and "d" (days).
 * If no unit is specified, seconds are assumed.
 *
 * @param cacheTTLStr The size string or number to parse. Examples: "30s", "1.5m", "2h", "1d", 60.
 * @returns The duration in seconds, or 0 if the input format is invalid or the unit is unknown.
 */
export function parseCacheTTL(cacheTTLStr: string | number): number {
  if (typeof cacheTTLStr === "number") {
    return cacheTTLStr;
  }

  const match = cacheTTLStr.match(/^(\d+(\.\d+)?)([smhd])?$/i);
  if (!match) return -1; // Invalid format

  const value = parseFloat(match[1]);
  const unit = match[3].toLowerCase(); // Can be undefined if no unit is provided

  if (isNaN(value)) return -1; // Should not happen with the regex, but good for safety

  switch (unit) {
    case "s":
    case undefined: // Default to seconds if no unit is specified
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return -1; // Unknown unit, though regex should prevent this
  }
}
