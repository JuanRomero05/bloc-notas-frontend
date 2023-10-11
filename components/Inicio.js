import { View, Text } from "react-native";
import React from "react";
import Notes from "../screens/Notes";
import Folders from "../screens/Folders";

const Inicio = () => {
     return (
          <View>
               <Text>Aca van las notas y las carpetas</Text>
               <View>
                    <Notes />
               </View>
               <View>
                    <Folders />
               </View>
          </View>
     );
};

export default Inicio;
