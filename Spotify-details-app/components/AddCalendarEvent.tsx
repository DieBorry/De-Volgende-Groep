import { useEffect, useState } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Calendar from 'expo-calendar';
import styles from "./styles";


export default function AddCalendarEvent(props) {
  const [calendarExists, setCalendarExists] = useState<number>(-1)
  let calendars;
  useEffect(() => {
    let interval = setInterval(async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        calendars = await Calendar.getCalendarsAsync();
        for (let i = 0; i < calendars.length; i++) {
          const calendar = calendars[i];
          console.log(calendar.title + i + " "+calendars.length)
          if (calendar.title == 'Spotify Details Calendar') {
            setCalendarExists(calendarId => parseInt(calendar.id));
            break;
            // Calendar.deleteCalendarAsync(calendar.id)
          }
          else if (i+1 == calendars.length)
          {
            setCalendarExists(calendarId => -2)
          }

        };
        //if (calendarExists < -1) {(await createCalendar())}
        // Dit blijt calenders aanmaken, ik kan er niet aan uit
      }
    },1000);
    return() => clearInterval(interval)
  }, []);

  const createEvent = async () => {
    if (calendarExists >= 0) {
      await Calendar.createEventAsync(calendarExists.toString(), {
        title: `${props.songName} — ${props.artistName}`,
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now() + props.duration),
        timeZone: 'CET',
        id: `${props.songName}${props.artistName}${new Date(Date.now())}`,
      });
    } else {
      console.log('Calendar does not exist');
    }
  };

  return (
    <View style={styles.button}>
      <Button
        color="#1db954"
        title="Add to Calendar"
        onPress={createEvent}
      />
    </View>
  );
}
async function createCalendar() {
  // First, create a calendar
  const calendar = await Calendar.createCalendarAsync({
    title: 'Spotify Details Calendar',
    id: 'Spotify Details Calendar',
    color: 'green',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: "Spotify-Detail-calendar",
    source: {
      isLocalAccount: true,
      name: 'My song Calendar',
      type: "bullshitType.type"
    },
    name: 'SpotifyDetailCalendar',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
}