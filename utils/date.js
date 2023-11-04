/**
 * Formats a date to ISO
 * @param {Date} date Date to format
 * @returns Formatted date
 */
export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Returns a new date that is days ago from the date argument
 * @param {Date} date Reference date
 * @param {number} days Number of days prior
 * @returns New date
 */
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

/**
 * Returns the number of days associated with a filter. Possible
 * values for the filter are day, week, month, year
 * @param {string} filter
 * @returns The number of days
 */
export function getMinusDaysFromFilter(filter) {
  if (filter === "day") {
    return 0;
  }
  if (filter === "week") {
    return 7;
  }
  if (filter === "month") {
    return 30;
  }
  if (filter === "year") {
    return 365;
  }

  return 0;
}

const monthAbbreviations = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Returns the abbreviation for a given month in the range [0, 11]
 * @param {number} month
 * @returns The abbreviated month
 */
export function getMonthAbbreviation(month) {
  if (month < 0 || month > 11) {
    throw new Error("Invalid month number. Must be between 0 and 11.");
  }

  return monthAbbreviations[month];
}

/**
 * Returns the abbreviation for the last n months
 * @param {number} n Number of months prior to get
 */
export function getLastnMonthsAbbreviation(n) {
  const month = new Date().getMonth();
  const abbrevs = [];

  for (let i = 0; i <= n; i++) {
    const adjustedMonth = (month - i + 12) % 12;
    abbrevs.push(getMonthAbbreviation(adjustedMonth));
  }

  return abbrevs;
}

/**
 * Returns the abbreviated month as a number in the range [0, 11] if it exists,
 * otherwise, -1 is returned
 * @param {string} abbrev Abbreviation of the month
 * @returns The month as a number or -1 if it does not exist
 */
export function getMonthFromAbbreviation(abbrev) {
  return monthAbbreviations.indexOf(abbrev);
}
