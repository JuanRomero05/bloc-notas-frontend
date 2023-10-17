/* Al hacer el login correctamente se redigira a la screen Menu */
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";

const Login = () => {

     const api = Config.apiURL;

     const [Login, setLogin] = useState({
          email: "",
          password: ""
     });

     const navigation = useNavigation();

     const handleChangeText = (name, value) => {
          setLogin({ ...Login, [name]: value })
     }

     const handleLogin = async () => {
          try {
               //let baseURL = "https://bloc-api-production.up.railway.app/auth/login";
               const body = {
                    "email": Login.email,
                    "password": Login.password
               }
               const res = await fetch(api + "/auth/login", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
               });
               const response = await res
               const data = await response.json()
               if (response.status === 200) {
                    await AsyncStorage.setItem('token', data.token);
                    navigation.navigate("Menu");
               } else {
                    Alert.alert(`${response.status}, ${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }
     }

     return (
          <View>
               <View /* style={styles.form} */>
                    <Text style={{ marginBottom: 15, marginTop: 25 }}>Iniciar Sesión</Text>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Ingresa tu correo"
                              value={Login.email}
                              onChangeText={(value) => handleChangeText("email", value)}
                         />
                    </View>

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Ingresa tu contraseña"
                              value={Login.password}
                              onChangeText={(value) => handleChangeText("password", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={handleLogin}>
                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Iniciar sesión</Text>
                    </TouchableOpacity>

               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#fff",
     },
     titleContainer: {
          alignItems: 'center',
          marginTop: 10,
     },
     title: {
          fontSize: 18,
          color: "#000",
          fontWeight: "bold",
          textAlign: "center"
     },
     form: {
          padding: 40,
     },
     inputGroup: {
          padding: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 15,
     },
     buttonSave: {
          alignItems: 'center',
          backgroundColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 10
     },
     buttonDesc: {
          alignItems: 'center',
          backgroundColor: "#999999",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginTop: 5,
     },
});

export default Login;
