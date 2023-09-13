import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
//import { LineChart } from "react-native-gifted-charts";
import { GlobalStyles } from "../../constants/styles";
import {
  getBalanceByInterval,
  getBalanceDataPoints,
  getIntervalForTimeline,
  getTotalExpenses,
  getTotalIncome,
} from "../../utils/numbers";
import { getDateMinusDays, getMinusDaysFromFilter } from "../../utils/date";
import { LineChart } from "react-native-chart-kit";

export default function BalanceChart({ data, interval, totalBalance }) {
  const balancesInInterval = data.filter((expense) => {
    const days = getMinusDaysFromFilter(interval);
    const today = new Date();
    const dateNDaysAgo = getDateMinusDays(today, days);
    const date = new Date(expense.date);

    return date >= dateNDaysAgo && date <= today;
  });

  const startingBalance =
    totalBalance -
    (getTotalIncome(balancesInInterval) - getTotalExpenses(balancesInInterval));

  const balances = getBalanceByInterval(
    balancesInInterval,
    getMinusDaysFromFilter(interval),
    startingBalance
  );

  if (balances.length <= 0) {
    balances.push({
      value: totalBalance,
      date: new Date().toISOString(),
    });
    balances.push({
      value: totalBalance,
      date: new Date().toISOString(),
    });
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          //labels: ["January", "February", "March", "April"],
          datasets: [
            {
              data: balances.map((item) => item.value),
              withDots: false,
              color: (opacity = 255) => `rgba(39, 174, 96, ${opacity})`,
            },
          ],
        }}
        width={Dimensions.get("window").width - 48} // from react-native
        height={220}
        withInnerLines={false}
        transparent={true}
        fromZero={true}
        chartConfig={{
          //backgroundColor: "#1cc910",
          backgroundGradientFrom: GlobalStyles.colors.background.secondary,
          backgroundGradientTo: GlobalStyles.colors.background.secondary,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(39, 174, 96, ${opacity})`,
          labelColor: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            backgroundColor: "transparent",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />
      {/* <LineChart
        areaChart
        hideDataPoints
        isAnimated
        curved={true}
        animationDuration={1200}
        startFillColor={GlobalStyles.colors.accent.primary100}
        endFillColor={GlobalStyles.colors.accent.primary100}
        startOpacity={0.75}
        endOpacity={0}
        endSpacing={0}
        data={balancesInInterval}
        thickness={5}
        hideAxesAndRules
        hideYAxisText
        color={GlobalStyles.colors.accent.primary500}
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: "lightgray",
          pointerStripWidth: 2,
          pointerColor: "lightgray",
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          // activatePointersOnLongPress: true,
          // autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: (items) => {
            return (
              <View
                style={{
                  height: 90,
                  width: 100,
                  justifyContent: "center",
                  marginTop: -30,
                  marginLeft: -40,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  {items[0].date}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {"$" + items[0].value.toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    width: "150%",
  },
});
