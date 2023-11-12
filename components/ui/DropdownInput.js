import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { SelectList } from "react-native-dropdown-select-list";

export default function DropdownInput({
  label,
  style,
  data,
  invalid,
  setSelected,
  defaultOption,
}) {
  const itemSelectedHandler = (key) => {
    const obj = data.find((item) => item.key === key);
    setSelected(obj ? obj.value : undefined);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <SelectList
        setSelected={itemSelectedHandler}
        defaultOption={defaultOption}
        data={data}
        save="key"
        search={false}
        boxStyles={{
          backgroundColor: GlobalStyles.colors.background.secondary,
          borderColor: "transparent",
        }}
        inputStyles={{ color: GlobalStyles.colors.text.primary, fontSize: 18 }}
        dropdownTextStyles={{
          color: GlobalStyles.colors.text.primary,
          fontSize: 18,
        }}
        dropdownStyles={{
          backgroundColor: GlobalStyles.colors.background.secondary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.text.primary,
    marginBottom: 4,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
});
