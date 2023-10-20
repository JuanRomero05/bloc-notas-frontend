import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";
// Componente llamado por Notes.js

const NewNote = () => {

     const api = Config.apiURL;

     const route = useRoute()
     const folderId = route.params.folderId;

     const navigation = useNavigation();

     const [NewNote, setNewNote] = useState({
          title: "",
          content: ""
     });

     const handleChangeText = (name, value) => {
          setNewNote({ ...NewNote, [name]: value })
     }

     const saveNote = async () => {

          try {
               const token = await AsyncStorage.getItem('token');
               const body = {
                    "title": NewNote.title,
                    "content": NewNote.content,
                    "folderId": folderId
               }
               const res = await fetch(api + "/notes", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
               });
               const response = await res
               if (response.status === 201) {
                    setNewNote({
                         title: "",
                         content: "",
                    });
                    navigation.navigate("InicioNotas", { folderId: folderId });
               } else {
                    const data = await response.json()
                    Alert.alert(`${response.status}, ${data.msg}`)
               }
          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }

     }

     return (
          <ScrollView style={styles.container}>
               <Text style={styles.title}>Crea una nueva nota</Text>

               <View style={styles.form}>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el título de la nota"
                              value={NewNote.title}
                              onChangeText={(value) => handleChangeText("title", value)}
                         />
                    </View>

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el contenido de la nota"
                              value={NewNote.content}
                              multiline={true}
                              numberOfLines={20}
                              style={{ textAlignVertical: "top" }}
                              onChangeText={(value) => handleChangeText("content", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={saveNote}>
                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Guardar</Text>
                    </TouchableOpacity>

               </View>
          </ScrollView>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#fff",
     },
     title: {
          fontSize: 18,
          color: "#000",
          fontWeight: "bold",
          textAlign: "left",
          marginTop: 25,
          marginBottom: 15,
          paddingLeft: 40
     },
     form: {
          paddingHorizontal: 40,
          paddingBottom: 40
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
          backgroundColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
     },
     buttonDesc: {
          alignItems: 'center',
          backgroundColor: "#999999",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginTop: 5,
     },
});

export default NewNote;