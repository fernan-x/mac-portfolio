// Lightweight replacements for the moment.js formats used in the UI (English locale)

const part = (parts: Intl.DateTimeFormatPart[], type: string) =>
  parts.find((p) => p.type === type)?.value ?? "";

/** "Sunday, October 4" */
export const formatLongDate = (date = new Date()) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

/** "9:41" (12-hour clock, no day period) */
export const formatHour = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return `${part(parts, "hour")}:${part(parts, "minute")}`;
};

/** "Sun 4 October 9:41 am" */
export const formatMenuBarDate = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return `${part(parts, "weekday")} ${part(parts, "day")} ${part(parts, "month")} ${part(parts, "hour")}:${part(parts, "minute")} ${part(parts, "dayPeriod").toLowerCase()}`;
};
