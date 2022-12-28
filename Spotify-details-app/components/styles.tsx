import { Button, ScrollView, View, Image, Text,StyleSheet } from "react-native";

const styles = StyleSheet.create({

  //App Background
    background: {
      backgroundColor: '#000',
      height: '100%',
    },
  
  // CurrentTrackCard styling
    container: {
      height: 350,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    albumCover: {
      height: 200
    },
    text: {
      color: '#fff',
    },
    title: {
      backgroundColor: "#ffffff88",
      position: "absolute",
      top: 170
    },

    //Recent Page
    card: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
      
    },
    cardText: {
      color: '#fff',
      textAlignVertical: 'center',
      paddingLeft: 10,
    },
    wrapperCustom: {
      marginTop: 5
    },

    
});

export default styles