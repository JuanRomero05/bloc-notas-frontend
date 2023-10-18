import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Note from "../components/Note";

// Componente llamado por Folder.js. Este muestra todas las notas de una determinada carpeta.

const Notes = () => {

     const navigation = useNavigation();

     const handleNewNote = () => {
          navigation.navigate("NuevaNota");
     }

     return (

          <ScrollView>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notas</Text>
               </View>

               <View>
                    <Note />
                    <Text style={styles.text}>No existen notas...</Text>
               </View>

               <View style={styles.addButtonContainer}>
                    <TouchableOpacity onPress={handleNewNote} style={styles.addButton}>
                         <MaterialCommunityIcons name="note-plus-outline" size={28} color="white" />
                    </TouchableOpacity>
               </View>
          </ScrollView>

     );
};

const styles = StyleSheet.create({
     /* container: {
          flex: 1,
          backgroundColor: "#fff",
     }, */
     titleContainer: {
          alignItems: "center",
          marginTop: 20,
     },
     title: {
          fontSize: 18,
          color: "#000",
          fontWeight: "bold",
          textAlign: "center",
     },
     text: {
          textAlign: "center",
          marginTop: 20,
     },
     addButtonContainer: {
          position: "absolute",
          /* bottom: 20, */
          right: 20,
          zIndex: 1,
     },
     addButton: {
          backgroundColor: "#025099",
          borderRadius: 50,
          width: 55,
          height: 55,
          justifyContent: "center",
          alignItems: "center",
     },
     /* newNoteButton: {
          position: "absolute",
          bottom: 0,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#025099",
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
     }, */
});

export default Notes;
