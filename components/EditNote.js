import { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditNote = () => {

     const api = Config.apiURL;

     const route = useRoute()
     const { folderId, id, title, content } = route.params

     const [editNote, setEditNote] = useState({
          id: id,
          title: title,
          content: content
     });

     const [buttonDisabled, setButtonDisabled] = useState(false);

     useEffect(() => {
          setButtonDisabled(false)
     }, []);

     const navigation = useNavigation();

     const handleChangeText = (name, value) => {
          setEditNote({ ...editNote, [name]: value })
     }

     const saveEditNote = async () => {
          try {
               setButtonDisabled(true)

               const token = await AsyncStorage.getItem('token');

               const sendBody = {
                    "title": editNote.title,
                    "content": editNote.content
               }

               const res = await fetch(api + `/notes/${id}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(sendBody)
               });

               const response = await res;

               const data = await response.json()

               if (response.status === 200) {
                    Alert.alert("Nota modificada", "Se ha modificado la nota correctamente")
                    navigation.navigate("InicioNotas", { folderId })
               } else {
                    Alert.alert(`Error ${response.status}`, `${data.msg}`)
                    setButtonDisabled(false)
               }

          } catch (error) {
               Alert.alert("Error de conexion", error);
               setButtonDisabled(false)
          }

     }

     return (
          <ScrollView style={styles.container}>
               <Text style={styles.title}>Editar Nota</Text>

               <View style={styles.form}>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el nuevo título de la carpeta"
                              value={editNote.title}
                              onChangeText={(value) => handleChangeText("title", value)}
                         />
                    </View>

                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el nuevo contenido de la nota"
                              value={editNote.content}
                              multiline={true}
                              numberOfLines={20}
                              style={{ textAlignVertical: "top" }}
                              onChangeText={(value) => handleChangeText("content", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={saveEditNote} disabled={buttonDisabled}>
                         <Text style={{ color: "#025099", fontSize: 16, fontWeight: "bold" }} >Guardar</Text>
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
          marginBottom: 10,
          marginTop: 45,
          paddingLeft: 40,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "left"
     },
     form: {
          marginTop: 15,
          paddingHorizontal: 40,
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
          borderColor: "#025099",
          padding: 12,
          borderRadius: 15,
          width: "100%",
          marginBottom: 5
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

export default EditNote;