/* Es la primera screen que se muestra al entrar en la aplicación, en ella se muestra el Login */
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {

     const navigation = useNavigation();
     const handleSignup = () => {
          navigation.navigate("Signup")
     }

     return (
          <View style={styles.container}>
               <Image
                    source={require("../assets/OIG.png")}
                    style={styles.img}
               />
               <View>
                    <Login />
               </View>
               <TouchableOpacity style={styles.buttonRegister} onPress={handleSignup}>
                    <Text style={{ color: "#025099", fontSize: 16, fontWeight: "bold" }}>Registrarse</Text>
               </TouchableOpacity>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 40,
     },
     buttonRegister: {
          alignItems: 'center',
          borderWidth: 1,
          borderColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
     },
     img: {
          width: 250,
          height: 250,
          alignSelf: "center",
          borderRadius: 100
     }
});

export default Welcome;
