import React, { useState } from "react";
import { StyleSheet, Dimensions, PlatformColor, View, Text, Platform } from "react-native";
import * as Constants from "./Constants.js";
import ArticleFeed from "./Views/ArticleFeed.js"
import LoadingScreen from "./Views/LoadingScreen.js"
import FontLoader from "./FontLoader.js"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "react-native-vector-icons";

const windowSize = Dimensions.get("window");

const Tab = createBottomTabNavigator();

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var totalDate = date + "-" + month + "-" + year;

var stuteLogo =
  "https://media-exp1.licdn.com/dms/image/C4D1BAQHmMcAf2SDb4A/company-background_10000/0/1605410572468?e=2159024400&v=beta&t=_lI8VdXCqfQ_iO29432uvLuA9yYu_9OAcdJHVV3roRA";

const Temp = () => {
  return (
    <View>
      <Text>Temp</Text>
    </View>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cardData, setCardData] = useState([])
  const [mediaData, setMediaData] = useState({})

  if (isLoading) {
      return (
        <NavigationContainer>
          <FontLoader>
            <View style={styles.container}>
              <Text style={styles.loader}>The Stute</Text>
              <Text style={styles.text}>{totalDate}</Text>
              <LoadingScreen 
                url={Constants.POST_URL+"?"+Constants.FEATURED+"&"+Constants.PER_PAGE+"10"} 
                setIsLoading={setIsLoading} 
                setCardData={setCardData} 
                setMediaData={setMediaData} 
              />
            </View>
          </FontLoader>
        </NavigationContainer>
      )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == "Newspaper") {
            if (Platform.OS == "ios") {
              iconName = "ios-newspaper"
            
            } else if (Platform.OS == "android") {
              iconName = "newspaper"
            }
          }

          if (Platform.OS = "ios") {
            return <Ionicons name={iconName} size={size} color={color} />
          
          } else if (Platform.OS == "android") {
            return <MaterialIcons name={iconName} size={size} color={color} />
          }
        },
        ...Platform.select({
          ios: {
            tabBarActiveTintColor: PlatformColor("systemBlueColor"),
            tabBarInactiveTintColor: PlatformColor("systemGrayColor")
          },
          android: {
            tabBarActiveTintColor: PlatformColor("@android:color/holo_blue_light"),
            tabBarInactiveTintColor: PlatformColor("@android:color/darker_gray")
          }
        })
      })}>
          <Tab.Screen 
            name={"Newspaper"} 
            component={ArticleFeed} 
            initialParams={{ cardData: cardData, mediaData: mediaData }}
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
    fontFamily: "Georgia",
    fontWeight: "600",
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    color: "#333333",
  },
  horizLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Georgia",
    fontWeight: "600",
    color: "#333333",
    marginBottom: 5,
  },
  logoBox: {
    backgroundColor: "#f7f7f7",
    paddingTop: 45,
    paddingBottom: 5,
    marginBottom: 30,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    width: windowSize.width,
  },
  text: {
    fontSize: 27,
    fontFamily: "Georgia",
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
  },
  imageContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: windowSize.width,
    marginTop: -15,
    marginBottom: 20,
  },
});

const titleStyle = {
  body: {
    whiteSpace: 'normal',
    fontSize: 27,
    fontFamily: "Georgia",
    fontWeight: "600",
    color: "#333333",
  }
}