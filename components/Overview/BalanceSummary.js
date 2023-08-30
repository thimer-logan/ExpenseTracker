import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import BalanceItem from "./BalanceItem";
import { formatBalance } from "../../utils/numbers";

export default function BalanceSummary({ balance, income, expenses }) {
  const formattedBalance = formatBalance(balance);
  const formattedIncome = formatBalance(income);
  const formattedExpenses = formatBalance(expenses);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.accent.primary500,
    elevation: 3,
    shadowColor: GlobalStyles.colors.accent.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  balanceLabel: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 14,
  },
  balanceText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
