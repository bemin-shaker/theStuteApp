import { useEffect } from "react";
import * as Constants from "../Common/Constants.js";

const LoadingView = ({url, setIsLoading, setCardData, setMediaData, setAuthorData}) => {
    const fetchURL = async (url) => {
      console.log(url);
      let response = await fetch(url);
      let data = await response.json();
      return data;
    }
  
    const fetchData = async () => {
      try {
        let cardData = await fetchURL(url);
    
        let img = {};
        let author = {};

        for (element of cardData) {
          if (element.featured_media != 0) {
            let imgData = await fetchURL(Constants.MEDIA_URL+"/"+element.featured_media);
            img[element.id] = imgData;
          }

          if (!(element.author in author)) {
            let authorData = await fetchURL(Constants.AUTHOR_URL+"/"+element.author);
            author[element.author] = authorData;
          }

          element.content.rendered = element.content.rendered.split("\n").join("");
          element.content.rendered = element.content.rendered.split("</p><p>").join("<br><br>");
          element.content.rendered = element.content.rendered.split("<p>").join("");
          element.content.rendered = element.content.rendered.split("</p>").join("");
          
          element.excerpt.rendered = element.excerpt.rendered.split("\n").join("");
          element.excerpt.rendered = element.excerpt.rendered.split("</p><p>").join("<br><br>");
          element.excerpt.rendered = element.excerpt.rendered.split("<p>").join("");
          element.excerpt.rendered = element.excerpt.rendered.split("</p>").join("");
        }
    
        setCardData(cardData);
        setMediaData(img);
        setAuthorData(author);

      } catch (error) {
        console.error(error)
      }
    }
  
    useEffect(() => {
      fetchData(url)
        .then(() => {
          setIsLoading(false)
        })
    }, [])

    return null
  }
  
export default LoadingView