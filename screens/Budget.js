import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import BudgetOverview from "../components/Budget/BudgetOverview";

export default function Budget() {
  const [timeline, setTimeline] = useState(new Date().getMonth());

  const timelineChangeHandler = (value) => {
    setTimeline(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BudgetOverview
          budgetTotal={2500}
          budgetRemaining={1850}
          timeline={timeline}
          onTimelineChanged={timelineChangeHandler}
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
