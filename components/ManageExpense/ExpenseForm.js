import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "../ui/Input";
import { useState } from "react";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseTypes } from "../../constants/expenses";

import DropdownInput from "../ui/DropdownInput";
import { Button, IconButton, TextInput } from "react-native-paper";
import SubItemList from "./SubItemList";
import AddItemModal from "./AddItemModal";
import { useSelector } from "react-redux";

export default function ExpenseForm({
  onSubmit,
  onCancel,
  submitButtonLabel,
  defaultValues,
}) {
  const categories = useSelector((state) => state.expenses.categories);
  const budgets = useSelector((state) => state.budgets.budgets);
  const [isFormModalVisible, setFormModalVisible] = useState(false);
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
    type: {
      value: defaultValues ? defaultValues.type : "",
      isValid: true,
    },
    category: {
      value: defaultValues ? defaultValues.category : "",
      isValid: true,
    },
    budget: {
      value: defaultValues ? defaultValues.budget : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    items: {
      value: defaultValues ? defaultValues.items : [],
      isValid: true,
    },
  });

  const expenseTypeData = [
    { key: "1", value: ExpenseTypes[0] },
    { key: "2", value: ExpenseTypes[1] },
  ];

  const typeDefault = expenseTypeData.find(
    (item) => item.value === inputs.type.value
  );

  const categoryDefault = categories.find(
    (item) => item.value === inputs.category.value
  );

  const budgetData = budgets.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const budgetDefault = budgetData.find(
    (item) => item.value === inputs.budget.value
  );

  const getBudgetCategory = (name) => {
    return budgets.find((item) => item.name === name)?.category;
  };

  const itemAddedHandler = (item) => {
    setFormModalVisible(false);
    const newItems = [...inputs.items.value, item];
    inputChangedHandler("items", newItems);
  };

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value, // convert string to number
      date: new Date(inputs.date.value).toISOString(),
      name: inputs.name.value,
      type: inputs.type.value,
      category: inputs.category.value,
      budget: inputs.budget.value,
      description: inputs.description.value,
      items: inputs.items.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const nameIsValid = expenseData.name.trim().length > 0;
    const typeIsValid = ExpenseTypes.includes(expenseData.type);
    const budgetIsValid = budgetData.some(
      (budget) => budget.value === expenseData.budget
    );
    let categoryIsValid = categories.some(
      (category) => category.value === expenseData.category
    );

    // auto fill the category field if we have selected a budget
    if (!categoryIsValid && budgetIsValid) {
      const matchingBudget = budgets.find(
        (item) => item.name === expenseData.budget
      );
      if (matchingBudget) {
        expenseData.category = matchingBudget.category;
        categoryIsValid = true;
      }
    }

    if (
      !(
        amountIsValid &&
        dateIsValid &&
        nameIsValid &&
        typeIsValid &&
        categoryIsValid
      )
    ) {
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          name: {
            value: prev.name.value,
            isValid: nameIsValid,
          },
          type: { value: prev.type.value, isValid: typeIsValid },
          category: { value: prev.category.value, isValid: categoryIsValid },
          budget: { value: prev.budget.value, isValid: budgetIsValid },
          description: { value: prev.description.value, isValid: true },
          items: { value: prev.items.value, isValid: true },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.name.isValid ||
    !inputs.type.isValid ||
    !inputs.category.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <Input
        label="Name"
        //style={{ flex: 1 }}
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
      <DropdownInput
        label="Type"
        invalid={!inputs.type.isValid}
        data={expenseTypeData}
        setSelected={inputChangedHandler.bind(this, "type")}
        defaultOption={typeDefault}
      />
      <DropdownInput
        label="Category"
        invalid={!inputs.category.isValid}
        data={categories}
        setSelected={inputChangedHandler.bind(this, "category")}
        defaultOption={categoryDefault}
      />
      <DropdownInput
        label="Link to Budget"
        invalid={!inputs.budget.isValid}
        data={
          inputs.category.isValid && inputs.category.value !== ""
            ? budgetData.filter(
                (item) =>
                  getBudgetCategory(item.value) === inputs.category.value
              )
            : budgetData
        }
        setSelected={inputChangedHandler.bind(this, "budget")}
        defaultOption={budgetDefault}
      />
      <Input
        label="Description"
        textInputProps={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          placeholder: "Optional",
        }}
      />
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerHeader}>
          <Text style={styles.label}>Items</Text>
          <IconButton
            icon="plus"
            mode="outlined"
            size={12}
            onPress={() => setFormModalVisible(true)}
            iconColor="white"
            containerColor={GlobalStyles.colors.accent.secondary}
            style={{ borderColor: "transparent" }}
          />
        </View>
        <SubItemList
          data={inputs.items.value}
          onChange={inputChangedHandler.bind(this, "items")}
        />
      </View>
      <AddItemModal
        onSubmit={itemAddedHandler}
        onCancel={() => setFormModalVisible(false)}
        animationType="slide"
        transparent={true}
        visible={isFormModalVisible}
        onRequestClose={() => setFormModalVisible(false)}
      />

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
}

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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  itemContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  itemContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.text.primary,
    marginBottom: 4,
  },
});
