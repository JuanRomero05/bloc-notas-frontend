//import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Folder from "../components/Folder";

const Folders = () => {
     return (
          <ScrollView style={styles.container}>
               <View style={styles.titleContainer}>
                    <Text style={styles.title}>Carpeta</Text>
               </View>

               <View>
                    <Folder />
                    <Text style={styles.text}>No existe ninguna carpeta...</Text>
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

export default Folders;
