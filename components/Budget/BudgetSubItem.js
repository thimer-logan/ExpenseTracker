import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { ProgressBar } from "react-native-paper";
import { formatBalance, isValidNumber } from "../../utils/numbers";

const BudgetSubItem = ({ name, total, remaining }) => {
  const spent =
    isValidNumber(total) && isValidNumber(remaining) ? total - remaining : NaN;

  const progress =
    isValidNumber(spent) && isValidNumber(total) ? spent / total : 0;

  const formattedTotal = isValidNumber(total) ? formatBalance(total, 0) : "---";
  const formattedSpent = isValidNumber(spent) ? formatBalance(spent, 0) : "---";

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainText}>{name}</Text>
        <Text style={styles.mainText}>${formattedTotal}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color={GlobalStyles.colors.accent.primary100}
        style={{ borderRadius: 6, height: 8 }}
      />
      <Text style={styles.progressText}>
        ${formattedSpent} of ${formattedTotal}
      </Text>
    </View>
  );
};

export default BudgetSubItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  progressText: {
    color: GlobalStyles.colors.text.secondary,
    fontSize: 12,
  },
});
