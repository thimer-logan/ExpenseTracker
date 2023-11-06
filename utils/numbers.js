export function formatBalance(num, digits = 2) {
  return (formattedNumber = Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
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
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    case "monthly":
      return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    default:
      throw new Error("Unsupported interval type");
  }
}

export function getBalanceByInterval(ddata, nDays, startingBalance) {
  if (ddata === null || ddata.length <= 0) {
    return [];
  }

  const data = [...ddata];
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  let balance = startingBalance;
  const balances = [];
  const today = new Date();
  const nDaysAgo = new Date(today);
  nDaysAgo.setDate(today.getDate() - nDays);

  for (let i = 0; i <= nDays; i++) {
    const currentDate = new Date(nDaysAgo);
    currentDate.setDate(nDaysAgo.getDate() + i);

    const currentDataEntries = data.filter(
      (d) => new Date(d.date).toDateString() === currentDate.toDateString()
    );

    if (currentDataEntries.length > 0) {
      const totalBalanceForTheDay = currentDataEntries.reduce((sum, entry) => {
        if (entry.type === "Income") {
          return sum + entry.amount;
        } else if (entry.type === "Expense") {
          return sum - entry.amount;
        }
      }, 0);
      balance += totalBalanceForTheDay;
    }

    balances.push({
      value: balance,
      date: currentDate,
    });
  }

  // data.forEach((item) => {
  //   while (new Date(item.date) >= currentEndDate) {
  //     balances.push({
  //       value: balance,
  //       date: currentEndDate,
  //     });
  //     currentEndDate = getNextInterval(currentEndDate, intervalType); // use currentEndDate to ensure no gaps in intervals
  //   }

  //   if (item.type === "Income") {
  //     balance += item.amount;
  //   } else if (item.type === "Expense") {
  //     balance -= item.amount;
  //   }
  // });

  // // Push the balance for the last interval
  // balances.push({
  //   value: balance,
  //   date: currentEndDate,
  // });

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

export function isValidNumber(num) {
  return typeof num === "number" && !isNaN(num);
}
