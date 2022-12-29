import { useEffect, useState } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Calendar from 'expo-calendar'
import styles from "./styles";


export default function AddCalendarEvent(props) {
    const [calendars,setCalendars] = useState([])
    const [calendarExists, setCalendarExists] = useState<number>(null)
    useEffect(() => {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          setCalendars(await Calendar.getCalendarsAsync());
          calendars.forEach(calendar => {
            console.log(calendar.title)
            if (calendar.title === 'Spotify Details Calendar') {
              setCalendarExists(calendar.id);
              return;
            }
            
          });
          if(!calendarExists)
          {createCalendar()}
        }
      })();
    }, []);
  
    const createEvent = async () => {
      if (calendarExists) {
        await Calendar.createEventAsync(calendarExists.toString(), {
          title: `${props.songName} — ${props.artistName}`,
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + props.duration), // End the event 1 hour after it starts
          timeZone: 'CET',
          id: `${props.songName}${props.artistName}${new Date(Date.now())}`,
        });
      } else {
        console.log('Calendar does not exist');
      }
    };
  
    return (
      <Button title="Add to Calendar" onPress={createEvent} />
    );
  }
async function createCalendar() {
    // First, create a calendar
    const calendar = await Calendar.createCalendarAsync({
      title: 'Spotify Details Calendar',
      id:'Spotify Details Calendar',
      color: 'green',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: "Spotify-Detail-calendar",
      source: {
        isLocalAccount: true,
        name: 'My song Calendar',
        type:"bullshitType.type"
      },
      name: 'SpotifyDetailCalendar',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
}