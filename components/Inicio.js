import { View, Text } from "react-native";
import React from "react";
import Notes from "../screens/Notes";
import Folders from "../screens/Folders";
import NewFolder from "../screens/NewFolder";

const Inicio = () => {
     return (
          <View>
               <Text>Aca van las notas y las carpetas</Text>
               <NewFolder />
               <Notes />
               <Folders />
          </View>
     );
};

export default Inicio;
