import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ScrollView, View, Image, Text, ActivityIndicator } from "react-native";

import styles from "./styles";
import CurrentTrackCard from "./CurrentTrackCard";


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
          console.log(error)
        }
        setTrackList(recentList.data.items);
  
      }
      let recentsInterval = setInterval(getRecentList,1500)
      return () => clearInterval(recentsInterval)
    },[])
    return (
      <View style={styles.background}>
        <Button title="Home" onPress={() => navigation.navigate("Home")}/>
        <ScrollView>
          <CurrentTrackCard/>
        {!trackList? <ActivityIndicator size={"large"} color="#00ff00"/>:
        trackList.map((track,index) => (<View key={index}>
            <Image style={{height: 80, width: 80}} source={{uri:track.track.album.images[0].url}}/>
            <Text style={styles.text}>{track?.track.name} – {track?.track.artists[0].name}</Text>
            {/* <Text>
              Artist's Genres: {currentArtist.genres.map((genre,index)=><Text key={index}>{genre}{'\n'}</Text> )}
            </Text> */}
        </View>))}
        </ScrollView>
      </View>
    )
}

export default Recent