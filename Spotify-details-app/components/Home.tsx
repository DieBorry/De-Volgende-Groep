import { useNavigation } from "@react-navigation/native";
import { Button, View} from "react-native";

import styles from "./styles";
import CurrentTrackCard from "./CurrentTrackCard";
import GetTrackDetails from "./GetTrackDetail";

export function Home() {
    const navigation : any = useNavigation();
    return (
      <View>
        <Button title="Login" onPress={() => navigation.navigate("Login")}/>
        <Button title="Recents" onPress={() => navigation.navigate("Recent")}/>
        <CurrentTrackCard/>
        {/* <GetTrackDetails url={'https://api.spotify.com/v1/tracks/5AihYZmctLYOUcet4kNNgD'}/> */}
      </View>
    )
  }

export default Home