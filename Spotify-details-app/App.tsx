//Packages import
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//component imports
import Recent from './components/Recent';
import Home from './components/Home';
import Login from './components/Login';
import styles from './components/styles';


const Tab = createBottomTabNavigator();
export default function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator 
          
          screenOptions= {{
            tabBarActiveTintColor: '#1db954',
            tabBarActiveBackgroundColor: '#222',
            tabBarInactiveTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#000'
            }
          }}
        >
          <Tab.Screen name="Home" 
          component={Home} 
          options={{
            tabBarIcon: (props: {color, size, focused}) => <Entypo name="home" size={24} color='#fff'/>
          }}
          />
          <Tab.Screen name="Recent" 
          component={Recent} 
          options={{
            tabBarIcon: (props: {color, size}) => <FontAwesome5 name="history" size={20} color="#fff"/>
          }}
          />
          <Tab.Screen name="Login" 
          component={Login} 
          options={{
            tabBarIcon: (props: {color, size}) => <Entypo name="login" size={20} color="#fff"/>
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
}

