import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

export default function BalanceItem({ label, total, iconName }) {
  return (
    <View>
      <View style={styles.labelContainer}>
        <Ionicons
          name={iconName}
          size={14}
          color={GlobalStyles.colors.accent.primary100}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.total}>${total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  label: {
    color: GlobalStyles.colors.text.secondary,
    fontSize: 12,
    paddingLeft: 4,
  },
  total: {
    color: GlobalStyles.colors.text.primary,
    fontSize: 16,
  },
});
