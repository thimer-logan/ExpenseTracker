import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Card from "../ui/Card";
import { formatBalance, isValidNumber } from "../../utils/numbers";
import { categoryIconMap } from "../../constants/icons";
import Icon from "../ui/Icon";
import { ProgressBar } from "react-native-paper";
import BudgetSubItem from "./BudgetSubItem";

const BudgetItem = ({ name, total, remaining, subItems = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current; // Initial height is 0
  const subItemsHeight = 80 * subItems.length;

  // Create an opacity animated value based on the height
  const animatedOpacity = animatedHeight.interpolate({
    inputRange: [0, subItemsHeight],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const animatedHeight2 = animatedHeight.interpolate({
    inputRange: [0, subItemsHeight],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });

  const iconData = categoryIconMap[name];

  const spent =
    isValidNumber(total) && isValidNumber(remaining) ? total - remaining : NaN;

  const progress =
    isValidNumber(spent) && isValidNumber(total) ? spent / total : 0;

  const formattedTotal = isValidNumber(total) ? formatBalance(total, 0) : "---";
  const formattedSpent = isValidNumber(spent) ? formatBalance(spent, 0) : "---";

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : subItemsHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  return (
    <Card style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.mainContent}>
          <View style={styles.mainHeader}>
            <View style={styles.mainHeaderLeft}>
              <Icon
                family={iconData["family"]}
                name={iconData["name"]}
                size={24}
                color="white"
              />
              <Text style={styles.mainText}>{name}</Text>
            </View>
            <Text style={styles.mainText}>${formattedTotal}</Text>
          </View>
          <Animated.View
            style={[
              styles.subItemsContainer,
              { opacity: animatedOpacity, height: animatedHeight2 },
            ]}
          >
            <ProgressBar
              progress={progress}
              color={
                progress >= 1.0
                  ? GlobalStyles.colors.error300
                  : GlobalStyles.colors.accent.primary100
              }
              style={{ borderRadius: 6, height: 8 }}
            />

            <Text style={styles.progressText}>
              ${formattedSpent} of ${formattedTotal}
            </Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[styles.subItemsContainer, { height: animatedHeight }]}
      >
        {subItems &&
          subItems.map((subItem, index) => (
            <BudgetSubItem key={index} {...subItem} />
          ))}
      </Animated.View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    overflow: "hidden", // Important to hide the collapsed content
  },
  mainContent: {
    flexDirection: "column",
    gap: 12,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainText: {
    color: GlobalStyles.colors.text.primary,
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  progressText: {
    color: GlobalStyles.colors.text.secondary,
    fontSize: 12,
  },
  subItemsContainer: {
    gap: 12,
    overflow: "hidden",
  },
});

export default BudgetItem;
