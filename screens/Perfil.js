import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Perfil = () => {

     const navigation = useNavigation();

     const handleModifyProfile = () => {
          navigation.navigate("ModificarPerfil");
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
                                   var i = 0;
                                   console.log(i++);
                                   await AsyncStorage.removeItem('token');
                                   console.log(i++);
                                   navigation.navigate("Welcome")
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
                         onPress: () => {
                              // Lógica para eliminar la cuenta
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
