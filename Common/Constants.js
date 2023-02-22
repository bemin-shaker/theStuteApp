import { Platform } from "react-native";

export const POST_URL = "https://thestute.com/wp-json/wp/v2/posts";
export const FEATURED = "sticky=true"
export const PER_PAGE = "per_page="

export const MEDIA_URL = "https://thestute.com/wp-json/wp/v2/media";

export const titleStyle = {
    body: {
        whiteSpace: 'normal',
        fontSize: 27,
        color: "#333333",
        ...Platform.select({
            ios: {
                fontFamily: "Georgia",
                fontWeight: "600",
            },
            android: {
                fontFamily: "GeorgiaBold"
            }
        })
    }
}