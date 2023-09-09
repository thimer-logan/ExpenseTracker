import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import FilterModal from "../components/FilterModal/FilterModal";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import { Badge, IconButton, Searchbar } from "react-native-paper";

export default function AllExpenses() {
  const expenses = useSelector((state) => state.expenses);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses.expenses);
  const [sortedAndFilteredExpenses, setSortedAndFilteredExpenses] = useState(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    filterBy: null,
    sortBy: null,
    categories: null,
  });

  const debounceTimeout = useRef(null);

  const onChangeSearch = (query) => setSearchQuery(query);

  const sortPressHandler = () => {
    setModalVisible(true);
  };

  const modalCloseHandler = () => {
    setModalVisible(false);
  };

  const filterSubmitHandler = (settings) => {
    setModalVisible(false);
    setFilterSettings(settings);
  };

  useEffect(() => {
    const { filterBy, sortBy } = filterSettings;
    let data = [...expenses.expenses]; // Use let, as we'll modify this

    if (filterBy) {
      data = data.filter((item) => item.type === filterBy);
    }

    if (sortBy) {
      const sortFunctions = {
        Newest: (a, b) => new Date(b.date) - new Date(a.date),
        Oldest: (a, b) => new Date(a.date) - new Date(b.date),
        Highest: (a, b) => b.amount - a.amount,
        Lowest: (a, b) => a.amount - b.amount,
      };
      if (sortFunctions[sortBy]) {
        data.sort(sortFunctions[sortBy]);
      }
    }

    setSortedAndFilteredExpenses(data);
  }, [filterSettings, expenses.expenses]);

  // Hook for searchQuery
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchQuery) {
        const filtered = sortedAndFilteredExpenses.filter((item) =>
          item.name.includes(searchQuery)
        );
        setFilteredExpenses(filtered);
      } else {
        // If searchQuery is empty, just use the sortedAndFilteredExpenses list
        setFilteredExpenses(sortedAndFilteredExpenses);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery, sortedAndFilteredExpenses]);

  const numOfFiltersApplied = Object.keys(filterSettings).reduce((acc, key) => {
    return filterSettings[key] !== null ? acc + 1 : acc;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ flex: 3 }}
        />
        <View>
          <IconButton
            icon="sort"
            iconColor="white"
            onPress={sortPressHandler}
            size={30}
            style={{ flex: 1 }}
          />
          <Badge visible={numOfFiltersApplied > 0} style={styles.badge}>
            {numOfFiltersApplied}
          </Badge>
        </View>
      </View>
      <ExpensesOutput
        expenses={filteredExpenses}
        expensesPeriod="Total"
        fallbackText="No expenses found"
      />
      <FilterModal
        initialValue={filterSettings}
        visible={modalVisible}
        onClose={modalCloseHandler}
        onSubmit={filterSubmitHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.background.primary,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 0,
    backgroundColor: GlobalStyles.colors.accent.secondary,
  },
});
