import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ScrollView, View, Image, Text, ActivityIndicator, Pressable } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

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
        <ScrollView>
          <CurrentTrackCard/>
        {!trackList? <ActivityIndicator size={"large"} color="#1db954"/>:
        trackList.map((track,index) => (<View key={index}>
          <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#222'
              : '#000'
          },
          styles.wrapperCustom
        ]}>
            <LinearGradient colors={['#888', '#ffffff55', '#000']} style={styles.card}>
              <Image style={{height: 80, width: 80}} source={{uri:track.track.album.images[0].url}}/>
              <Text style={styles.cardText}>{track?.track.name} – {track?.track.artists[0].name}</Text>
            </LinearGradient>
          </Pressable >
            {/* <Text>
              Artist's Genres: {currentArtist.genres.map((genre,index)=><Text key={index}>{genre}{'\n'}</Text> )}
            </Text> */}
        </View>))}
        </ScrollView>
      </View>
    )
}

export default Recent