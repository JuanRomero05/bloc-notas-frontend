//Este componente es llamado por la screen Folders.js
import {
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const Folder = ({ data, deleteFolder }) => {

     const navigation = useNavigation();

     const [buttonDisabled, setButtonDisabled] = useState(false);

     useEffect(() => {
          setButtonDisabled(false)
     }, []);

     const handleNotes = () => {
          navigation.navigate("InicioNotas", { folderId: data._id });
     }

     const handleEditFolder = () => {
          navigation.navigate("EditarCarpeta", { id: data._id, title: data.title });
     }

     const handleDeleteFolder = (id) => {
          setButtonDisabled(true)
          deleteFolder(id)
     }

     return (
          <View style={styles.container}>

               <View style={styles.containFolder}>

                    <Text style={styles.title}>{data.title}</Text>

                    <View style={styles.item}>

                         <TouchableOpacity
                              style={styles.buttonNotas}
                              onPress={handleNotes}
                         >
                              <Text style={styles.textButtonNotas}>Ver notas</Text>
                         </TouchableOpacity>

                         <TouchableOpacity
                              style={styles.buttonEditar}
                              onPress={handleEditFolder}
                         >
                              <Text style={styles.textButtonEditar}>Editar</Text>
                         </TouchableOpacity>

                         <TouchableOpacity
                              style={styles.buttonEliminar}
                              onPress={() => handleDeleteFolder(data._id)}
                              disabled={buttonDisabled}
                         >
                              <Text style={styles.textButtonEliminar}>Eliminar</Text>
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
     containFolder: {
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
     item: {
          flexDirection: 'row',
          justifyContent: "space-between"
     },
     buttonNotas: {
          marginTop: 15,
          borderWidth: 1,
          borderColor: "#025099",
          width: 100,
          borderRadius: 15,
     },
     textButtonNotas: {
          color: "#025099",
          fontWeight: "normal",
          fontSize: 16,
          padding: 5,
          textAlign: "center"
     },
     buttonEditar: {
          marginTop: 15,
          borderWidth: 1,
          borderColor: "gray",
          width: 100,
          borderRadius: 15,
     },
     textButtonEditar: {
          color: "gray",
          fontWeight: "normal",
          fontSize: 16,
          padding: 5,
          textAlign: "center"
     },
     buttonEliminar: {
          marginTop: 15,
          borderWidth: 1,
          borderColor: "red",
          width: 100,
          borderRadius: 15,
     },
     textButtonEliminar: {
          color: "red",
          fontWeight: "bold",
          fontSize: 16,
          padding: 5,
          textAlign: "center"
     },
});

export default Folder;