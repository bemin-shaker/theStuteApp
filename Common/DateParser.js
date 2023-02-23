import dateFormat from "dateformat";

export default function DateParser(str) {
    let date = Date.parse(str);
    return dateFormat(date, "mmmm d, yyyy");
}