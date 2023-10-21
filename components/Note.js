//Este componente es llamado por la screen Notes.js
import {
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const Note = ({ data, deleteNote }) => {

     const navigation = useNavigation();

     const [buttonDisabled, setButtonDisabled] = useState(false);

     useEffect(() => {
          setButtonDisabled(false)
     }, []);

     const handleEditNote = () => {
          navigation.navigate("EditarNota", { folderId: data.folderId, id: data._id, title: data.title, content: data.content })
     }

     const handleDeleteNote = (id) => {
          setButtonDisabled(true)
          deleteNote(id)
     }

     return (
          <View style={styles.container}>

               <View style={styles.containNote}>

                    <Text style={styles.title}>{data.title}</Text>

                    <View style={styles.description}>
                         <Text style={styles.textDescription}>{data.content}</Text>
                    </View>

                    <View style={styles.item}>
                         <TouchableOpacity
                              style={styles.buttonEditNote}
                              onPress={handleEditNote}
                         >
                              <Text style={styles.textButtonEditNote}>Editar nota</Text>
                         </TouchableOpacity>

                         <TouchableOpacity
                              style={styles.buttonDeleteNote}
                              onPress={() => handleDeleteNote(data._id)}
                              disabled={buttonDisabled}
                         >
                              <Text style={styles.textButtonDeleteNote}>Eliminar</Text>
                         </TouchableOpacity>

                    </View>

               </View>

          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     containNote: {
          backgroundColor: "#fff",
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 15,
          borderColor: "#025099",
          borderWidth: 1,
          marginTop: 15,

     },
     title: {
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,
          textAlign: "center"
     },
     description: {
          borderWidth: 0.5,
          borderRadius: 15,
          borderColor: "#025099",
          backgroundColor: "#fff",
     },
     textDescription: {
          padding: 10,
     },
     item: {
          flexDirection: 'row',
          justifyContent: "space-between"
     },
     buttonEditNote: {
          marginTop: 15,
          borderWidth: 1,
          borderColor: "#025099",
          width: 100,
          borderRadius: 15,
     },
     textButtonEditNote: {
          color: "#025099",
          fontWeight: "bold",
          fontSize: 16,
          padding: 5,
          textAlign: "center"
     },
     buttonDeleteNote: {
          marginTop: 15,
          borderWidth: 1,
          borderColor: "red",
          width: 100,
          borderRadius: 15,
     },
     textButtonDeleteNote: {
          color: "red",
          fontWeight: "bold",
          fontSize: 16,
          padding: 5,
          textAlign: "center"
     },
});

export default Note;