import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {View, Image, Text, ActivityIndicator } from "react-native";

import styles from "./styles";

export function GetTrackCard(trackUri:string) {
    const [currentSong, setCurrentSong] = useState<any>();
    const [currentArtist, setCurrentArtist] = useState<any>()
    const [songDetails, setSongDetails] = useState<any>();
    useEffect(()=> {
      
      const getTrack = async () => {
        let track;
        let artist;
        let details;
        try {
          let accessToken = await AsyncStorage.getItem("accesToken")
          track = await axios.get(trackUri, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
          artist = await axios.get(track.data.item.artists[0].href, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
          details = await axios.get(`https://api.spotify.com/v1/audio-analysis/${track.data.item.id}`,{headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}})
        } catch (error) {
          console.log(error)
        }
        setCurrentSong(track.data)
        setCurrentArtist(artist.data)
        setSongDetails(details.data)
      }
      let getTrackInterval = setInterval(getTrack,5000)
      return () => clearInterval(getTrackInterval)
    },[])
  
    return (
      <View>
        {!currentSong || !currentArtist ?
         <ActivityIndicator size={"large"} color="#00ff00"/>:
         <View>
            <Image style={styles.albumCover} source={{uri:currentSong.item.album.images[0].url}}/>
            <Text>{currentSong?.item.name} – {currentSong?.item.artists[0].name}</Text>
            <Text>
              Artist's Genres:{"\n"} {currentArtist.genres.map(genre=><Text>{genre}{'\n'}</Text> )}
            </Text>
            <Text>
              BPM: {songDetails.track.tempo}  {"\n"}
              Key: {songDetails.track.key} {"\n"}


            </Text>
        </View>
        }
      </View>
    )
  }