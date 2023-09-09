import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

export default function FilterOptions({ title, buttons, value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.buttonContainer}>
        {buttons.map((button) => (
          <Button
            key={button}
            mode="outlined"
            onPress={() => onChange(button)}
            textColor={
              value === button ? GlobalStyles.colors.text.primary : "black"
            }
            buttonColor={
              value === button && GlobalStyles.colors.accent.secondary
            }
            style={[styles.button, value === button && styles.buttonSelected]}
          >
            {button}
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 6,
    gap: 6,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
