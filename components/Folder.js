//Este componente es llamado por la screen Folders.js
import {
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Folder = ({ data, deleteFolder }) => {

     const navigation = useNavigation();

     const handleNotes = () => {
          navigation.navigate("InicioNotas", { folderId: data._id });
     }

     const handleEditFolder = () => {
          navigation.navigate("EditarCarpeta", { id: data._id, title: data.title });
     }

     return (
          <View style={styles.item}>
               <Text style={styles.title}>{data.title}</Text>

               <TouchableOpacity
                    style={styles.buttonEliminar}
                    onPress={() => deleteFolder(data._id)}
               >
                    <Text style={styles.textButton}>Eliminar</Text>
               </TouchableOpacity>

               <TouchableOpacity
                    style={styles.buttonEditar}
                    onPress={handleEditFolder}
               >
                    <Text style={styles.textButton}>Editar título</Text>
               </TouchableOpacity>

               <TouchableOpacity
                    style={styles.buttonNotas}
                    onPress={handleNotes}
               >
                    <Text style={styles.textButton}>Ver notas</Text>
               </TouchableOpacity>

          </View>
     );
};

const styles = StyleSheet.create({
     item: {
          backgroundColor: "#fff",
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 5,
          borderColor: "#025099",
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
     buttonNotas: {
          marginTop: 15,
          backgroundColor: "#025099",
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

export default Folder;