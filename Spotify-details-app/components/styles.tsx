import { Button, ScrollView, View, Image, Text,StyleSheet } from "react-native";

const styles = StyleSheet.create({

  //App Background
    background: {
      backgroundColor: '#000',
      height: '100%',
    },

  // Buttons 
  button: {
      width: '80%',
      marginLeft: '10%',
      borderRadius: 200,
    },
  
  // CurrentTrackCard styling
    container: {
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
      top: 170,
      textTransform: 'uppercase',
      lineHeight: 22
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