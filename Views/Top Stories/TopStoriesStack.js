import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopStoriesView from "./TopStoriesView.js";
import ArticleDetailView from "./ArticleDetailView.js";

const Stack = createNativeStackNavigator();

export default function TopStoriesStack({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="TopStoriesView" 
                component={TopStoriesView} 
                initialParams={{ 
                    cardData: route.params.cardData,
                    mediaData: route.params.mediaData, 
                    authorData: route.params.authorData,
                    categoryData: route.params.categoryData
                }}
                options={{ 
                    headerTitle: "The Stute",
                    headerStyle: {
                        backgroundColor: "#f7f7f7",
                    },
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 28,
                        color: "#333333",
                        fontFamily: "AbrilFatface"
                    }
                }}
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
                        fontSize: 28,
                        color: "#333333",
                        fontFamily: "AbrilFatface"
                    },
                    headerBackTitle: "Back",
                }}
            />
        </Stack.Navigator>
    );
}