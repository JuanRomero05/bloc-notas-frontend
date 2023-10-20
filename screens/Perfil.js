import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../Config";


const Perfil = ({ navigation }) => {

     const api = Config.apiURL;

     const redirect = useNavigation();

     const handleModifyProfile = async () => {
          try {

               const token = await AsyncStorage.getItem('token');
               const res = await fetch(api + "/users", {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
               });


               const response = await res;

               const data = await response.json()


               if (response.status === 200) {

                    const { username, password, firstName, lastName } = data

                    const params = {
                         usernameParam: username,
                         passwordParam: password,
                         firstNameParam: firstName,
                         lastNameParam: lastName
                    }

                    navigation.navigate("ModificarPerfil", params);
               } else {
                    Alert.alert("Error", data.msg)
               }

          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }
     }

     const handleLogout = () => {
          Alert.alert(
               'Cerrar Sesión',
               '¿Está seguro que desea cerrar sesión?',
               [
                    {
                         text: 'Cancelar',
                         style: 'cancel',
                    },
                    {
                         text: 'Confirmar',
                         onPress: async () => {
                              try {
                                   await AsyncStorage.removeItem('token');
                                   navigation.jumpTo("Inicio");
                                   redirect.navigate("Welcome");
                              } catch (error) {
                                   Alert.alert("Error", "Ha ocurrido un error al intentar cerrar sesión");
                              }
                         },
                    },
               ],
               { cancelable: false }
          );
     };

     const handleDeleteAccount = () => {
          Alert.alert(
               'Eliminar Cuenta',
               '¿Está seguro que desea eliminar la cuenta permantemente?',
               [
                    {
                         text: 'Cancelar',
                         style: 'cancel',
                    },
                    {
                         text: 'Confirmar',
                         onPress: async () => {
                              try {
                                   const token = await AsyncStorage.getItem('token');
                                   const res = await fetch(api + "/users", {
                                        method: "DELETE",
                                        headers: {
                                             "Content-Type": "application/json",
                                             "Authorization": `Bearer ${token}`
                                        },
                                   })
                                   const response = await res
                                   if (response.status === 200) {
                                        Alert.alert("Cuenta Eliminada", "Se ha eliminado la cuenta correctamente.");
                                        await AsyncStorage.removeItem('token');
                                        navigation.navigate("Welcome")
                                   } else {
                                        const data = await response.json()
                                        Alert.alert(`${response.status}`, `${data.msg}`)
                                   }
                              } catch (error) {
                                   Alert.alert("Error al realizar el fetch", error);
                              }
                         },
                    },
               ],
               { cancelable: false }
          );
     }

     return (
          <View style={styles.container}>
               <Text style={styles.title}>Ajustes</Text>

               <TouchableOpacity style={styles.buttonModify} onPress={handleModifyProfile}>
                    <Text style={{ color: "#025099", fontWeight: "bold", fontSize: 16, marginEnd: 5, marginStart: 75 }}>Modificar perfil</Text>
                    <MaterialCommunityIcons name="account-wrench-outline" size={24} color="#025099" />
               </TouchableOpacity>

               <TouchableOpacity style={styles.buttonsLeft} onPress={handleLogout}>
                    <Text style={{ color: "red", fontWeight: "bold", fontSize: 16, marginEnd: 5, marginStart: 75 }}>Cerrar sesión</Text>
                    <MaterialCommunityIcons name="arrow-collapse-right" size={24} color="red" />
               </TouchableOpacity>

               <TouchableOpacity style={styles.buttonsLeft} onPress={handleDeleteAccount}>
                    <Text style={{ color: "red", fontWeight: "bold", fontSize: 16, marginEnd: 5, marginStart: 75 }}>Eliminar cuenta</Text>
                    <MaterialCommunityIcons name="account-remove-outline" size={24} color="red" />
               </TouchableOpacity>
          </View>
     );
};

export default Perfil;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 40,
     },
     title: {
          marginBottom: 15,
          marginTop: 20,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "left"
     },
     buttonModify: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 15,
     },
     buttonsLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: "red",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 15,
     }
});
