import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import SubItem from "./SubItem";

function renderSubItem(itemData, deleteItemHandler) {
  return (
    <SubItem
      name={itemData.item}
      onDelete={deleteItemHandler.bind(this, itemData.index)}
    />
  );
}

export default function SubItemList({ data, onChange }) {
  const deleteItemHandler = (id) => {
    const newData = [...data];
    newData.splice(id, 1);
    onChange(newData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(itemData) => renderSubItem(itemData, deleteItemHandler)}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        contentContainerStyle={{
          alignSelf: "flex-start",
        }}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.background.secondary,
  },
});
