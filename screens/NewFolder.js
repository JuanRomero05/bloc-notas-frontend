import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native";

const NewFolder = () => {

     const [NewFolder, setNewFolder] = useState({
          title: "",
     });

     const navigation = useNavigation();

     const handleChangeText = (name, value) => {
          setNewFolder({ ...NewFolder, [name]: value })
     }

     const saveFolder = async () => {
          try {
               //Primer fetch para obtener el id del usuario, ya que es necesario al crear una carpeta
               const baseURL = "https://bloc-api-production.up.railway.app/users";
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
               var i = 0;
               console.log(i++);
               console.log("hasta aqui todo bien");

               if (response.status === 200) {
                    console.log(i++);
                    //Segundo fetch para crear la carpeta
                    const baseURL2 = "https://bloc-api-production.up.railway.app/folders";
                    const body = {
                         "title": NewFolder.title,
                         "userId": data._id
                    }
                    console.log(i++);
                    const res2 = await fetch(baseURL2, {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                         },
                         body: JSON.stringify(body)
                    });

                    console.log(i++);

                    const response2 = await res2
                    if (response2.status === 201) {
                         console.log(i++);

                         setNewFolder({
                              title: "",
                         });
                         navigation.navigate("Menu");
                    } else {
                         const data2 = await response2.json()
                         Alert.alert(`${response2.status}, ${data2.msg}`)
                    }
               } else {
                    Alert.alert(`${response.status}, ${data.msg}`)
               }

          } catch (error) {
               Alert.alert("Error al realizar el fetch", error);
          }

     }

     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Crea una nueva carpeta</Text>
               </View>

               <View style={styles.form}>
                    <View style={styles.inputGroup}>
                         <TextInput
                              placeholder="Introduce el título de la carpeta"
                              value={NewFolder.title}
                              onChangeText={(value) => handleChangeText("title", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={saveFolder}>
                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Guardar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDesc}>
                         <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Descartar</Text>
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
     titleContainer: {
          alignItems: 'center',
          marginTop: 10,
     },
     title: {
          fontSize: 18,
          color: "#000",
          fontWeight: "bold",
          textAlign: "center"
     },
     form: {
          padding: 40,
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

export default NewFolder;