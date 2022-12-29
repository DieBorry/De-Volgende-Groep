import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {View, Image, Text, ActivityIndicator } from "react-native";

import styles from "./styles";
import {LinearGradient} from 'expo-linear-gradient';

export default function GetTrackDetails(props) {
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
          track = await axios.get(props.url, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
          artist = await axios.get(track.data.artists[0].href, {headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}});
          details = await axios.get(`https://api.spotify.com/v1/audio-analysis/${track.data.id}`,{headers: {'Authorization': `Bearer ${accessToken}`,'Content-Type' : 'application/json'}})
        } catch (error) {
          console.log(error.message)
        }
        setCurrentSong(track.data)
        setCurrentArtist(artist.data)
        setSongDetails(details.data)
      }
      let getTrackInterval = setInterval(getTrack,1500)
      return () => clearInterval(getTrackInterval)
    },[])
  
    return (
      <View>
        {!currentSong || !currentArtist || !songDetails ?
         <ActivityIndicator size={"large"} color="#1db954"/>:
         <View>
            <Image style={styles.albumCover} source={{uri:currentSong?.album.images[0].url}}/>
            <Text style={styles.title}>{currentSong?.name} – {currentSong?.artists[0].name}</Text>
            <View style={styles.row}>
                <Text style={styles.text}>
                  Artist's Genres:{"\n"}{currentArtist?.genres.map((genre,index)=><Text key={index}>{genre}{"\n"}</Text> )}
                </Text>
              
                <View style={styles.text}>
                  <Text style={{color: '#fff'}}>BPM: {songDetails?.track.tempo}{"\n"}</Text>
                  <Text style={{color: '#fff'}}>Key: {songDetails?.track.key}{"\n"}</Text>
                </View>
            </View>
        </View>
        }
      </View>
    )
  }