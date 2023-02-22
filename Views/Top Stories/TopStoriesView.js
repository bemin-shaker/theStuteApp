import * as Constants from "../../Constants.js";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import FontLoader from "../../FontLoader.js"

const windowSize = Dimensions.get("window");

const systemFonts = ["Georgia", "GeorgiaBold", ...defaultSystemFonts];

export default function TopStoriesView({ navigation, route }) {
  const { cardData, mediaData } = route.params;

  return (
      <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.logoBox}>
            <Text style={styles.logo}>The Stute</Text>
          </View>

          <FontLoader>
              {cardData.map((obj) => (
                <TouchableWithoutFeedback onPress={() => navigation.navigate("ArticleDetail", {
                  id: obj.id,
                  title: obj.title.rendered,
                  content: obj.content.rendered,
                  media: mediaData,
                })}>
                  <View style={styles.imageContainer}>
                      { 
                          obj.id in mediaData
                          ? <Image style={{ marginRight: 0, marginBottom: 20, height: 200 }} source={{ uri: mediaData[obj.id] }} /> 
                          : <View></View>
                      }
                      <RenderHTML contentWidth={windowSize.width} source={{html: obj.title.rendered }} systemFonts={systemFonts} tagsStyles={Constants.titleStyle} />
                      <RenderHTML contentWidth={windowSize.width} source={{html: obj.excerpt.rendered }} />
                      <View style={styles.horizLine} />
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </FontLoader>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      textAlign: "left",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
    horizLine: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    logo: {
      fontSize: 24,
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
      ...Platform.select({
        ios: {
          fontFamily: "Georgia",
          fontWeight: "600",
        },
        android: {
          fontFamily: "GeorgiaBold",
        }
      })
    },
    logoBox: {
      backgroundColor: "#f7f7f7",
      paddingTop: 55,
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
    imageContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      width: windowSize.width,
      marginTop: -15,
      marginBottom: 20,
    },
  });