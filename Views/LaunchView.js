import { 
    CardDataContext,
    POST_URL,
    FEATURED,
    PER_PAGE,
} from "../Constants";
import { LoadingScreen } from "./LoadingScreen.js";
import { ArticleFeed } from "./ArticleFeed.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LaunchView = () => {
    const { cardData } = useContext(CardDataContext);
    const Stack = createDrawerNavigator();

    if (!cardData) {
        return <LoadingScreen url={POST_URL+"?"+FEATURED+"&"+PER_PAGE+"10"} />
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="ArticleFeed" component={ArticleFeed}/>
        </Stack.Navigator>
    );
}
  
export default LaunchView;

