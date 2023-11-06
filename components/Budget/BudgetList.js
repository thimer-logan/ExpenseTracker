import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BudgetItem from "./BudgetItem";

const BudgetList = ({ data }) => {
  return (
    <View>
      {data && data.map((item) => <BudgetItem key={item.id} {...item} />)}
    </View>
  );
};

export default BudgetList;

const styles = StyleSheet.create({});
