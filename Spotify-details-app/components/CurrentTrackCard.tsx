import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {View, Image, Text, ActivityIndicator, Pressable} from "react-native";

import styles from "./styles";


export function CurrentTrackCard() {
    const [currentSong, setCurrentSong] = useState<any>();
    const [currentArtist, setCurrentArtist] = useState<any>()
    useEffect(()=> {
      
      const getCurrentTrack = async () => {
        let track;
        let artist;
        try {
          let accessToken = await AsyncStorage.getItem("accesToken")
          track = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
          artist = await axios.get(track.data.item.artists[0].href, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
        } catch (error) {
          console.log(error)
        }
        setCurrentSong(track.data)
        setCurrentArtist(artist.data)
      }
      let cTrackInterval = setInterval(getCurrentTrack,1500)
      return () => clearInterval(cTrackInterval)
    },[])
  
    return (
      <View>
        {!currentSong || !currentArtist ?
         <ActivityIndicator size={"large"} color="#00ff00"/>:
         <Pressable>
            <Image style={styles.albumCover} source={{uri:currentSong.item.album.images[0].url}}/>
            <Text>{currentSong?.item.name} – {currentSong?.item.artists[0].name}</Text>
            <Text>Track's Spotify-ID: {currentSong.item.id}</Text>
            <Text>
              Artist's Genres: {currentArtist.genres.map((genre,index)=><Text key={index}>{genre}{'\n'}</Text> )}
            </Text>
        </Pressable>
        }
      </View>
    )
}

export default CurrentTrackCard;
  