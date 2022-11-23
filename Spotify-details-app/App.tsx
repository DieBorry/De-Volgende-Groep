import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from 'react';
const axios = require('axios')
const Stack = createNativeStackNavigator();

let accessToken = ""
export function Login() {

  const client_Id:string = "a2aab0598b1547f4b2f9fe66828e8ebc";
  const client_Secret:string = "d02846da1f8d4759be3cca85d186f9db";
  const redirect_Uri:string = "exp://192.168.0.211:19000"

  const discovery = {
    authorizationEndpoint : "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token"
  };
  const [request,response,promtAsync] = useAuthRequest({
    responseType:ResponseType.Token,
    clientId: client_Id,
    clientSecret:client_Secret,
    scopes: [
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-modify-playback-state",
      "streaming",
      "user-read-email"

    ],
    usePKCE:false,
    redirectUri:redirect_Uri
  },discovery);

  useEffect(() => {
    if (response?.type === "success") {
      const{access_token} = response.params;
      accessToken = access_token;
    }
  }, [response])
  return (
    <Button title='Login' onPress={()=>{promtAsync()}}/>
  )
}

export function Home() {


  return (
    <View>
      Hello
    </View>
  )
}

export default function App() {


  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
