import { defaultSystemFonts } from "react-native-render-html";

export const POST_URL = "https://thestute.com/wp-json/wp/v2/posts";
export const FEATURED = "sticky=true"
export const PER_PAGE = "per_page="

export const MEDIA_URL = "https://thestute.com/wp-json/wp/v2/media";

export const AUTHOR_URL = "https://thestute.com/wp-json/wp/v2/users";

export const PTSerifRegular = "PTSerifRegular";
export const PTSerifItalic = "PTSerifItalic";
export const PTSerifBold = "PTSerifBold";
export const PTSerifBoldItalic = "PTSerifBoldItalic";

export const systemFonts = [
    self.PTSerifRegular,
    self.PTSerifItalic,
    self.PTSerifBold,
    self.PTSerifBoldItalic, 
    ...defaultSystemFonts
];

export const titleStyle = {
    body: {
        whiteSpace: 'normal',
        fontSize: 26,
        color: "#333333",
        fontFamily: "PTSerifBold"
    }
}

export const articleContentStyle = {
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
    em: {
        whiteSpace: 'normal',
        fontSize: 16,
        color: "#333333",
        fontFamily: "PTSerifItalic"
    }
    
}