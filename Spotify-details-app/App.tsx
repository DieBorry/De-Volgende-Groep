//Packages import
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//component imports
import Recent from './components/Recent';
import Login from './components/Login';
import Home from './components/Home';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Recent" component={Recent}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

