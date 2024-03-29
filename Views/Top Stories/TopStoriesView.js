import * as Constants from "../../Common/Constants.js";
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
  PlatformColor,
} from "react-native";
import FontLoader from "../../Common/FontLoader.js"
import DateParser from "../../Common/DateParser.js";

const windowSize = Dimensions.get("window");

const systemFonts = [ 
  'PTSerifRegular', 
  'PTSerifItalic', 
  'PTSerifBold', 
  'PTSerifBoldItalic', 
  ...defaultSystemFonts
];

export default function TopStoriesView({ navigation, route }) {
  const { cardData, mediaData, authorData, categoryData } = route.params;

  return (
      <ScrollView style={styles.scrollContainer}>
        <FontLoader>
          <View style={styles.container}>
            {cardData.map((obj) => (
              <TouchableWithoutFeedback onPress={() => navigation.navigate("ArticleDetail", {
                title: obj.title.rendered,
                content: obj.content.rendered,
                date: obj.date,
                author: authorData[obj.author],
                mediaId: obj.featured_media,
                media: mediaData,
                categoryIds: obj.categories,
                categoryData: categoryData
              })}>
                <View style={styles.imageContainer}>
                  { 
                      obj.featured_media in mediaData
                      ? <Image style={{ marginRight: 0, marginBottom: 0, height: 200 }} source={{ uri: mediaData[obj.featured_media].guid.rendered }} /> 
                      : <View></View>
                  }
                  <RenderHTML contentWidth={windowSize.width} source={{html: obj.title.rendered }} systemFonts={systemFonts} tagsStyles={Constants.topTitleStyle} />
                  <RenderHTML contentWidth={windowSize.width} source={{html: obj.excerpt.rendered }} systemFonts={systemFonts} tagsStyles={Constants.articleContentStyle} />
                  <Text style={styles.author}>{authorData[obj.author].name+" • "+DateParser(obj.date)}</Text>
                  <View style={styles.horizLine} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </FontLoader>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      textAlign: "left",
      backgroundColor: "#FFFFFF",
    },
    container: {
      paddingTop: 20,
    },
    horizLine: {
      borderBottomColor: "#AEAEB2",
      borderBottomWidth: 1,
    },
    logo: {
      fontSize: 24,
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
      fontFamily: "AbrilFatface"
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
    author: {
      fontFamily: "PTSerifRegular",
      fontSize: 12,
      paddingTop: 3,
      paddingBottom: 5,
      ...Platform.select({
        ios: {
          color: PlatformColor("systemGrayColor")
        },
        android: {
          color: PlatformColor("@android:color/darker_gray")
        }
      })
    }
  });