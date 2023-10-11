import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

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
                         onPress: () => {
                              // Lógica para cerrar sesión
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
               <Text style={{ marginBottom: 15 }}>Ajustes</Text>

               <TouchableOpacity style={styles.buttonModify} onPress={handleModifyProfile}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Modificar perfil</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.buttonsLeft} onPress={handleLogout}>
                    <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>Cerrar sesión</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.buttonsLeft} onPress={handleDeleteAccount}>
                    <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>Eliminar cuenta</Text>
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
     buttonModify: {
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 15,
     },
     buttonsLeft: {
          alignItems: 'center',
          borderWidth: 1,
          borderColor: "red",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 15,
     }
});
