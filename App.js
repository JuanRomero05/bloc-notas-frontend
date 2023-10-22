import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Menu from "./screens/Menu";
import Signup from "./screens/Signup";
import ModificarPerfil from "./components/ModificarPerfil";
import Notes from "./screens/Notes";
import NewNote from "./screens/NewNote";
import EditFolder from "./components/EditFolder";
import EditNote from "./components/EditNote";
import Loading from "./components/Loading";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            title: "",
          }}
        />

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: "Bienvenido a Jourpad",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Jourpad",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackVisible: false,
          }}

        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Registro",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
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
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="InicioNotas"
          component={Notes}
          options={{
            title: "Notas",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="NuevaNota"
          component={NewNote}
          options={{
            title: "Nueva Nota",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditarCarpeta"
          component={EditFolder}
          options={{
            title: "Editar Carpeta",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="EditarNota"
          component={EditNote}
          options={{
            title: "Editar Nota",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#025099",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



