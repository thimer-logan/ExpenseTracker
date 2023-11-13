import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./components/ui/IconButton";
import Home from "./screens/Home";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { useEffect } from "react";
import { logout } from "./store/auth";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import { loginWithToken } from "./utils/http";
import Budget from "./screens/Budget";
import ManageBudget from "./screens/ManageBudget";
import Statistics from "./screens/Statistics";

const HomeStack = createNativeStackNavigator();
const BudgetStack = createNativeStackNavigator();
const StatisticsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoutButton({ tintColor = "white" }) {
  const dispatch = useDispatch();
  return (
    <IconButton
      icon="log-out-outline"
      size={24}
      color={tintColor}
      onPress={() => dispatch(logout())}
    />
  );
}

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "white",
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: ({ tintColor }) => <LogoutButton tintColor={tintColor} />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("ManageExpense")}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{ title: "All Transactions" }}
      />
      <HomeStack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: "modal",
        }}
      />
    </HomeStack.Navigator>
  );
}

function BudgetStackScreen({ navigation }) {
  return (
    <BudgetStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "white",
        headerShadowVisible: false,
      }}
    >
      <BudgetStack.Screen
        name="Budget"
        component={Budget}
        options={{
          headerLeft: ({ tintColor }) => <LogoutButton tintColor={tintColor} />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("ManageBudget")}
            />
          ),
        }}
      />
      <BudgetStack.Screen
        name="ManageBudget"
        component={ManageBudget}
        options={{
          presentation: "modal",
        }}
      />
    </BudgetStack.Navigator>
  );
}

function StatisticsStackScreen({ navigation }) {
  return (
    <StatisticsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "white",
        headerShadowVisible: false,
      }}
    >
      <StatisticsStack.Screen
        name="Statistics"
        component={Statistics}
        options={{
          headerLeft: ({ tintColor }) => <LogoutButton tintColor={tintColor} />,
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="add"
          //     size={24}
          //     color={tintColor}
          //     onPress={() => navigation.navigate("ManageBudget")}
          //   />
          // ),
        }}
      />
    </StatisticsStack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.background.secondary,
          shadowColor: "transparent",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent.primary500,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BudgetTab"
        component={BudgetStackScreen}
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
        name="StatisticsTab"
        component={StatisticsStackScreen}
        options={{
          title: "Statistics",
          tabBarLabel: "Statistics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Signup" component={Signup} />
    </HomeStack.Navigator>
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
