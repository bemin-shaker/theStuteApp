import { useEffect } from "react";
import * as Constants from "../Constants.js";

const LoadingScreen = ({url, setIsLoading, setCardData, setMediaData}) => {
    const fetchMedia = async (mediaUrl) => {
      console.log(mediaUrl);
      let response = await fetch(mediaUrl);
      let data = await response.json();
      return data.guid.rendered;
    }
  
    const fetchData = async () => {
      try {
        console.log(url);
    
        let response = await fetch(url);
        let data = await response.json();
        setCardData(data);
    
        let img = {};
        for (const element of data) {
          if (element.featured_media != 0) {
            let html = await fetchMedia(Constants.MEDIA_URL+"/"+element.featured_media);
            img[element.id] = html;
          }
        }
    
        setMediaData(img);

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
  
export default LoadingScreen