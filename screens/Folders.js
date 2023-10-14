//import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Folder from "../components/Folder";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Folders = () => {

     const [foldersUser, setFoldersUser] = useState([]);

     useEffect(() => {
          const fetchData = async () => {

               const baseURL = "https://bloc-api-production.up.railway.app/folders/user";
               const token = await AsyncStorage.getItem('token');
               const res = await fetch(baseURL, {
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
          fetchData();
     });


     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Carpetas</Text>
               </View>

               <View>
                    {foldersUser.length > 0 && (
                         foldersUser.map((folder, item) => (
                              <Folder key={item} title={folder.title} />
                         ))
                    )}
                    {foldersUser.length === 0 && (<Text style={styles.text}>No existe ninguna carpeta...</Text>)}
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
          marginTop: 20,
     }
});

export default Folders;
