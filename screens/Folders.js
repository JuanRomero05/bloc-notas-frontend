//import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Folder from "../components/Folder";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";

const Folders = () => {

     const api = Config.apiURL;

     const [foldersUser, setFoldersUser] = useState([]);

     useEffect(() => {
          getFolders();
     });

     const getFolders = async () => {

          //const baseURL = "https://bloc-api-production.up.railway.app/folders/user";
          const token = await AsyncStorage.getItem('token');
          const res = await fetch(api + "/folders/user", {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
               },
          });
          const response = await res;
          const data = await response.json()
          setFoldersUser(data);
     }

     const deleteFolder = async (id) => {
          const sendBody = {
               id: id
          }
          const token = await AsyncStorage.getItem('token');
          await fetch(api + "/folderDelete", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
               },
               body: JSON.stringify(sendBody),
          })
               .then((res) => res.json())
               .catch((error) => {
                    Alert.alert("Error", "Se ha producido un error");
               })
               .then((response) => {
                    if (response.message == "error") {
                         Alert.alert("¡Error!", "Error al recibir respuesta");
                    } else {
                         //Obtenemos la respuesta del backend
                         getFolders();
                    }
               });
     }

     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Carpetas</Text>
               </View>

               <View>
                    {foldersUser.length > 0 ? (
                         foldersUser.map((data, index) => (
                              <Folder key={index} data={data} deleteFolder={deleteFolder} />
                         ))
                    ) : (
                         <Text style={styles.text}>No existe ninguna carpeta...</Text>
                    )}

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
          alignItems: "center",
          marginTop: 20,
     },
     title: {
          fontSize: 18,
          color: "#000",
          fontWeight: "bold",
          textAlign: "center",
     },
     text: {
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 220,
     }
});

export default Folders;
