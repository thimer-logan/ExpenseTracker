import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

const Icon = ({ family, ...iconProps }) => {
  switch (family) {
    case "FontAwesome":
      return <FontAwesome {...iconProps} />;
    case "FontAwesome5":
      return <FontAwesome5 {...iconProps} />;
    case "MaterialIcons":
      return <MaterialIcons {...iconProps} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons {...iconProps} />;
    case "Octicons":
      return <Octicons {...iconProps} />;
    default:
      return <Ionicons {...iconProps} />;
  }
};

export default Icon;

const styles = StyleSheet.create({});
