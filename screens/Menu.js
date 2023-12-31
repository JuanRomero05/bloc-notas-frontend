//Maneja la logica para cambiar de pantallas
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NewFolder from "./NewFolder";
import Perfil from "./Perfil";
import Folders from "./Folders";

//Menu de navegacion inferior
const Tab = createMaterialBottomTabNavigator();

const Menu = () => {

     /* const theme = useTheme();
     theme.colors.secondaryContainer = "#e5e5e5"; */

     return (

          <Tab.Navigator
               activeColor="#025099"
               inactiveColor="#95a5a6"
               barStyle={styles.navigationBar}
               initialRouteName="Inicio"
          >
               <Tab.Screen
                    name="Inicio"
                    component={Folders}
                    options={{
                         tabBarLabel: "Inicio",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="home-outline" color="#025099" size={24} />
                         )
                    }}
               />
               <Tab.Screen
                    name="Nueva Carpeta"
                    component={NewFolder}
                    options={{
                         tabBarLabel: "Nueva carpeta",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="folder-plus-outline" color="#025099" size={24} />
                         ),
                    }}
               />
               <Tab.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
                         tabBarLabel: "Perfil",
                         tabBarIcon: () => (
                              <MaterialCommunityIcons name="account-cog-outline" color="#025099" size={24} />
                         )
                    }}
               />
          </Tab.Navigator>

     );
};

const styles = StyleSheet.create({
     navigationBar: {
          backgroundColor: "#F4F7FB",
          paddingBottom: 5,
          borderTopWidth: 0.5,
          borderTopColor: "#F4F7FB",
          /* borderColor: "gray" */
     }
});

export default Menu;

