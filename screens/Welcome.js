/* Es la primera screen que se muestra al entrar en la aplicación, en ella se redigirá a Login o Signup dependiendo del caso*/
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {

     const navigation = useNavigation();
     const handleSignup = () => {
          navigation.navigate("Signup")
     }

     return (
          <View>
               <Text>Welcome</Text>
               <View>
                    <Login />
               </View>
               <TouchableOpacity style={styles.buttonRegister} onPress={handleSignup}>
                    <Text>Registrarse</Text>
               </TouchableOpacity>
          </View>
     );
};

const styles = StyleSheet.create({
     buttonRegister: {
          alignItems: 'center',
          backgroundColor: "#025099",
          borderColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
     }
});

export default Welcome;
