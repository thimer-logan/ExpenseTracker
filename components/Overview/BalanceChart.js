import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import { GlobalStyles } from "../../constants/styles";
import {
  getBalanceByInterval,
  getIntervalForTimeline,
} from "../../utils/numbers";

export default function BalanceChart({ data, interval }) {
  const lineData = [
    { value: 0 },
    { value: 20 },
    { value: 18 },
    { value: 40 },
    { value: 36 },
    { value: 60 },
    { value: 54 },
    { value: 85 },
  ];

  const balances = getBalanceByInterval(data, getIntervalForTimeline(interval));
  console.log(balances);

  return (
    <View style={styles.container}>
      <LineChart
        areaChart
        hideDataPoints
        isAnimated
        curved={true}
        adjustToWidth
        animationDuration={1200}
        startFillColor={GlobalStyles.colors.accent.primary100}
        endFillColor={GlobalStyles.colors.accent.primary100}
        startOpacity={0.75}
        endOpacity={0}
        endSpacing={0}
        data={lineData}
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
                {/* <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  {items[0].date}
                </Text> */}

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    width: "150%",
  },
});
