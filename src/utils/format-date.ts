function pad2(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * - `yyyy`: year (4 digits)
 * - `yy`:   year (2 digits)
 * - `mm`:   month
 * - `dd`:   date
 * - `HH`:   hour
 * - `MM`:   minute
 * - `SS`:   second
 */
export function formatDate(format: string, date?: Date) {
  if (!date) date = new Date();
  return format.replace(/(yy(?:yy)?|mm|dd|HH|MM|SS)/g, (_, placeholder) => {
    switch (placeholder) {
      case "yyyy":
        return date.getFullYear().toString();
      case "yy":
        return date.getFullYear().toString().slice(2);
      case "mm":
        return pad2(date.getMonth() + 1);
      case "dd":
        return pad2(date.getDate());
      case "HH":
        return pad2(date.getHours());
      case "MM":
        return pad2(date.getMinutes());
      case "SS":
        return pad2(date.getSeconds());
      default:
        throw `Invalid format string "${placeholder}"`;
    }
  });
}
