import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

export default function SubItem({ name, amount, onDelete }) {
  return (
    <View style={styles.chipContainer}>
      <Chip style={styles.chip} onClose={onDelete}>
        <Text style={styles.nameText}>{name}</Text>
      </Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    margin: 4,
  },
  chip: {
    backgroundColor: GlobalStyles.colors.accent.secondary500,
  },
  textContainer: {
    // flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 6,
    borderColor: "white",
    width: "100%",
  },
  nameText: {
    fontSize: 14,
    color: GlobalStyles.colors.text.primary,
  },
  amountText: {
    fontSize: 12,
    color: GlobalStyles.colors.text.secondary,
    marginLeft: "auto",
  },
});
