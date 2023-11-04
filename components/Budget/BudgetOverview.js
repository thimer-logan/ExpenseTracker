import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "../ui/Card";
import TimelineSelector from "../ui/TimelineSelector";
import { GlobalStyles } from "../../constants/styles";
import { formatBalance } from "../../utils/numbers";
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

  const budgetSpent = budgetTotal - budgetRemaining;
  const formattedBudgetSpent = formatBalance(budgetSpent, 0);
  const formattedBudgetRem = formatBalance(budgetRemaining);
  const formattedBudgetTotal = formatBalance(budgetTotal, 0);

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
          progress={budgetSpent / budgetTotal}
          color={GlobalStyles.colors.accent.primary100}
          style={{ borderRadius: 6, height: 8 }}
        />
        <Text style={styles.budgetSpentText}>
          ${formattedBudgetSpent} of ${formattedBudgetTotal} spent
        </Text>
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
