import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./components/ui/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import Home from "./screens/Home";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { PaperProvider } from "react-native-paper";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  authenticateFailure,
  authenticateStart,
  authenticateSuccess,
  logout,
} from "./store/auth";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import Statistics from "./screens/Statistics";
import { clearStorage, isLoginTokenValid, loginWithToken } from "./utils/http";
import Budget from "./screens/Budget";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
        },
        headerTintColor: "white",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent.primary500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpense")}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="log-out-outline"
            size={24}
            color={tintColor}
            onPress={() => dispatch(logout())}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => {
            return (
              <View
                style={{
                  //position: "absolute",
                  //bottom: 20,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: GlobalStyles.colors.accent.primary500,
                }}
              >
                <Ionicons
                  name="add"
                  size={40}
                  color="white"
                  //style={{ alignContent: "center" }}
                />
              </View>
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Budget"
        component={Budget}
        options={{
          title: "Budget",
          tabBarLabel: "Budget",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-cash"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: "Statistics",
          tabBarLabel: "Statistics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent", // this covers iOS
          elevation: 0, // this covers Android
        },
        headerTintColor: "white",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent", // this covers iOS
          elevation: 0, // this covers Android
        },
        headerTintColor: "white",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {!auth.isAuthenticated && <AuthStack />}
      {auth.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  if (auth.loading) {
    return <LoadingOverlay />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background.main,
    alignItems: "center",
    justifyContent: "center",
  },
});
