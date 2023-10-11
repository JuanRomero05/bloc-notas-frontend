/* Al hacer el login correctamente se redigira a la screen Menu */
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {

     const [Login, setLogin] = useState({
          user: "",
          password: ""
     });

     const navigation = useNavigation();

     const handleLogin = () => {
          navigation.navigate("Menu");
     }

     const handleChangeText = (name, value) => {
          setLogin({ ...Login, [name]: value })
     }

     /* const iniciarSesion = () => {
          setLogin({
               user: "",
               password: "",
          });
     } */

     return (
          <View>

               <View style={styles.form}>
                    <Text>Iniciar Sesión</Text>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Ingresa tu usuario"
                              value={Login.user}
                              onChangeText={(value) => handleChangeText("user", value)}
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
