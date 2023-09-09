import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import FilterOptions from "./FilterOptions";

export default function FilterModal({
  initialValue,
  visible,
  onClose,
  onSubmit,
}) {
  const [filterSettings, setFilterSettings] = useState(initialValue);

  useEffect(() => {
    setFilterSettings(initialValue);
  }, [visible]);

  const filterChangeHandler = (inputIdentifier, value) => {
    if (value === filterSettings[inputIdentifier]) {
      value = "";
    }

    setFilterSettings((prev) => {
      return {
        ...prev,
        [inputIdentifier]: value,
      };
    });
  };

  const resetHandler = () => {
    setFilterSettings({
      filterBy: null,
      sortBy: null,
      categories: null,
    });
  };

  const submitHandler = () => {
    onSubmit(filterSettings);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.centeredView} onPress={onClose}>
        <TouchableOpacity style={styles.modalView} activeOpacity={1}>
          <Button
            mode="contained-tonal"
            onPress={resetHandler}
            buttonColor={GlobalStyles.colors.accent.primary500}
            textColor={GlobalStyles.colors.text.primary}
            style={{ width: 100, height: 40, alignSelf: "flex-end" }}
          >
            Reset
          </Button>
          <View style={styles.contentContainer}>
            <FilterOptions
              title="Filter By"
              buttons={["Income", "Expense"]}
              value={filterSettings.filterBy}
              onChange={(value) => filterChangeHandler("filterBy", value)}
            />
            <FilterOptions
              title="Sort By"
              buttons={["Newest", "Oldest", "Highest", "Lowest"]}
              value={filterSettings.sortBy}
              onChange={(value) => filterChangeHandler("sortBy", value)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="elevated"
              onPress={submitHandler}
              buttonColor={GlobalStyles.colors.accent.primary500}
              textColor={GlobalStyles.colors.text.primary}
            >
              Apply
            </Button>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    maxHeight: screenHeight / 2, // Covers half the screen
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 6,
  },
});
