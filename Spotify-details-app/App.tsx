//Packages import
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//component imports
import Recent from './components/Recent';
import Login from './components/Login';
import Home from './components/Home';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Recent" component={Recent}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

