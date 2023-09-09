export function formatBalance(num) {
  return (formattedNumber = Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(num));
}

export function getIntervalForTimeline(timeline) {
  switch (timeline) {
    case "day":
      return "hourly";
    case "week":
      return "daily";
    case "month":
      return "daily";
    case "year":
      return "monthly";
    default:
      throw new Error("Unsupported timeline");
  }
}

export function getNextInterval(date, intervalType) {
  switch (intervalType) {
    case "hourly":
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() + 1
      );
    case "daily":
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    case "weekly":
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    case "monthly":
      return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    default:
      throw new Error("Unsupported interval type");
  }
}

export function getBalanceByInterval(ddata, intervalType, startingBalance) {
  if (ddata === null || ddata.length <= 0) {
    return [];
  }

  const data = [...ddata];
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  let balance = startingBalance;
  const balances = [];
  let currentEndDate = getNextInterval(new Date(data[0].date), intervalType);

  data.forEach((item) => {
    while (new Date(item.date) >= currentEndDate) {
      balances.push({
        value: balance,
        date: currentEndDate,
      });
      currentEndDate = getNextInterval(currentEndDate, intervalType); // use currentEndDate to ensure no gaps in intervals
    }

    if (item.type === "Income") {
      balance += item.amount;
    } else if (item.type === "Expense") {
      balance -= item.amount;
    }
  });

  // Push the balance for the last interval
  balances.push({
    value: balance,
    date: currentEndDate,
  });

  return balances;
}

export function getBalanceDataPoints(data) {
  if (data === null || data.length <= 0) {
    return [];
  }

  data.sort((a, b) => a.date - b.date);

  let balance = 0;
  const balances = [];

  data.forEach((item) => {
    if (item.type === "Income") {
      balance += item.amount;
    } else if (item.type === "Expense") {
      balance -= item.amount;
    }

    balances.push({
      value: balance,
      date: item.date,
    });
  });

  return balances;
}

export function getTotalIncome(data) {
  if (data === null || data.length <= 0) {
    return 0;
  }

  return data
    .filter((item) => item.type === "Income")
    .reduce((acc, current) => acc + current.amount, 0);
}

export function getTotalExpenses(data) {
  if (data === null || data.length <= 0) {
    return 0;
  }

  return data
    .filter((item) => item.type === "Expense")
    .reduce((acc, current) => acc + current.amount, 0);
}
