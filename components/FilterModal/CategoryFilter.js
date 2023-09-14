import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MultiSelect from "react-native-multiple-select";
import { GlobalStyles } from "../../constants/styles";

export default function CategoryFilter({
  title,
  categories,
  selectedCategories,
  onSelectionChanged,
}) {
  const selectedItems = selectedCategories
    ? selectedCategories.map((item) => item.key)
    : [];
  const selectedItemsChangedHandler = (items) => {
    const selItems = categories.filter((item) => items.includes(item.key));
    onSelectionChanged(selItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>

      <MultiSelect
        items={categories}
        selectedItems={selectedItems}
        onSelectedItemsChange={selectedItemsChangedHandler}
        displayKey="value"
        uniqueKey="key"
        textInputProps={{ editable: false }}
        styleMainWrapper={{
          marginLeft: 12,
          borderRadius: 6,
          marginBottom: 8,
        }}
        styleItemsContainer={{
          marginHorizontal: 6,
          paddingBottom: 8,
        }}
        styleDropdownMenuSubsection={{
          marginHorizontal: 6,
          borderRadius: 6,
        }}
        styleInputGroup={{}}
        selectedItemTextColor={GlobalStyles.colors.accent.secondary}
        fixedHeight={true}
        hideTags
        hideSubmitButton
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dropdownContainer: {
    paddingBottom: 8,
  },
});
