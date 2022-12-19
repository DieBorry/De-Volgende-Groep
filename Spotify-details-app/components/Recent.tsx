import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ScrollView, View, Image, Text } from "react-native";

import styles from "./styles";


export function Recent() {
    const navigation : any = useNavigation();
    const [trackList, setTrackList] = useState<any>() 
    useEffect(()=>{
        const getRecentList = async() => {
        let recentList
        try {
          let accessToken = await AsyncStorage.getItem("accesToken")
          recentList = await axios.get(`https://api.spotify.com/v1/me/player/recently-played`, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
        } catch (error) {
          console.log("Computer says no")
        }
        setTrackList(recentList.data.items);
  
      }
      let recentsInterval = setInterval(getRecentList,1500)
      return () => clearInterval(recentsInterval)
    },[])
    return (
      <View>
        <Button title="Home" onPress={() => navigation.navigate("Home")}/>
        <ScrollView>
        {!trackList? <Text>computer says no</Text>:
        trackList.map((track,index) => (<View key={index}>
            <Image style={styles.albumCover} source={{uri:track.track.album.images[0].url}}/>
            <Text>{track?.track.name} – {track?.track.artists[0].name}</Text>
            {/* <Text>
              Artist's Genres: {currentArtist.genres.map((genre,index)=><Text key={index}>{genre}{'\n'}</Text> )}
            </Text> */}
        </View>))}
        </ScrollView>
      </View>
    )
}

export default Recent