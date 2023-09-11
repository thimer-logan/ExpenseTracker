import { useContext, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
//import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { useDispatch, useSelector } from "react-redux";
import { storeExpense, updateExpense, deleteExpense } from "../utils/http";

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const expenseId = route.params?.expenseId; // params could be undefined
  const isEditing = !!expenseId;
  const selectedExpense = expenses.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const onActionComplete = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      //await deleteExpense(expenseId);
      console.log(expenseId);
      dispatch(deleteExpense(expenseId, onActionComplete));
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsSubmitting(false);
    }
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        dispatch(updateExpense(expenseId, expenseData, onActionComplete));
        //await updateExpense(expenseId, expenseData);
      } else {
        dispatch(storeExpense(expenseData, onActionComplete));
        //dispatch(addExpense({ ...expenseData, id: id }));
      }
    } catch (error) {
      console.log(error);
      setError("Could not save expense - please try again later");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting && expenses.loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ExpenseForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedExpense}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error300}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.background.primary,
    //marginBottom: 100,
  },
  deleteContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.gray500,
    alignItems: "center",
  },
});
