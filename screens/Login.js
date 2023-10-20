/* Al hacer el login correctamente se redigira a la screen Menu */
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Config from "../Config";

const Login = () => {

     const api = Config.apiURL;

     const [showPassword, setShowPassword] = useState(false);

     const [Login, setLogin] = useState({
          email: "",
          password: ""
     });

     const navigation = useNavigation();

     const toggleShowPassword = () => {
          setShowPassword(!showPassword);
     };

     const handleChangeText = (name, value) => {
          setLogin({ ...Login, [name]: value })
     }

     const handleLogin = async () => {
          try {

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
                    setLogin({
                         "email": "",
                         "password": ""
                    })
                    navigation.navigate("Menu");
               } else {
                    Alert.alert(`${response.status}`, `${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }
     }

     return (
          <ScrollView>
               <Text style={styles.title}>Iniciar Sesión</Text>
               <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="email-outline" size={24} color="black" style={{ marginEnd: 5 }} />
                    <TextInput
                         placeholder="Ingresa tu correo"
                         value={Login.email}
                         onChangeText={(value) => handleChangeText("email", value)}
                    />
               </View>

               <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="lock-outline" size={24} color="black" style={{ marginEnd: 5 }} />
                    <TextInput
                         placeholder="Ingresa tu contraseña"
                         value={Login.password}
                         onChangeText={(value) => handleChangeText("password", value)}
                         secureTextEntry={!showPassword}
                         style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={toggleShowPassword}>
                         <Ionicons
                              name={showPassword ? "eye-off" : "eye"}
                              size={24}
                              color="black"
                         />
                    </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.buttonSave} onPress={handleLogin}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Iniciar sesión</Text>
               </TouchableOpacity>
          </ScrollView>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#fff",
     },
     title: {
          marginBottom: 15,
          marginTop: 25,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "left"
     },
     form: {
          padding: 40,
     },
     inputGroup: {
          flexDirection: 'row',
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
