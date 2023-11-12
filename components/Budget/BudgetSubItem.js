import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { ProgressBar } from "react-native-paper";
import { formatBalance, isValidNumber } from "../../utils/numbers";
import Icon from "../ui/Icon";
import IconButton from "../ui/IconButton";
import { useNavigation } from "@react-navigation/native";

const BudgetSubItem = ({ id, name, amount, remaining }) => {
  const navigation = useNavigation();

  const spent =
    isValidNumber(amount) && isValidNumber(remaining)
      ? amount - remaining
      : NaN;

  const progress =
    isValidNumber(spent) && isValidNumber(amount) ? spent / amount : 0;

  const formattedTotal = isValidNumber(amount)
    ? formatBalance(amount, 0)
    : "---";
  const formattedSpent = isValidNumber(spent) ? formatBalance(spent, 0) : "---";

  const editPressedHandler = () => {
    navigation.navigate("ManageBudget", { budgetId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.mainText}>{name}</Text>
            <Text style={styles.mainText}>${formattedTotal}</Text>
          </View>
          <ProgressBar
            progress={progress}
            color={
              progress >= 1.0
                ? GlobalStyles.colors.error300
                : GlobalStyles.colors.accent.primary100
            }
            style={{ borderRadius: 6, height: 8 }}
          />
        </View>
        <View style={styles.iconContainer}>
          <IconButton
            family="FontAwesome"
            icon="edit"
            size={24}
            color="white"
            onPress={editPressedHandler}
          />
        </View>
      </View>
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
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    flex: 5,
    flexDirection: "column",
    gap: 8,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
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
