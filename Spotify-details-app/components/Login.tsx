import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { makeRedirectUri, ResponseType, useAuthRequest } from "expo-auth-session";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import * as Network from 'expo-network'

import styles from "./styles";

export function Login() {
    const navigation : any = useNavigation();
  
    const client_Id:string = "a2aab0598b1547f4b2f9fe66828e8ebc";
    const client_Secret:string = "d02846da1f8d4759be3cca85d186f9db";
    const redirectUri = makeRedirectUri({
      native: 'spotifyDetailsApp://auth',
      useProxy: true
    })
    console.log(redirectUri)
  
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
        "streaming"
      ],
      usePKCE:false,
      redirectUri:redirectUri
    },discovery);
  
    useEffect(() => {
      if (response?.type === "success") {
        const{access_token} = response.params;
        AsyncStorage.setItem("accesToken",access_token)
      }
    }, [response])
    return (
      <View>
      <Button title='Login' onPress={()=>{promtAsync()}}/>
      <Button title="Home" onPress={() => navigation.navigate("Home")}/>
      </View>
    )
}

export default Login
  