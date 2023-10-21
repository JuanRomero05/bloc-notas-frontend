
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../Config";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";

const ModificarPerfil = () => {

     const api = Config.apiURL;

     const navigation = useNavigation();

     const [buttonDisabled, setButtonDisabled] = useState(false);

     useEffect(() => {
          setButtonDisabled(false)
     }, []);

     const route = useRoute()
     const { usernameParam, firstNameParam, lastNameParam } = route.params

     const [showTextInputUser, setShowTextInputUser] = useState(false);
     const [showTextInputName, setShowTextInputName] = useState(false);
     const [showTextInputLastName, setShowTextInputLastName] = useState(false);
     const [showTextInputPassword, setShowTextInputPassword] = useState(false);
     const [user, setUser] = useState(usernameParam);
     const [firstName, setFirstName] = useState(firstNameParam);
     const [lastName, setLastName] = useState(lastNameParam);
     const [password, setPassword] = useState({
          newPassword: "",
          repeatPassword: "",
     });
     const [showPassword, setShowPassword] = useState(false);
     const [confirmPassword, setConfirmPassword] = useState("");

     const [userEmpty, setUserEmpty] = useState(false)
     const [firstNameEmpty, setFirstNameEmpty] = useState(false)
     const [lastNameEmpty, setLastNameEmpty] = useState(false)

     const toggleShowPassword = () => {
          setShowPassword(!showPassword);
     };

     const handleButtonPressUser = () => {
          setShowTextInputUser(!showTextInputUser);
     }

     const handleButtonPressName = () => {
          setShowTextInputName(!showTextInputName);
     }

     const handleButtonPressLastName = () => {
          setShowTextInputLastName(!showTextInputLastName);
     }

     const handleButtonPressPassword = () => {
          setShowTextInputPassword(!showTextInputPassword);
     }

     const handleChangeTextUser = (value) => {
          setUser(value)
          if (value === "") {
               setUserEmpty(true)
          } else {
               setUserEmpty(false)
          }
     }

     const handleChangeTextName = (value) => {
          setFirstName(value)
          if (value === "") {
               setFirstNameEmpty(true)
          } else {
               setFirstNameEmpty(false)
          }
     }

     const handleChangeTextLastName = (value) => {
          setLastName(value)
          if (value === "") {
               setLastNameEmpty(true)
          } else {
               setLastNameEmpty(false)
          }
     }

     const handleChangeTextPassword = (name, value) => {
          setPassword({ ...password, [name]: value })
     }

     const validatePassword = (password) => {
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
          return passwordRegex.test(password);
     }

     const saveUser = async () => {
          try {
               setButtonDisabled(true)
               const token = await AsyncStorage.getItem('token');

               const sendBody = {
                    "username": user,
                    "firstName": firstName,
                    "lastName": lastName
               }

               const { newPassword, repeatPassword } = password

               if (newPassword === repeatPassword) {
                    // modificar la clave es opcional, si se ha agregado, se añade al body del request
                    if (newPassword !== "") {
                         sendBody.password = newPassword
                    }

                    const res = await fetch(api + "/users", {
                         method: "PUT",
                         headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                         },
                         body: JSON.stringify(sendBody)
                    });

                    const response = await res;
                    const data = await response.json()

                    if (response.status === 200) {
                         Alert.alert("Perfil modificado", "Se ha modificado el perfil correctamente")
                         navigation.navigate("Perfil");
                    } else {
                         setButtonDisabled(false)
                         Alert.alert(`Error ${response.status}`, `${data.msg}`)
                    }
               } else {
                    setButtonDisabled(false)
                    Alert.alert("Error", "Las claves no coinciden.")
               }
          } catch (error) {
               setButtonDisabled(false)
               Alert.alert("Error de conexion", error);
          }
     }



     return (
          <ScrollView style={styles.container}>
               <Text style={styles.title}>Modificar Perfil</Text>

               <View>
                    <TouchableOpacity style={styles.buttons} onPress={handleButtonPressUser}>
                         <Text style={{ color: "#025099", fontWeight: "bold", fontSize: 16 }}>Cambiar usuario</Text>
                    </TouchableOpacity>
                    {
                         showTextInputUser && (

                              <TextInput
                                   style={styles.inputGroup}
                                   placeholder="Introduce el nuevo usuario"
                                   value={user}
                                   onChangeText={(value) => handleChangeTextUser(value)}
                              />
                         )
                    }
                    {
                         userEmpty && (
                              <Text style={styles.errorText}>Este campo no puede estar vacío</Text>
                         )
                    }

                    <TouchableOpacity style={styles.buttons} onPress={handleButtonPressName}>
                         <Text style={{ color: "#025099", fontWeight: "bold", fontSize: 16 }}>Cambiar nombre</Text>
                    </TouchableOpacity>
                    {
                         showTextInputName && (
                              <TextInput
                                   style={styles.inputGroup}
                                   placeholder="Introduce el nuevo nombre"
                                   value={firstName}
                                   onChangeText={(value) => handleChangeTextName(value)}
                              />
                         )
                    }
                    {
                         firstNameEmpty && (
                              <Text style={styles.errorText}>Este campo no puede estar vacío</Text>
                         )
                    }

                    <TouchableOpacity style={styles.buttons} onPress={handleButtonPressLastName}>
                         <Text style={{ color: "#025099", fontWeight: "bold", fontSize: 16 }}>Cambiar apellido</Text>
                    </TouchableOpacity>
                    {
                         showTextInputLastName && (
                              <TextInput
                                   style={styles.inputGroup}
                                   placeholder="Ingresa el nuevo apellido"
                                   value={lastName}
                                   onChangeText={(value) => handleChangeTextLastName(value)}
                              />
                         )
                    }
                    {
                         lastNameEmpty && (
                              <Text style={styles.errorText}>Este campo no puede estar vacío</Text>
                         )
                    }

                    <TouchableOpacity style={styles.buttons} onPress={handleButtonPressPassword}>
                         <Text style={{ color: "#025099", fontWeight: "bold", fontSize: 16 }}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                    {
                         showTextInputPassword && (
                              <>
                                   <View style={styles.inputGroup}>
                                        <MaterialCommunityIcons name="lock-outline" size={24} color="black" style={{ marginEnd: 5 }} />
                                        <TextInput
                                             placeholder="Ingresa la nueva contraseña"
                                             value={password.newPassword}
                                             onChangeText={(value) => handleChangeTextPassword("newPassword", value)}
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

                                   {password.newPassword && !validatePassword(password.newPassword) && (
                                        <Text style={styles.errorText}>La contraseña debe tener una longitud de almenos 8 caracteres, almenos un caracter numérico y letras mayúsculas o minúsculas</Text>
                                   )}

                                   <View style={styles.inputGroup}>
                                        <MaterialCommunityIcons name="lock-outline" size={24} color="black" style={{ marginEnd: 5 }} />
                                        <TextInput
                                             placeholder="Repetir contraseña"
                                             value={password.repeatPassword}
                                             onChangeText={(value) => handleChangeTextPassword("repeatPassword", value)}
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

                              </>
                         )
                    }

                    {password.newPassword && password.repeatPassword && password.newPassword !== password.repeatPassword && (
                         <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
                    )}

                    <TouchableOpacity style={styles.buttonSave} onPress={saveUser} disabled={buttonDisabled}>
                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Guardar</Text>
                    </TouchableOpacity>

               </View>

          </ScrollView>
     );
};

export default ModificarPerfil;

const styles = StyleSheet.create({
     container: {
          /* flex: 1, */
          padding: 40,
     },
     title: {
          marginBottom: 15,
          marginTop: 0,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "left"
     },
     buttons: {
          alignItems: 'center',
          borderWidth: 1,
          borderColor: "#025099",

          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 15,
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
          borderWidth: 1,
          backgroundColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginTop: 30,
          marginBottom: 50
     },
     errorText: {
          color: "red",
          marginBottom: 20,
     },
});