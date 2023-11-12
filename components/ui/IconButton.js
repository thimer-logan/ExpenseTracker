import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";

export default function IconButton({
  icon,
  family = "Ionicons",
  size,
  color,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Icon family={family} name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
