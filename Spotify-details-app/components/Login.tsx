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
      native: "com.bjellis.spotifydetailsapp://authentication",
      useProxy: true,
    })
  
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
      redirectUri:redirectUri,
    },discovery);
    const[notified, setNotified] = useState<boolean>(false)
    useEffect(()=>{
      const checkForRefresh = async () => {
        let lastAccessTokenAt;
        console.log("checking")
        try {
          lastAccessTokenAt = await AsyncStorage.getItem("lastAccessTokenAt");
          console.log(lastAccessTokenAt)
        }
        catch(error)
        {console.log(error.message)}
        console.log("checking")
        if (parseInt(lastAccessTokenAt)<Date.now()&&!notified){
          alert("login is about to expire or has expired")
          setNotified(true);
          console.log("should have alerted")
        }
      let alertInterval = setInterval(checkForRefresh, 10000)
      return () => clearInterval(alertInterval)
  }},[])
    useEffect(() => {
      if (response?.type === "success") {
        const{access_token} = response.params;
        console.log(response);
        AsyncStorage.setItem("accesToken",access_token)
        AsyncStorage.setItem("lastAccessTokenAt",response.authentication.expiresIn.toString())
      }
    }, [response])
    return (
      <View>
      <Button title='Login' onPress={()=>{promtAsync({useProxy:true})}}/>
      </View>
    )
}

export default Login
  