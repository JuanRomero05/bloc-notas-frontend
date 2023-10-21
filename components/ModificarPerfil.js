
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../Config";

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
     const [userEmpty, setUserEmpty] = useState(false) 
     const [firstNameEmpty, setFirstNameEmpty] = useState(false)
     const [lastNameEmpty, setLastNameEmpty] = useState(false)

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
                              <View>
                                   <TextInput
                                        style={styles.inputGroup}
                                        placeholder="Ingresa la nueva contraseña"
                                        value={password.newPassword}
                                        onChangeText={(value) => handleChangeTextPassword("newPassword", value)}
                                   />
                                   <TextInput
                                        style={styles.inputGroup}
                                        placeholder="Repite la contraseña"
                                        value={password.repeatPassword}
                                        onChangeText={(value) => handleChangeTextPassword("repeatPassword", value)}
                                   />
                              </View>
                         )
                    }

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
     }
});