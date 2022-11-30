import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import axios,* as others from 'axios';
const Stack = createNativeStackNavigator();



let accessToken = ""
export function Login() {
  const navigation : any = useNavigation();

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
      "streaming"
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
    <View>
    <Button title='Login' onPress={()=>{promtAsync()}}/>
    <Button title="Home" onPress={() => navigation.navigate("Home")}/>
    </View>
  )
}
export function CurrentTrack() {
  const [currentSong, setCurrentSong] = useState<any>();
  useEffect(()=> {
    
    const getCurrentTrack = async () => {
      let track;
      try {
        track = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
      } catch (error) {
        console.log("Computer says no")
      }
      setCurrentSong(track.data)
      console.log(track.data.item.artists[0])
    }
    getCurrentTrack()
  },[])

  return (
    <View>
      {!currentSong ?
       <Text>Computer says no</Text>:
       <View>
          <Image style={styles.albumCover} source={{uri:currentSong.item.album.images[0].url}}/>
          <Text>{currentSong?.item.name} – {currentSong?.item.artists[0].name}</Text>
          <Text>
            Hellos
          </Text>
      </View>
      }
    </View>
  )
}
export function Home() {
  const navigation : any = useNavigation();
  return (
    <View>
      <Button title="Login" onPress={() => navigation.navigate("Login")}/>
      <CurrentTrack/>
    </View>
  )
}

export default function App() {


  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
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
  albumCover : {
    height: 80,
    width:80
  }
});
