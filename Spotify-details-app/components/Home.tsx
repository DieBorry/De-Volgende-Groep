import { useNavigation } from "@react-navigation/native";
import { Button, View} from "react-native";

import styles from "./styles";
import CurrentTrackCard from "./CurrentTrackCard";

export function Home() {
    const navigation : any = useNavigation();
    return (
      <View>
        <Button title="Login" onPress={() => navigation.navigate("Login")}/>
        <Button title="Recents" onPress={() => navigation.navigate("Recent")}/>
        <CurrentTrackCard/>
      </View>
    )
  }

export default Home