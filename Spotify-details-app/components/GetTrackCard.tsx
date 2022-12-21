import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {View, Image, Text } from "react-native";

import styles from "./styles";

export function GetTrackCard(trackUri:string) {
    const [currentSong, setCurrentSong] = useState<any>();
    const [currentArtist, setCurrentArtist] = useState<any>()
    useEffect(()=> {
      
      const getTrack = async () => {
        let track;
        let artist;
        try {
          let accessToken = await AsyncStorage.getItem("accesToken")
          track = await axios.get(trackUri, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
          artist = await axios.get(track.data.item.artists[0].href, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
        } catch (error) {
          console.log("Computer says no")
        }
        setCurrentSong(track.data)
        setCurrentArtist(artist.data)
      }
      let getTrackInterval = setInterval(getTrack,5000)
      return () => clearInterval(getTrackInterval)
    },[])
  
    return (
      <View>
        {!currentSong || !currentArtist ?
         <Text>Loading . . .</Text>:
         <View>
            <Image style={styles.albumCover} source={{uri:currentSong.item.album.images[0].url}}/>
            <Text>{currentSong?.item.name} – {currentSong?.item.artists[0].name}</Text>
            <Text>
              Artist's Genres: {currentArtist.genres.map(genre=><Text>{genre}{'\n'}</Text> )}
            </Text>
        </View>
        }
      </View>
    )
  }