import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const NewNote = () => {

     const [NewNote, setNewNote] = useState({
          title: "",
          description: ""
     });

     const handleChangeText = (name, value) => {
          setNewNote({ ...NewNote, [name]: value })
     }

     const saveNote = () => {
          setNewNote({
               title: "",
               description: "",
          });
     }

     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Crea una nueva nota</Text>
               </View>

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
                              placeholder="Introduce la descripción de la nota"
                              value={NewNote.description}
                              multiline={true}
                              numberOfLines={20}
                              style={{ textAlignVertical: "top" }}
                              onChangeText={(value) => handleChangeText("description", value)}
                         />
                    </View>

                    <TouchableOpacity style={styles.buttonSave} onPress={saveNote}>
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

export default NewNote;