import { defaultSystemFonts } from "react-native-render-html";
import { Platform } from "react-native";


export const POST_URL = "https://thestute.com/wp-json/wp/v2/posts";
export const FEATURED = "sticky=true"
export const PER_PAGE = "per_page="
export const INCLUDE = "include="
export const ORDERBY_ID = "orderby=id"

export const MEDIA_URL = "https://thestute.com/wp-json/wp/v2/media";

export const AUTHOR_URL = "https://thestute.com/wp-json/wp/v2/users";

export const CATEGOY_URL = "https://thestute.com/wp-json/wp/v2/categories";

export const PTSerifRegular = "PTSerifRegular";
export const PTSerifItalic = "PTSeri_Italic";
export const PTSerifBold = "PTSerifBold";
export const PTSerifBoldItalic = "PTSerifBoldItalic";

export const topTitleStyle = {
    body: {
        whiteSpace: 'normal',
        fontSize: 26,
        color: "#333333",
        fontFamily: "PTSerifBold"
    }
}

export const titleStyle = {
    body: {
        whiteSpace: 'normal',
        fontSize: 22,
        color: "#333333",
        fontFamily: "PTSerifRegular"
    }
}

export const articleContentStyle = {
    em: {
        whiteSpace: 'normal',
        fontSize: 16,
        color: "#333333",
        fontFamily: "PTSerifItalic"
    },
    body: {
        whiteSpace: 'normal',
        fontSize: 16,
        color: "#333333",
        fontFamily: "PTSerifRegular"
    },
    figcaption: {
        whiteSpace: 'normal',
        fontSize: 16,
        color: "#333333",
        fontFamily: "PTSerifItalic"
    },
}

export const categoryStyle = {
    body: {
        whiteSpace: 'normal',
        fontSize: 16,
        color: "#333333",
        fontFamily: "PTSerifRegular"
    },
    ins: {
        paddingTop: 10,
        whiteSpace: 'normal',
        fontSize: 16,
        color: "#333333",
        fontFamily: "PTSerifRegular"
    } 
}