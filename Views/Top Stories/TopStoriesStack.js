import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopStoriesView from "./TopStoriesView.js";
import ArticleDetailView from "./ArticleDetailView.js";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function TopStoriesStack({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="TopStoriesView" 
                component={TopStoriesView} 
                initialParams={{ cardData: route.params.cardData, mediaData: route.params.mediaData }}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ArticleDetail"
                component={ArticleDetailView}
                options={{ 
                    headerTitle: "The Stute",
                    headerStyle: {
                        backgroundColor: "#f7f7f7",
                    },
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 24,
                        color: "#333333",
                        ...Platform.select({
                            ios: {
                              fontFamily: "Georgia",
                              fontWeight: "600",
                            },
                            android: {
                              fontFamily: "GeorgiaBold",
                            }
                          })
                    }
                }}
            />
        </Stack.Navigator>
    );
}