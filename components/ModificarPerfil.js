import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const ModificarPerfil = () => {

     const [showTextInputUser, setShowTextInputUser] = useState(false);
     const [showTextInputName, setShowTextInputName] = useState(false);
     const [showTextInputLastName, setShowTextInputLastName] = useState(false);
     const [showTextInputPassword, setShowTextInputPassword] = useState(false);
     const [user, setUser] = useState({ user: "" });
     const [nombre, setNombre] = useState({ nombre: "" });
     const [lastName, setLastName] = useState({ lastName: "" });
     const [password, setPassword] = useState({
          newPassword: "",
          repeatPassword: "",
     });

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

     const handleChangeTextUser = (name, value) => {
          setUser({ ...user, [name]: value })
     }

     const handleChangeTextName = (name, value) => {
          setNombre({ ...nombre, [name]: value })
     }

     const handleChangeTextLastName = (name, value) => {
          setLastName({ ...lastName, [name]: value })
     }

     const handleChangeTextPassword = (name, value) => {
          setPassword({ ...password, [name]: value })
     }

     /* const Save = () => {
          setUser({
               user: "",
          });
     } */

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
                                   value={user.user}
                                   onChangeText={(value) => handleChangeTextUser("user", value)}
                              />

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
                                   value={nombre.nombre}
                                   onChangeText={(value) => handleChangeTextName("nombre", value)}
                              />
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
                                   value={lastName.lastName}
                                   onChangeText={(value) => handleChangeTextLastName("lastName", value)}
                              />
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

                    <TouchableOpacity style={styles.buttonSave} /* onPress={Save} */>
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
