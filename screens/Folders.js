//import React from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Folder from "../components/Folder";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";

const Folders = () => {

     const api = Config.apiURL;

     const [username, setUsername] = useState("")
     const [foldersUser, setFoldersUser] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          getUsername()
          getFolders()
     })

     const getUsername = async () => {
          try {
               const token = await AsyncStorage.getItem('token')               
               const res = await fetch(api + '/users', {
                    method: 'GET',
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
               })
               const response = await res
               const data = await response.json()
               setUsername(data.username)
          } catch (error) {
               Alert.alert('Error de conexion', error)
          }
     }

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
               setIsLoading(false)
          } catch (error) {
               Alert.alert("Error de conexion", error)
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
                    Alert.alert(`Error ${response.status}`, `${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error de conexion", error);
          }

     }

     return (
          <>
               {
                    !isLoading ? (
                         <ScrollView style={styles.container}>
                              <View style={styles.titleContainer}>
                                   <Text style={styles.title}>Carpetas de {username}</Text>
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
                    ) : (
                         <View style={[styles.containerSpinner, styles.horizontal]}>
                              <ActivityIndicator size="large" color="#025099" />
                         </View>
                    )
               }
          </>

     );
};

const styles = StyleSheet.create({
     containerSpinner: {
          flex: 1,
          justifyContent: 'center',
     },
     horizontal: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
     },
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
