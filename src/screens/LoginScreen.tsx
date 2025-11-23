import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { loginValidationSchema } from "../utils/validation";
import { login } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store";

interface LoginFormValues {
  username: string;
  password: string;
}

const defaultValues: LoginFormValues = {
  username: "",
  password: "",
};

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(login({
        username: values.username.trim(),
        password: values.password,
      })).unwrap();
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err.message || "Invalid username or password. Try: emilys / emilyspass",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <LinearGradient
        colors={["#1976D2", "#1565C0", "#0D47A1"]}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Feather name="map" size={48} color="#ffffff" />
        </View>
        <Text style={styles.title}>GoMate Transport</Text>
        <Text style={styles.subtitle}>Your Journey Starts Here</Text>
      </LinearGradient>
      <View style={styles.container}>
        <Text style={styles.helpText}>
          Demo: emilys / emilyspass
        </Text>
        <Formik
          initialValues={defaultValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit: submitForm,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputContainer}>
                  <Feather name="user" size={20} color="#757575" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter username"
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    placeholderTextColor="#9E9E9E"
                  />
                </View>
                {errors.username && touched.username ? (
                  <Text style={styles.error}>{errors.username}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <Feather name="lock" size={20} color="#757575" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter password"
                    style={styles.input}
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholderTextColor="#9E9E9E"
                  />
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => submitForm()}
                activeOpacity={0.8}
                disabled={loading}
              >
                <LinearGradient
                  colors={["#1976D2", "#1565C0"]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Login</Text>
                      <Feather name="arrow-right" size={20} color="#ffffff" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#E3F2FD",
    fontWeight: "500",
  },
  helpText: {
    textAlign: "center",
    color: "#757575",
    fontSize: 14,
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#424242",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#212121",
  },
  error: {
    color: "#d32f2f",
    marginTop: 6,
    fontSize: 13,
  },
  button: {
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginScreen;
