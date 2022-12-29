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
      marginTop: 20
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
      backgroundColor: '#ffffff20',
      borderRadius: 20,
      padding: 20,
      minWidth: '45%',
      maxWidth: '50%'
    },
    title: {
      backgroundColor: "#ffffff88",
      position: "absolute",
      top: 170,
      paddingLeft: 10,
      textTransform: 'uppercase',
      lineHeight: 22
    },

    // Track Info
    row: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      textAlignVertical: 'center',
    },
    
    //Recent Page
    card: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    cardText: {
      color: '#fff',
      textAlignVertical: 'center',
      paddingLeft: 10,
    },
    wrapperCustom: {
      marginTop: 10
    },

    
});

export default styles