import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BalanceSummary from "../components/Overview/BalanceSummary";
import { GlobalStyles } from "../constants/styles";
import { formatBalance } from "../utils/numbers";
import BalanceChart from "../components/Overview/BalanceChart";
import TimelineSelector from "../components/ui/TimelineSelector";
import Button from "../components/ui/Button";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/dummy-data";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../utils/http";
import { getDateMinusDays, getMinusDaysFromFilter } from "../utils/date";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

export default function Home({ navigation }) {
  const [timeline, setTimeline] = useState("month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        //const expenses = await fetchExpenses();
        //expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }

      setIsLoading(false);
    };

    getExpenses();
  }, []);

  const onTimelineChangeHandler = (value) => {
    setTimeline(value);
  };

  const onSeeAllPressedHandler = () => {
    navigation.navigate("AllExpenses");
  };

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const days = getMinusDaysFromFilter(timeline);
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, days);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const income = expensesCtx.expenses
    .filter((item) => item.type === "Income")
    .reduce((acc, current) => acc + current.amount, 0);
  const expenses = expensesCtx.expenses
    .filter((item) => item.type === "Expense")
    .reduce((acc, current) => acc + current.amount, 0);

  const balance = income - expenses;

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <BalanceSummary balance={balance} income={income} expenses={expenses} />
      <BalanceChart data={recentExpenses} interval={timeline} />
      <TimelineSelector
        buttons={["day", "week", "month", "year"]}
        value={timeline}
        onChange={onTimelineChangeHandler}
      />
      <View style={styles.recentTransactionHeader}>
        <Text style={styles.recentTransactionText}>Recent Transactions</Text>
        <Button onPress={onSeeAllPressedHandler} mode="flat">
          See All
        </Button>
      </View>
      <ExpensesOutput
        expenses={recentExpenses}
        fallbackText="No recent transactions"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.background.primary,
  },
  recentTransactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  recentTransactionText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
