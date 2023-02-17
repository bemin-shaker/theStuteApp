import React from "react";
import { 
  TRenderEngineProvider, 
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  RenderHTML,
  defaultSystemFonts
} from "react-native-render-html";
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

const systemFonts = ["Georgia", ...defaultSystemFonts]

const POST_URL = "https://thestute.com/wp-json/wp/v2/posts";
const FEATURED = "sticky=true"
const PER_PAGE = "per_page="

const MEDIA_URL = "https://thestute.com/wp-json/wp/v2/media";

const windowSize = Dimensions.get("window");

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var totalDate = date + "-" + month + "-" + year;

var stuteLogo =
  "https://media-exp1.licdn.com/dms/image/C4D1BAQHmMcAf2SDb4A/company-background_10000/0/1605410572468?e=2159024400&v=beta&t=_lI8VdXCqfQ_iO29432uvLuA9yYu_9OAcdJHVV3roRA";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  getInitialState() {
    return {
      card: null,
      images: { },
    };
  }

  componentDidMount() {
    this.fetchData(POST_URL+"?"+FEATURED+"&"+PER_PAGE+"10");
  }

  fetchData = async (url) => {
    console.log(url);
    this.setState({
      card: null,
      images: {},
    });

    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      card: {
        cardData: data,
      }
    })

    let img = {};
    for (const element of this.state.card.cardData) {
      if (element.featured_media != 0) {
        let html = await this.fetchMedia(MEDIA_URL+"/"+element.featured_media);
        img[element.id] = html;
      }
    }

    this.setState ({
      images: img
    })
  }

  fetchMedia = async(url) => {
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    return data.guid.rendered;
  }

  render() {
    if (!this.state.card) {
      return this.renderLoadingView();
    }

    return this.renderCard();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.loader}>The Stute</Text>
        <Text style={styles.text}>{totalDate}</Text>
      </View>
    );
  }

  renderCard() {
    this.state.card.cardData.forEach((element) => {
      console.log(element.title.rendered);
    });
    
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Text style={styles.logo}>The Stute</Text>
          </View>

          {this.state.card.cardData.map((obj) => (
            <View style={styles.imageContainer}>
              { obj.id in this.state.images ? <Image style={{ marginRight: 0, marginBottom: 20, height: 200 }} source={{ uri: this.state.images[obj.id] }} /> : <View></View>}
              <RenderHTML contentWidth={windowSize.width} source={{html: obj.title.rendered }} tagsStyles={titleStyle} />
              <RenderHTML contentWidth={windowSize.width} source={{html: obj.excerpt.rendered }} />
              {/* <Image
                style={{ marginRight: 0, marginBottom: 20, height: 200 }}
                source={{ uri: this.state.card.pic }}
              /> */}
              <View style={styles.horizLine} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

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
