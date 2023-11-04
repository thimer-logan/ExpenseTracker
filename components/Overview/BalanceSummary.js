import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import BalanceItem from "./BalanceItem";
import { formatBalance } from "../../utils/numbers";
import Card from "../ui/Card";

export default function BalanceSummary({ balance, income, expenses }) {
  const formattedBalance = formatBalance(balance);
  const formattedIncome = formatBalance(income);
  const formattedExpenses = formatBalance(expenses);

  return (
    <Card style={styles.container}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceText}>${formattedBalance}</Text>
      <View style={styles.row}>
        <BalanceItem
          label="Income"
          total={formattedIncome}
          iconName="arrow-down-circle"
        />
        <BalanceItem
          label="Expenses"
          total={formattedExpenses}
          iconName="arrow-up-circle"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: GlobalStyles.colors.accent.primary600,
    shadowColor: GlobalStyles.colors.accent.primary100,
  },
  balanceLabel: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 14,
  },
  balanceText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 36,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
