//Este componente es llamado por la screen Folders.js
import {
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Folder = ({ data, deleteFolder }) => {

     const navigation = useNavigation();

     const handleNotes = () => {
          navigation.navigate("InicioNotas");
     }

     return (
          <View style={styles.item}>
               <Text style={styles.title}>{data.title}</Text>

               <TouchableOpacity
                    style={styles.buttonEliminar}
                    onPress={() => deleteFolder(data.id)}
               >
                    <Text style={styles.textButton}>Eliminar</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    style={styles.buttonEditar}
               >
                    <Text style={styles.textButton}>Editar</Text>
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