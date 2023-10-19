/* Es la primera screen que se muestra al entrar en la aplicación, en ella se muestra el Login */
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = () => {
     const [session, setSession] = useState(true)
     const navigation = useNavigation();

     // al abrir la aplicacion, verifica si ya hay una sesion iniciada
     useEffect(() => {
          const verifyToken = async () => {
               const token = await AsyncStorage.getItem('token')
               if (token) {
                    navigation.navigate('Menu')
               } else {
                    setSession(false)
               }
          }

          verifyToken()
     }, [])

     const handleSignup = () => {
          navigation.navigate("Signup")
     }

     return (
          <View>
               {/*TODO: implementar loading donde dice null*/}
               { session ? null : (
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
                    )
               }
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
