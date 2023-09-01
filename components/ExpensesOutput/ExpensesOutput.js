import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ style, expenses, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return <View style={[styles.container, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: GlobalStyles.colors.background.primary,
  },
  infoText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
