import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
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
          <View style={[styles.container, styles.horizontal]}>
               <ActivityIndicator size="large" color="#025099" />
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
     },
     horizontal: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
     },
});


export default Loading;
