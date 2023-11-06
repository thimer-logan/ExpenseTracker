import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BudgetList from "./BudgetList";
import { GlobalStyles } from "../../constants/styles";

export default BudgetOutput = ({ style, items, fallbackText }) => {
  let content = <Text style={styles.text}>{fallbackText}</Text>;

  if (items && items.length > 0) {
    content = <BudgetList data={items} />;
  }

  return <View style={[styles.container, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background.primary,
  },
  text: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
