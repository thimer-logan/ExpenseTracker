import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../utils/http";

export default function Signup() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signupHandler = ({ email, password }) => {
    try {
      dispatch(createUser(email, password));
    } catch (error) {
      Alert.alert("Authentication Failed", "Could not create user");
    }
  };

  if (auth.loading) {
    return <LoadingOverlay />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

const styles = StyleSheet.create({});
