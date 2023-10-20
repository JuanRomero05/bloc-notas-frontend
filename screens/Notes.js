import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Note from "../components/Note";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";

// Componente llamado por Folder.js. Este muestra todas las notas de una determinada carpeta.

const Notes = () => {

     const api = Config.apiURL;

     const [notesUser, setNotesUser] = useState([]);
     const route = useRoute()
     const folderId = route.params.folderId;

     useEffect(() => {
          getNotes();
     });

     const navigation = useNavigation();

     const handleNewNote = () => {
          navigation.navigate("NuevaNota", { folderId: folderId });
     }

     const getNotes = async () => {

          try {
               const token = await AsyncStorage.getItem('token');
               const res = await fetch(api + `/notes/folder/${folderId}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
               });
               const response = await res;
               if (response.status === 200) {
                    const data = await response.json()
                    setNotesUser(data);
               } else {
                    const data = await response.json()
                    Alert.alert(`${response.status}`, `${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error", error.message)
          }

     }

     const deleteNote = async (id) => {

          try {
               const token = await AsyncStorage.getItem('token');
               const res = await fetch(api + `/notes/${id}`, {
                    method: "DELETE",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
               })
               const response = await res
               if (response.status === 200) {
                    Alert.alert("Nota borrada", "Se ha eliminado la nota exitosamente");
                    getNotes();
               } else {
                    const data = await response.json()
                    Alert.alert(`${response.status}`, `${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }

     }

     return (

          <ScrollView>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notas</Text>
               </View>

               <View>
                    {notesUser.length > 0 ? (
                         notesUser.map((data, index) => (
                              <Note key={index} data={data} deleteNote={() => deleteNote(data._id)} />
                         ))
                    ) : (
                         <Text style={styles.text}>No existen notas...</Text>
                    )}

               </View>

               <View style={styles.addButtonContainer}>
                    <TouchableOpacity onPress={handleNewNote} style={styles.addButton}>
                         <MaterialCommunityIcons name="note-plus-outline" size={28} color="white" />
                    </TouchableOpacity>
               </View>
          </ScrollView>

     );
};

const styles = StyleSheet.create({
     /* container: {
          flex: 1,
          backgroundColor: "#fff",
     }, */
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
          marginTop: 220,
          fontWeight: "bold"
     },
     addButtonContainer: {
          position: "absolute",
          /* bottom: 20, */
          right: 20,
          zIndex: 1,
     },
     addButton: {
          backgroundColor: "#025099",
          borderRadius: 50,
          width: 55,
          height: 55,
          justifyContent: "center",
          alignItems: "center",
     },
     /* newNoteButton: {
          position: "absolute",
          bottom: 0,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#025099",
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
     }, */
});

export default Notes;
