import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthContent from "../components/Auth/AuthContent";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginHandler = ({ email, password }) => {
    try {
      dispatch(login(email, password));
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in. Please check your credentials"
      );
    }
  };

  if (auth.loading) {
    return <LoadingOverlay />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

const styles = StyleSheet.create({});
