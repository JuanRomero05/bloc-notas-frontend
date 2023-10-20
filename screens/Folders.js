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

          try {
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
          } catch (error) {
               Alert.alert("Error", "Ha ocurrido un error al realizar el fetch.")
          }

     }

     const deleteFolder = async (id) => {

          try {
               const token = await AsyncStorage.getItem('token');
               const res = await fetch(api + `/folders/${id}`, {
                    method: "DELETE",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
               })
               const response = await res
               if (response.status === 200) {
                    Alert.alert("Carpeta borrada", "Se ha borrado la carpeta exitosamente");
                    getFolders();
               } else {
                    const data = await response.json()
                    Alert.alert(`${response.status}`, `${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }

     }

     /* const editFolder = async (id) => {

          try {
               const token = await AsyncStorage.getItem('token');
               const sendBody = {
                    "title": "",
               }
               const res = await fetch(api + `/folders/${id}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(sendBody)
               })
               const response = await res
               if (response.status === 200) {
                    Alert.alert("Carpeta actualizada", "Se ha actualizado la carpeta exitosamente.");
                    getFolders();
               } else {
                    const data = await response.json()
                    Alert.alert(`${response.status}, ${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }

     } */

     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Carpetas</Text>
               </View>

               <View>
                    {foldersUser.length > 0 ? (
                         foldersUser.map((data, index) => (
                              <Folder key={index} data={data} deleteFolder={() => deleteFolder(data._id)} />
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
