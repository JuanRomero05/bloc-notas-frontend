//Este componente es llamado por la screen Notes.js
import {
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Note = ({ data, deleteNote }) => {

     const navigation = useNavigation();

     const handleEditNote = () => {
          navigation.navigate("EditarNota", { folderId: data.folderId, id: data._id, title: data.title, content: data.content })
     }

     return (
          <View style={styles.item}>
               <Text style={styles.title}>{data.title}</Text>
               <View style={styles.description}>
                    <Text style={styles.textDescription}>{data.content}</Text>
               </View>

               <TouchableOpacity
                    style={styles.buttonEliminar}
                    onPress={() => deleteNote(data._id)}
               >
                    <Text style={styles.textButton}>Eliminar</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    style={styles.buttonEditar}
                    onPress={handleEditNote}
               >
                    <Text style={styles.textButton}>Editar</Text>
               </TouchableOpacity>
          </View>
     );
};

const styles = StyleSheet.create({
     item: {
          backgroundColor: "#f9f9f9",
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 5,
          borderColor: "#AAA",
          borderWidth: 1,
          marginTop: 15,
     },
     buttonEliminar: {
          marginTop: 15,
          backgroundColor: "red",
          width: 100,
          borderRadius: 5,
     },
     buttonEditar: {
          marginTop: 15,
          backgroundColor: "gray",
          width: 100,
          borderRadius: 5,
     },
     textButton: {
          color: "#fff",
          padding: 5,
          textAlign: "center",
     },
     title: {
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,

     },
     description: {
          borderWidth: 0.5,
          borderRadius: 5,
          backgroundColor: "#fff",
     },
     textDescription: {
          padding: 10,
     }
});

export default Note;