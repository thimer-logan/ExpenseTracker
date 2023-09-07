import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({
  id,
  name,
  amount,
  date,
  type,
  description,
  items,
}) {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id });
  };

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.name]}>{name}</Text>
          <Text style={styles.textBase}>
            {getFormattedDate(new Date(date))}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amount,
              type === "Income" ? styles.incomeStyle : styles.expenseStyle,
            ]}
          >
            ${amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.background.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.background.primary,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.text.primary,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    //color: GlobalStyles.colors.text.primary,
    fontWeight: "bold",
  },
  incomeStyle: {
    color: GlobalStyles.colors.success500,
  },
  expenseStyle: {
    color: GlobalStyles.colors.error300,
  },
  pressed: {
    opacity: 0.75,
  },
});
