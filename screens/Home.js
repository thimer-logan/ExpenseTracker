import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BalanceSummary from "../components/Overview/BalanceSummary";
import { GlobalStyles } from "../constants/styles";
import {
  formatBalance,
  getTotalExpenses,
  getTotalIncome,
} from "../utils/numbers";
import BalanceChart from "../components/Overview/BalanceChart";
import TimelineSelector from "../components/ui/TimelineSelector";
import Button from "../components/ui/Button";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/dummy-data";
import { fetchExpenses, initializeExpenses } from "../utils/http";
import { getDateMinusDays, getMinusDaysFromFilter } from "../utils/date";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../store/expenses";

export default function Home({ navigation }) {
  const [timeline, setTimeline] = useState("month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpenses = () => {
      //setIsLoading(true);
      try {
        dispatch(initializeExpenses(0));
      } catch (error) {
        console.log(error);
        setError("Could not fetch expenses");
      }

      //setIsLoading(false);
    };

    getExpenses();
  }, [dispatch]);

  const onTimelineChangeHandler = (value) => {
    setTimeline(value);
  };

  const onSeeAllPressedHandler = () => {
    navigation.navigate("AllExpenses");
  };

  if (error && !expenses.loading) {
    return <ErrorOverlay message={error} />;
  }

  if (expenses.loading) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenses.expenses.filter((expense) => {
    const days = getMinusDaysFromFilter(timeline);
    const today = new Date();
    const dateNDaysAgo = getDateMinusDays(today, days);
    const date = new Date(expense.date);

    return date >= dateNDaysAgo && date <= today;
  });

  const totalIncome = getTotalIncome(expenses.expenses);
  const totalExpenses = getTotalExpenses(expenses.expenses);

  const balance = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <BalanceSummary
        balance={balance}
        income={totalIncome}
        expenses={totalExpenses}
      />
      <BalanceChart
        data={expenses.expenses}
        interval={timeline}
        totalBalance={balance}
      />
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
