//import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Note from "../components/Note";

const Notes = () => {
     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notas</Text>
               </View>

               <View>
                    <Note />
                    <Text style={styles.text}>No existen notas...</Text>
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
     }
});

export default Notes;
