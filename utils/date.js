export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

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
