import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import BudgetOverview from "../components/Budget/BudgetOverview";
import BudgetOutput from "../components/Budget/BudgetOutput";
import { initializeBudgets } from "../utils/http";
import { useDispatch, useSelector } from "react-redux";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const createBudgetItems = (budgets, expenses, categories) => {
  // Pre-compute total expenses for each budget
  const expenseTotals = expenses.reduce((acc, expense) => {
    acc[expense.budget] = (acc[expense.budget] || 0) + expense.amount;
    return acc;
  }, {});

  // Compute remaining amount for each budget
  const budgetSubItems = budgets.map((budget) => ({
    ...budget,
    remaining: budget.amount - (expenseTotals[budget.name] || 0),
  }));

  // Organize budgetSubItems by category
  const subItemsByCategory = budgetSubItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Create budget items by category
  return categories
    .map((category) => {
      const filteredSubItems = subItemsByCategory[category.value] || [];

      if (filteredSubItems.length > 0) {
        const total = filteredSubItems.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        const remaining = filteredSubItems.reduce(
          (acc, item) => acc + item.remaining,
          0
        );

        return {
          id: category.key,
          name: category.value,
          total,
          remaining,
          subItems: filteredSubItems,
        };
      }

      // Optionally, include categories with no sub-items
      return null;
    })
    .filter(Boolean); // Filters out null values
};

export default function Budget() {
  const loading = useSelector((state) => state.budgets.loading);
  const error = useSelector((state) => state.budgets.error);

  const [timeline, setTimeline] = useState(new Date().getMonth());

  const budgets = useSelector((state) => state.budgets.budgets);
  const categories = useSelector((state) => state.expenses.categories);
  const expenses = useSelector((state) => state.expenses.expenses);

  const dispatch = useDispatch();

  useEffect(() => {
    const getBudgets = () => {
      try {
        dispatch(initializeBudgets());
      } catch (error) {
        console.log(error);
      }
    };

    getBudgets();
  }, []);

  const filteredBudgets = useMemo(() => {
    return budgets.filter(
      (item) => new Date(item.date).getMonth() === timeline
    );
  }, [budgets, timeline]);
  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (item) =>
        item.type === "Expense" && new Date(item.date).getMonth() === timeline
    );
  }, [expenses, timeline]);
  const budgetItems = useMemo(() => {
    return createBudgetItems(filteredBudgets, filteredExpenses, categories);
  }, [filteredBudgets, filteredExpenses]);

  const total = useMemo(() => {
    return budgetItems.reduce((acc, item) => (acc += item.total), 0);
  }, [budgetItems]);

  const remaining = useMemo(() => {
    return budgetItems.reduce((acc, item) => (acc += item.remaining), 0);
  }, [budgetItems]);

  const timelineChangeHandler = (value) => {
    setTimeline(value);
  };

  if (error.status && !loading) {
    return <ErrorOverlay message={error.message} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BudgetOverview
          budgetTotal={total}
          budgetRemaining={remaining}
          timeline={timeline}
          onTimelineChanged={timelineChangeHandler}
        />
        <BudgetOutput
          items={budgetItems}
          fallbackText={"No budgets configured"}
        />
      </ScrollView>
    </SafeAreaView>
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
  scrollView: {
    marginTop: 12,
  },
});
