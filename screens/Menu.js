//Maneja la logica para cambiar de pantallas
import { StyleSheet } from "react-native";
//import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import Notes from "./Notes";
//import NewNote from "./NewNote";
import NewFolder from "./NewFolder";
import Perfil from "./Perfil";
import Folders from "./Folders";
import Inicio from "../components/Inicio";

//Menu de navegacion inferior
const Tab = createMaterialBottomTabNavigator();

const Menu = () => {

     const theme = useTheme();
     theme.colors.secondaryContainer = "#e5e5e5";

     return (

          <Tab.Navigator
               tabBarActivateBackgroundColor="#fff"
               activeColor="#000"
               inactiveColor="#95a5a6"
               barStyle={styles.navigationBar}
          >
               <Tab.Screen
                    name="Inicio"
                    component={Folders}
                    options={{
                         tabBarLabel: "Inicio",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="home-outline" color="#000" size={24} />
                         )
                    }}
               />
               {/* <Tab.Screen
                    name="Nueva Nota"
                    component={NewNote}
                    options={{
                         tabBarLabel: "Nueva nota",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="note-plus-outline" color="#000" size={24} />
                         )
                    }}
               /> */}
               <Tab.Screen
                    name="Nueva Carpeta"
                    component={NewFolder}
                    options={{
                         tabBarLabel: "Nueva carpeta",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="folder-plus-outline" color="#000" size={24} />
                         )
                    }}
               />
               <Tab.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
                         tabBarLabel: "Perfil",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="account-cog-outline" color="#000" size={24} />
                         )
                    }}
               />
          </Tab.Navigator>

     );
};

const styles = StyleSheet.create({
     navigationBar: {
          backgroundColor: "#fff",
          paddingBottom: 5,
          borderTopWidth: 0.5,
          borderTopColor: "#666",
     }
});

export default Menu;

