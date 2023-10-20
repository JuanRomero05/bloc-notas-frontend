import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => {

     const navigation = useNavigation();

     const verifyToken = async () => {
          const token = await AsyncStorage.getItem('token')
          if (token) {
               navigation.navigate("Menu")
          } else {
               navigation.navigate("Welcome")
          }
     }

     useEffect(() => {
          verifyToken()
     })

     return (
          <View>
               <Text>Loading</Text>
          </View>
     );
};

export default Loading;
