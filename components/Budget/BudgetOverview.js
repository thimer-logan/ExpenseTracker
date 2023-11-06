import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "../ui/Card";
import TimelineSelector from "../ui/TimelineSelector";
import { GlobalStyles } from "../../constants/styles";
import { formatBalance, isValidNumber } from "../../utils/numbers";
import { ProgressBar } from "react-native-paper";
import {
  getLastnMonthsAbbreviation,
  getMonthAbbreviation,
  getMonthFromAbbreviation,
} from "../../utils/date";

const BudgetOverview = ({
  budgetTotal,
  budgetRemaining,
  timeline,
  onTimelineChanged,
  timelineLength = 3,
}) => {
  const timelineAbbrevs = getLastnMonthsAbbreviation(timelineLength);
  const timelineValue = getMonthAbbreviation(timeline);

  const budgetSpent =
    isValidNumber(budgetTotal) && isValidNumber(budgetRemaining)
      ? budgetTotal - budgetRemaining
      : NaN;

  const progress =
    isValidNumber(budgetSpent) && isValidNumber(budgetTotal)
      ? budgetSpent / budgetTotal
      : 0;
  const formattedBudgetRem = isValidNumber(budgetRemaining)
    ? formatBalance(budgetRemaining)
    : "----";

  const spentText =
    isValidNumber(budgetSpent) && isValidNumber(budgetTotal)
      ? `$${formatBalance(budgetSpent, 0)} of $${formatBalance(
          budgetTotal,
          0
        )} spent`
      : "";

  const timelineChangeHandler = (value) => {
    // parent component needs month as a number
    onTimelineChanged(getMonthFromAbbreviation(value));
  };

  return (
    <Card style={styles.card}>
      <TimelineSelector
        buttons={[...timelineAbbrevs].reverse()}
        value={timelineValue}
        onChange={timelineChangeHandler}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>${formattedBudgetRem}</Text>
          <Text style={styles.budgetLabel}>Remaining</Text>
        </View>
        <ProgressBar
          progress={progress}
          color={GlobalStyles.colors.accent.primary100}
          style={{ borderRadius: 6, height: 8 }}
        />
        <Text style={styles.budgetSpentText}>{spentText}</Text>
      </View>
    </Card>
  );
};

export default BudgetOverview;

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 24,
    backgroundColor: GlobalStyles.colors.accent.primary600,
  },
  bottomContainer: {
    gap: 12,
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  budgetLabel: {
    color: GlobalStyles.colors.text.secondary,
    fontSize: 14,
    paddingLeft: 12,
  },
  budgetText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 36,
    fontWeight: "bold",
  },
  budgetSpentText: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 14,
  },
});
