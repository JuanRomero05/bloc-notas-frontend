/* Al Registrarse, se redigira a la screen de login */
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Config from "../Config";
import { Ionicons } from "@expo/vector-icons";

const Signup = () => {

     const api = Config.apiURL;

     const [showPassword, setShowPassword] = useState(false);

     const [Signup, setSignup] = useState({
          user: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
     });

     const navigation = useNavigation();

     const toggleShowPassword = () => {
          setShowPassword(!showPassword);
     };

     const handleChangeText = (name, value) => {
          setSignup({ ...Signup, [name]: value })
     }

     const validateEmail = (email) => {
          const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
          return emailRegex.test(email);
     }

     const validatePassword = (password) => {
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
          return passwordRegex.test(password);
     }

     const handleWelcome = async () => {

          try {
               //let baseURL = "https://bloc-api-production.up.railway.app/auth/signup";
               const body = {
                    "username": Signup.user,
                    "email": Signup.email,
                    "password": Signup.password
               }
               const res = await fetch(api + "/auth/signup", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
               });
               const response = await res
               if (response.status === 201) {
                    navigation.navigate("Welcome");
               } else {
                    const data = await response.json()
                    Alert.alert(`${response.status}, ${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }
     }


     return (
          <ScrollView style={styles.container}>
               <View style={styles.form}>
                    <Text>Registro</Text>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Nombre de usuario"
                              value={Signup.user}
                              onChangeText={(value) => handleChangeText("user", value)}
                         />
                    </View>

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Nombre"
                              value={Signup.name}
                              onChangeText={(value) => handleChangeText("name", value)}
                         />
                    </View>

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Apellido"
                              value={Signup.lastName}
                              onChangeText={(value) => handleChangeText("lastName", value)}
                         />
                    </View>

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Correo"
                              value={Signup.email}
                              onChangeText={(value) => handleChangeText("email", value)}
                         />
                    </View>

                    {Signup.email && !validateEmail(Signup.email) && (
                         <Text style={styles.errorText}>El correo debe contener en el nombre de usuario letras mayúsculas y minúsculas, dígitos del 0 al 9 y el carácter de punto. Seguido de un @, el dominio del correo, seguido del caracter punto y la terminación correspondiente.</Text>
                    )}

                    <View style={styles.inputGroupPassword}>
                         <TextInput
                              placeholder="Contraseña"
                              value={Signup.password}
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

                    {Signup.password && !validatePassword(Signup.password) && (
                         <Text style={styles.errorText}>La contraseña debe tener una longitud de almenos 8 caracteres, almenos un caracter numérico y letras mayúsculas o minúsculas</Text>
                    )}

                    <TouchableOpacity style={styles.buttonSave} onPress={handleWelcome}>
                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Registrarse</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
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
     inputGroupPassword: {
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
     },
     buttonDesc: {
          alignItems: 'center',
          backgroundColor: "#999999",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginTop: 5,
     },
     errorText: {
          color: "red",
          marginBottom: 20,
     },
});

export default Signup;
