import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      name: name,
      email: email,
      password: password,
    });

    if(data?.user?.role == "authenticated"){
        Alert.alert("You have been successfully registered ","Please check your email for confirmation")
    }
    if(error){
        Alert.alert("Error while registering ","Please try again")
    }
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
          Zoma2 App
        </Text>
        <Image source={require('../../assets/Zoma2_app_icon.png')} style={{height:150, width:150, borderRadius:40, marginTop:15}}/>
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
            Register to your account
          </Text>
        </View>
        <View style={{ marginTop: 1 }}>
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
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="Enter your Name"
              value={name}
              onChangeText={(text) => setName(text)}
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
              marginTop: 10,
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
        <Pressable
          onPress={signUpNewUser}
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
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => router.replace("/login")}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
