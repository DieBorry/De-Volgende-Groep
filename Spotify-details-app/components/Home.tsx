import { useNavigation } from "@react-navigation/native";
import { Button, View} from "react-native";

import styles from "./styles";
import CurrentTrackCard from "./CurrentTrackCard";
import Login from "./Login";

export function Home() {
    const navigation : any = useNavigation();
    return (
      <View style={styles.background}>
        <CurrentTrackCard/>
        {/* <GetTrackDetails url={'https://api.spotify.com/v1/tracks/5AihYZmctLYOUcet4kNNgD'}/> */}
      </View>
    )
  }

export default Home