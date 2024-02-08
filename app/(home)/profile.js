import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../supabase";
import { router, useRouter } from "expo-router";

const profile = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage (replace 'authToken' with your storage key)
      await AsyncStorage.removeItem("authToken");

      // Call the provided onLogout function (if any)
      if (onLogout) {
        onLogout(); // You can pass any necessary parameters to onLogout if needed
      }

      // Logout user using Supabase Auth API
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error during Supabase sign-out:", error.message);
        // Display an error message if needed
        Alert.alert(
          "Error",
          "An error occurred during logout. Please try again."
        );
      } else {
        // Add any additional logout logic here

        // Display a success message
        Alert.alert("Logout", "You have been successfully logged out.");
      }
      router.replace("/(authenticate)/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Display an error message if needed
      Alert.alert(
        "Error",
        "An unexpected error occurred during logout. Please try again."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userImage}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png",
          }}
        />
        <Text style={styles.userName}>Abhishek</Text>
        <Text style={styles.userEmail}>jodduser@gmail.com</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  orderHistory: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default profile;
