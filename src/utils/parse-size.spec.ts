import { expect, test } from "bun:test";
import { parseSizeString } from "./parse-size.js";

/**
 * Test basic parsing of plain numeric strings without units.
 */
test("parseSizeString: should parse plain numbers", () => {
  expect(parseSizeString("100")).toEqual(100);
  expect(parseSizeString("0")).toEqual(0);
  expect(parseSizeString("1.5")).toEqual(1.5);
});

/**
 * Test parsing with SI units (powers of 1000).
 */
test("parseSizeString: should parse SI units correctly", () => {
  expect(parseSizeString("100k")).toEqual(100000);
  expect(parseSizeString("2M")).toEqual(2000000);
  expect(parseSizeString("1G")).toEqual(1000000000);
  expect(parseSizeString("1T")).toEqual(1000000000000);
  expect(parseSizeString("1P")).toEqual(1000000000000000);
  expect(parseSizeString("1E")).toEqual(1000000000000000000);
  expect(parseSizeString("1Z")).toEqual(1000000000000000000000);
  expect(parseSizeString("1Y")).toEqual(1000000000000000000000000);
});

/**
 * Test parsing with binary units (powers of 1024), indicated by 'i'.
 */
test("parseSizeString: should parse binary units correctly", () => {
  expect(parseSizeString("100kib")).toEqual(102400);
  expect(parseSizeString("1MiB")).toEqual(1048576);
  expect(parseSizeString("1GiB")).toEqual(1073741824);
  expect(parseSizeString("1TiB")).toEqual(1099511627776);
  expect(parseSizeString("1PiB")).toEqual(1125899906842624);
  expect(parseSizeString("1EiB")).toEqual(1152921504606847000);
  expect(parseSizeString("1ZiB")).toEqual(1180591620717411303424);
  expect(parseSizeString("1YiB")).toEqual(1208925819614629174706176);
});

/**
 * Test parsing with optional 'b' or 'B' suffix.
 */
test('parseSizeString: should handle optional "b" or "B" suffix', () => {
  expect(parseSizeString("100KB")).toEqual(100000);
  expect(parseSizeString("100kB")).toEqual(100000);
  expect(parseSizeString("100KiB")).toEqual(102400);
  expect(parseSizeString("100kib")).toEqual(102400);
});

/**
 * Test case insensitivity in units.
 */
test("parseSizeString: should be case insensitive", () => {
  expect(parseSizeString("100K")).toEqual(100000);
  expect(parseSizeString("100m")).toEqual(100000000);
  expect(parseSizeString("100KiB")).toEqual(102400);
  expect(parseSizeString("100kIb")).toEqual(102400);
});

/**
 * Test parsing with decimal numbers.
 */
test("parseSizeString: should handle decimal numbers", () => {
  expect(parseSizeString("1.5k")).toEqual(1500);
  expect(parseSizeString("2.5MiB")).toEqual(2621440);
  expect(parseSizeString("0.5G")).toEqual(500000000);
});

/**
 * Test invalid input strings, which should return NaN.
 */
test("parseSizeString: should return NaN for invalid inputs", () => {
  expect(parseSizeString("abc")).toBeNaN();
  expect(parseSizeString("100x")).toBeNaN();
  expect(parseSizeString("k")).toBeNaN();
  expect(parseSizeString("")).toBeNaN();
  expect(parseSizeString("100 k")).toBeNaN(); // Spaces not supported
  expect(parseSizeString("100Q")).toBeNaN(); // Invalid unit
});

/**
 * Test edge cases like very small or large numbers.
 */
test("parseSizeString: should handle edge cases", () => {
  expect(parseSizeString("0k")).toEqual(0);
  // Scientific notation not supported, parses as 1 with invalid suffix
  expect(parseSizeString("1e3")).toBeNaN();
  expect(parseSizeString("1e3k")).toBeNaN();
});
