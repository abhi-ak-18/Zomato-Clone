import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        /* console.log("Token from AsyncStorage:", token); */
        if (token) {
          router.replace("/(home)");
        } else {
          return;
        }
      } catch (error) {
        console.log("Error:", error);
        router.replace("/(authenticate)/login");
      }
    };
    checkLogin();
  }, []);

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      /* console.log("Data:", data); */
      if (data && data.session && data.user) {
        const token = data.session.access_token;
        /* console.log("Token in sign in:", token); */

        // Check if the token is truthy
        if (token) {
          AsyncStorage.setItem("authToken", token);
          router.replace("/(home)");
        } else {
          // Handle the case when the token is not received properly
          Alert.alert("Login Error", "Invalid token received");
        }
      } else {
        // Handle the case when session or user is null
        Alert.alert("Login Error", "Invalid email or password");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // Handle other errors
      Alert.alert("Login Error", "Please try again");
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Set loading to false when login process completes
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
          Zoma2 App
        </Text>
        <Image
          source={require("../../assets/Zoma2_app_icon.png")}
          style={{ height: 150, width: 150, borderRadius: 40, marginTop: 15 }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "red",
            }}
          >
            Log in to your account
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="Enter your Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "gray", marginVertical: 10, width: 300 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="Enter your Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ color: "gray", marginVertical: 10, width: 300 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text>Keep me logged in</Text>
          <Text>Forgot password?</Text>
        </View>
        <Pressable
          onPress={signUpWithEmail}
          style={{
            width: 200,
            backgroundColor: "#fd5c63",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            marginTop: 50,
          }}
        >
            {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => router.replace("/register")}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
