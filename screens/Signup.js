/* Al Registrarse, se redigira a la screen de login */
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {

     const [Signup, setSignup] = useState({
          user: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
     });

     const navigation = useNavigation();
     const handleWelcome = () => {
          navigation.navigate("Welcome");
     }

     const handleChangeText = (name, value) => {
          setSignup({ ...Signup, [name]: value })
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

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Contraseña"
                              value={Signup.password}
                              onChangeText={(value) => handleChangeText("password", value)}
                         />
                    </View>

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

export default Signup;