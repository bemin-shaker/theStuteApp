export default function CategoryInfo(ids, data) {
    var output = "<br>Published in ";

    for (let i = 0; i < ids.length; i++) {
        var name = data[ids[i]].name;
        output += "<ins>"+name+"</ins>"

        if (ids.length == 2 && ids.length - i == 2) {
            output += " and ";
        
        } else if (ids.length != 2 && ids.length - i == 2) {
            output += ", and ";
        
        } else if (ids.length != 2 && ids.length - i > 2) {
            output += ", ";
        }
    }

    return output;
}