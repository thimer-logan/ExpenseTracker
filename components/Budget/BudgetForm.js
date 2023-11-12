import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getFormattedDate } from "../../utils/date";
import Input from "../ui/Input";
import { GlobalStyles } from "../../constants/styles";
import DropdownInput from "../ui/DropdownInput";
import { Button } from "react-native-paper";

const BudgetForm = ({
  onSubmit,
  onCancel,
  submitButtonLabel,
  defaultValues,
}) => {
  const categories = useSelector((state) => state.expenses.categories);
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? getFormattedDate(new Date(defaultValues.date))
        : "",
      isValid: true,
    },
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    category: {
      value: defaultValues ? defaultValues.category : "",
      isValid: true,
    },
  });
  const categoryDefault = categories.find(
    (item) => item.value === inputs.category.value
  );

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const budgetData = {
      amount: +inputs.amount.value, // convert string to number
      date: new Date(inputs.date.value).toISOString(),
      name: inputs.name.value,
      category: inputs.category.value,
    };

    const amountIsValid = !isNaN(budgetData.amount) && budgetData.amount > 0;
    const dateIsValid = budgetData.date.toString() !== "Invalid Date";
    const nameIsValid = budgetData.name.trim().length > 0;
    const categoryIsValid = categories.some(
      (category) => category.value === budgetData.category
    );

    if (!(amountIsValid && dateIsValid && nameIsValid && categoryIsValid)) {
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          name: {
            value: prev.name.value,
            isValid: nameIsValid,
          },
          category: { value: prev.category.value, isValid: categoryIsValid },
        };
      });
      return;
    }

    onSubmit(budgetData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.name.isValid ||
    !inputs.category.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Budget</Text>
      <DropdownInput
        label="Category"
        invalid={!inputs.category.isValid}
        data={categories}
        setSelected={inputChangedHandler.bind(this, "category")}
        defaultOption={categoryDefault}
      />
      <Input
        label="Name"
        invalid={!inputs.name.isValid}
        textInputProps={{
          onChangeText: inputChangedHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <View style={styles.innerContainer}>
        <Input
          label="Amount"
          style={{ flex: 1 }}
          invalid={!inputs.amount.isValid}
          textInputProps={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={{ flex: 1 }}
          invalid={!inputs.date.isValid}
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>Form is invalid. Check your inputs</Text>
      )}
      <View style={styles.buttons}>
        <Button
          onPress={onCancel}
          style={styles.button}
          textColor={GlobalStyles.colors.text.primary}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={submitHandler}
          style={styles.button}
          buttonColor={GlobalStyles.colors.accent.primary500}
          textColor={GlobalStyles.colors.text.primary}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default BudgetForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 12,
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.text.primary,
    marginBottom: 4,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
