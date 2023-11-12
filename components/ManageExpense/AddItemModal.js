import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import Input from "../ui/Input";

export default function AddItemModal({ onSubmit, onCancel, ...modalProps }) {
  const [name, setName] = useState("");

  const nameChangedHandler = (text) => {
    setName(text);
  };

  const submitHandler = () => {
    onSubmit(name);
    setName("");
  };

  const cancelHandler = () => {
    setName("");
    onCancel();
  };

  return (
    <Modal {...modalProps}>
      <View style={styles.formModalContent}>
        <Input
          label="Name"
          //style={{ flex: 1 }}
          textInputProps={{
            onChangeText: nameChangedHandler,
            value: name,
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="text"
            textColor={GlobalStyles.colors.text.primary}
            style={{ flex: 1 }}
            onPress={cancelHandler}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            buttonColor={GlobalStyles.colors.accent.primary500}
            textColor={GlobalStyles.colors.text.primary}
            style={{ flex: 1 }}
            onPress={submitHandler}
          >
            Add
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formModalContent: {
    marginTop: "50%",
    backgroundColor: GlobalStyles.colors.background.primary,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 8,
  },
});
