import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

export default function TimelineSelector({
  buttons,
  value,
  onChange,
  buttonStyle,
  textStyle,
}) {
  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button}
          style={[
            styles.button,
            buttonStyle,
            value === button && styles.buttonSelected,
          ]}
          onPress={() => onChange(button)}
        >
          <Text
            style={
              value === button ? styles.textSelected : [styles.text, textStyle]
            }
          >
            {button}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.text.secondary,
  },
  buttonSelected: {
    backgroundColor: GlobalStyles.colors.accent.primary500,
  },
  text: {
    fontSize: 14,
    color: GlobalStyles.colors.text.secondary,
  },
  textSelected: {
    color: GlobalStyles.colors.text.primary,
  },
});
