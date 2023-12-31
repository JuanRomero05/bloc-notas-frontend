import { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Config from "../Config";

const NewFolder = ({ navigation }) => {

     const api = Config.apiURL;

     const [NewFolder, setNewFolder] = useState({
          title: "",
     });

     const [buttonDisabled, setButtonDisabled] = useState(false);

     useEffect(() => {
          setButtonDisabled(false)
     }, []);

     const handleChangeText = (name, value) => {
          setButtonDisabled(false)
          setNewFolder({ ...NewFolder, [name]: value })
     }

     const saveFolder = async () => {
          try {
               setButtonDisabled(true);
               //Primer fetch para obtener el id del usuario, ya que es necesario al crear una carpeta
               const token = await AsyncStorage.getItem('token');
               const res = await fetch(api + "/users", {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
               });
               const response = await res;
               const data = await response.json()

               if (response.status === 200) {
                    //Segundo fetch para crear la carpeta
                    const body = {
                         "title": NewFolder.title,
                         "userId": data._id
                    }
                    const res2 = await fetch(api + "/folders", {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                         },
                         body: JSON.stringify(body)
                    });

                    const response2 = await res2
                    if (response2.status === 201) {
                         Alert.alert("Carpeta creada", "Se ha creado la carpeta exitosamente.");

                         setNewFolder({
                              title: "",
                         });
                         navigation.jumpTo("Inicio");
                    } else {
                         setButtonDisabled(false)
                         const data2 = await response2.json()
                         Alert.alert(`${response2.status}, ${data2.msg}`)
                    }
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
               <Text style={styles.title}>Crea una nueva carpeta</Text>

               <View style={styles.form}>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el título de la carpeta"
                              value={NewFolder.title}
                              onChangeText={(value) => handleChangeText("title", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={saveFolder} disabled={buttonDisabled}>
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

export default NewFolder;