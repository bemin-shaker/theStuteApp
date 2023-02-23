import React, { useState } from "react";
import { StyleSheet, Dimensions, PlatformColor, View, Text, Platform } from "react-native";
import * as Constants from "./Common/Constants.js";
import LoadingView from "./Views/LoadingView.js"
import TopStoriesStack from "./Views/Top Stories/TopStoriesStack.js";
import FontLoader from "./Common/FontLoader.js"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";

const windowSize = Dimensions.get("window");

const Tab = createBottomTabNavigator();

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var totalDate = date + "-" + month + "-" + year;

var stuteLogo =
  "https://media-exp1.licdn.com/dms/image/C4D1BAQHmMcAf2SDb4A/company-background_10000/0/1605410572468?e=2159024400&v=beta&t=_lI8VdXCqfQ_iO29432uvLuA9yYu_9OAcdJHVV3roRA";

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cardData, setCardData] = useState([])
  const [mediaData, setMediaData] = useState({})
  const [authorData, setAuthorData] = useState({})

  if (isLoading) {
      return (
        <NavigationContainer>
          <FontLoader>
            <View style={styles.container}>
              <Text style={styles.loader}>The Stute</Text>
              <Text style={styles.text}>{totalDate}</Text>
              <LoadingView 
                url={Constants.POST_URL+"?"+Constants.FEATURED+"&"+Constants.PER_PAGE+"10"} 
                setIsLoading={setIsLoading} 
                setCardData={setCardData} 
                setMediaData={setMediaData} 
                setAuthorData={setAuthorData}
              />
            </View>
          </FontLoader>
        </NavigationContainer>
      )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        ...Platform.select({
          ios: {
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name == "Top Stories") {
                iconName = "ios-newspaper"
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: "#A32538",
            tabBarInactiveTintColor: PlatformColor("systemGrayColor")
          },
          android: {
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name == "Top Stories") {
                iconName = "newspaper"
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: "#A32538",
            tabBarInactiveTintColor: PlatformColor("@android:color/darker_gray")
          }
        })
      })}>
          <Tab.Screen 
            name={"Top Stories"} 
            component={TopStoriesStack} 
            initialParams={{ cardData: cardData, mediaData: mediaData, authorData: authorData }}
            options={{ headerShown: false }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10
  },
  loader: {
    fontSize: 37,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    color: "#333333",
    fontFamily: "AbrilFatface"
  },
  text: {
    fontSize: 27,
    color: "#333333",
    marginBottom: 10,
    fontFamily: "PTSerifBold"
  },
});