import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Menu from "./screens/Menu";
import Signup from "./screens/Signup";
import ModificarPerfil from "./components/ModificarPerfil";
import Folders from "./screens/Folders";

const Stack = createNativeStackNavigator();

//* 1. Crear carpeta del usuario
//* 2. Mostrar carpeta del usuario  
//TODO: 3. Cerrar sesion
//TODO: 4. Eliminar cuenta
//TODO: 5. Modificar perfil
//* 6. Al guardar una carpeta me debe redireccionar a la pestaña de inicio.
//TODO: 7. Al presionar una carpeta me debe abrir todas las notas que contiene, y si no tiene, dar la opcion para crear una.

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: "Bienvenido",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Notepad",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Signup",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="ModificarPerfil"
          component={ModificarPerfil}
          options={{
            title: "Modificar Perfil",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



