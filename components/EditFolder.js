import { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditFolder = () => {

     const api = Config.apiURL;

     const route = useRoute()
     const { id, title } = route.params

     const [editTitle, setEditTitle] = useState({
          title: title,
     });

     const navigation = useNavigation();

     const [buttonDisabled, setButtonDisabled] = useState(false);

     useEffect(() => {
          setButtonDisabled(false)
     }, []);

     const handleChangeText = (name, value) => {
          setEditTitle({ ...editTitle, [name]: value })
     }

     const saveEditFolder = async () => {
          try {
               setButtonDisabled(true)

               const token = await AsyncStorage.getItem('token');

               const sendBody = {
                    "title": editTitle.title
               }

               const res = await fetch(api + `/folders/${id}`, {
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
                    Alert.alert("Titulo modificado", "Se ha modificado el título de la carpeta correctamente")
                    navigation.navigate("Menu")
               } else {
                    setButtonDisabled(false)
                    Alert.alert(`Error ${response.status}`, `${data.msg}`)
               }

          } catch (error) {
               setButtonDisabled(false)
               Alert.alert("Error de conexion", error);
          }

     }

     return (
          <ScrollView style={styles.container}>
               <Text style={styles.title}>Editar título</Text>

               <View style={styles.form}>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el nuevo título de la carpeta"
                              value={editTitle.title}
                              onChangeText={(value) => handleChangeText("title", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={saveEditFolder} disabled={buttonDisabled}>
                         <Text style={{ color: "#025099", fontSize: 16, fontWeight: "bold" }}>Guardar</Text>
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

export default EditFolder;