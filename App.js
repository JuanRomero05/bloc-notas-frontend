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

const Stack = createNativeStackNavigator();

//* 1. Crear carpeta del usuario
//* 2. Mostrar carpeta del usuario  
//* 3. Al guardar una carpeta me debe redireccionar a la pestaña de inicio.
//* 4. Al presionar una carpeta me debe abrir todas las notas que contiene, y si no tiene, dar la opcion para crear una.
//* 5. Hacer validaciones de la contraseña y el correo con las expresiones regulares.
//* 6. En el SignUp, validar lo de repetir contraseña y que estas coincidan.
//TODO: Cambiar background en el TabNavigator del Menu
//TODO: Validaciones de los botones Descartar
//TODO: Modificar UI/UX de las notas y las carpetas

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      /* screenOptions={{ headerBackVisible: false }} */
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: "Bienvenido",
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



