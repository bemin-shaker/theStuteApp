import { Platform } from "react-native";
import moment from "moment";

export default function DateParser(str) {
    if (Platform.OS == "ios") {
        return moment(Date.parse(str)).format("MMMM D, YYYY");

    } else if (Platform.OS == "android") {
        return moment(Date.parse(str)).add(1, 'day').format("MMMM D, YYYY");
    }

    return null;
}