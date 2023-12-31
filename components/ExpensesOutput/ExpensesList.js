import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses, useView }) {
  if (useView) {
    return (
      <View>
        {expenses.map((item) => (
          <ExpenseItem key={item.id} {...item} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});
