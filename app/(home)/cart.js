import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/CartReducer";
import SwipeButton from "rn-swipe-button";
import arrowRight from "../../assets/arrow-right.png";

const cart = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [swiped, setSwiped] = useState(false);
  const instructions = [
    {
      id: "0",
      name: "Avoid Ringing",
      iconName: "bell",
    },
    {
      id: "1",
      name: "Leave at the door",
      iconName: "door-open",
    },
    {
      id: "2",
      name: "Directions to reach",
      iconName: "directions",
    },
    {
      id: "3",
      name: "Avoid Calling",
      iconName: "phone-alt",
    },
  ];
  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  /* console.log(total); */
  const handlePlaceOrder = () => {
    dispatch(cleanCart());
    router.replace({ pathname: "/order", params: { name: params?.name } });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "#F0F8FF" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text>{params?.name}</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            marginTop: 15,
            borderRadius: 8,
          }}
        >
          <Text>
            Delivery in <Text style={{ fontWeight: "500" }}>35 - 40 mins</Text>
          </Text>
        </View>
        <View style={{ marginVertical: 12 }}>
          <Text
            style={{
              textAlign: "center",
              letterSpacing: 3,
              fontSize: 15,
              color: "gray",
            }}
          >
            ITEM(S) ADDED
          </Text>
        </View>
        <View>
          {cart?.map((item, index) => (
            <Pressable
              style={{ backgroundColor: "white", padding: 10 }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 6,
                }}
              >
                <Text style={{ width: 200, fontSize: 14, fontWeight: "600" }}>
                  {item?.name}
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignItems: "center",
                    borderColor: "#BEBEBE",
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      dispatch(decrementQuantity(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "green",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>
                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "green",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(incrementQuantity(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "green",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  ₹{item?.price * item?.quantity}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "500" }}>
                  Quantity : {item?.quantity}
                </Text>
              </View>
            </Pressable>
          ))}
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Delivery Instructions
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions?.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <FontAwesome5
                      name={item?.iconName}
                      size={20}
                      color={"gray"}
                    />
                    <Text
                      style={{
                        width: 75,
                        fontSize: 13,
                        color: "#383838",
                        paddingTop: 10,
                        textAlign: "center",
                      }}
                    >
                      {item?.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Feather name="plus-circle" size={24} color="black" />
                <Text>Add more items</Text>
              </View>
              <AntDesign name="right" size={20} color="black" />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Entypo name="new-message" size={24} color="black" />
                <Text>Add more cooking instructions</Text>
              </View>
              <AntDesign name="right" size={20} color="black" />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={24}
                  color="black"
                />
                <Text>Don't send cutlery with this order</Text>
              </View>
              <AntDesign name="right" size={20} color="black" />
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Feeding India Donation</Text>
                <AntDesign name="checksquare" size={24} color="#fd5c63" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "gray" }}>
                  Working towards a malnutrition-free India
                </Text>
                <Text>₹3</Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 7,
                padding: 10,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  Item Total
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  ₹{total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  Delivery Fee
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  ₹15
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  Delivery Partner Fee
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  ₹50
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    To Pay
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    ₹{total + 65}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <View style={{ backgroundColor: "white", paddingBottom: 5 }}>
        <View style={{ alignItems: "center", marginTop: 5, borderColor:"gray", borderTopWidth:0.5}}>
          {/* SwipeButton component */}
          <SwipeButton
            thumbIconImageSource={arrowRight}
            disabled={swiped}
            onSwipeSuccess={() => {
              setSwiped(true);
              handlePlaceOrder();
            }}
            title="Swipe to place the order"
            titleColor="white"
            titleFontSize={18}
            railBackgroundColor="#fd5c63" // Red background color
            railFillBackgroundColor="#32de84"
            thumbIconBackgroundColor="#ffffff" // White thumb icon background color
            containerStyles={{ width: "90%", alignSelf: "center", height: 50 }} // Adjust width and height as needed
          />
        </View>
      </View>
    )}
    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#eee" }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>TOTAL</Text>
      <Text style={{ fontSize: 16, fontWeight: "700" }}>₹{total +65}</Text>
    </View>
    <View style={{backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#eee", justifyContent:"center", alignItems:"center",  }}>
      <Text style={{ fontSize: 12, fontWeight: "300" }}>Pay using Cash</Text>
      <Text style={{ marginTop: 5, fontSize: 12,fontWeight: "300" }}>Cash on Delivery</Text>
    </View>
  </View>
);
};
export default cart;

const styles = StyleSheet.create({});
