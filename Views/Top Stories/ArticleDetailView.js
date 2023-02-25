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

export default function ArticleDetailView({ navigation, route }) {
    const { id, title, content, date, author, media } = route.params;

    return(
        <ScrollView style={styles.scrollContainer}>
            <FontLoader>
                <View style={styles.imageContainer}>
                    { 
                        media != null && id in media
                        ? <Image style={{ marginRight: 0, marginBottom: 0, height: 200 }} source={{ uri: media[id].guid.rendered }} />
                        : <View></View>
                    }
                    <RenderHTML contentWidth={windowSize.width} source={{ html: title }} systemFonts={systemFonts} tagsStyles={Constants.titleStyle} />
                    <Text style={styles.author}>{author.name+" • "+DateParser(date)}</Text>
                    <RenderHTML contentWidth={windowSize.width} source={{ html: content }} systemFonts={systemFonts} tagsStyles={Constants.articleContentStyle} />
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
    horizLine: {
      borderBottomColor: "#AEAEB2",
      borderBottomWidth: 1,
    },
    logo: {
      fontSize: 24,
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
      fontFamily: "PTSerifBold"
    },
    logoBox: {
      backgroundColor: "#f7f7f7",
      paddingTop: 10,
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
      paddingTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      width: windowSize.width,
      marginBottom: 20,
    },
    author: {
      fontFamily: "PTSerifRegular",
      fontSize: 12,
      paddingBottom: 10,
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