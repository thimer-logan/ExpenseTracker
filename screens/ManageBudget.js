import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import BudgetForm from "../components/Budget/BudgetForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteBudget, storeBudget, updateBudget } from "../utils/http";
import IconButton from "../components/ui/IconButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageBudget = ({ route, navigation }) => {
  const budgets = useSelector((state) => state.budgets);
  const dispatch = useDispatch();

  const budgetId = route.params?.budgetId; // params could be undefined
  const isEditing = !!budgetId;
  const selectedBudget = budgets.budgets.find(
    (budget) => budget.id === budgetId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Budget" : "Add Budget",
    });
  }, [navigation, isEditing]);

  const onActionComplete = () => {
    navigation.goBack();
  };

  const deleteBudgetHandler = async () => {
    try {
      dispatch(deleteBudget(budgetId, onActionComplete));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmHandler = async (budgetData) => {
    try {
      if (isEditing) {
        dispatch(updateBudget(budgetId, budgetData, onActionComplete));
      } else {
        dispatch(storeBudget(budgetData, onActionComplete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  if (budgets.error.status && !budgets.loading) {
    return <ErrorOverlay message={budgets.error.message} />;
  }

  if (budgets.loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <BudgetForm
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          defaultValues={selectedBudget}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error300}
              size={36}
              onPress={deleteBudgetHandler}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ManageBudget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.background.primary,
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
