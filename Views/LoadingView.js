import { useEffect } from "react";
import * as Constants from "../Common/Constants.js";

const LoadingView = ({url, setIsLoading, setCardData, setMediaData, setAuthorData, setCategoryData}) => {
    const fetchURL = async (url) => {
      console.log(url);
      let response = await fetch(url);
      let data = await response.json();
      return data;
    }
  
    const fetchData = async () => {
      try {
        let cardData = await fetchURL(url);
    
        let imgIds = [];
        let authorIds = [];
        let cateogryIds = [];

        for (element of cardData) {
          if (element.featured_media != 0 && !imgIds.includes(element.featured_media)) {
            imgIds.push(element.featured_media);
          }

          if (!authorIds.includes(element.author)) {
            authorIds.push(element.author);
          }

          for (let i = 0; i < element.categories.length; i++) {
            let id = element.categories[i];
            if (!cateogryIds.includes(id)) {
              cateogryIds.push(id);
            }
          }

          element.content.rendered = element.content.rendered.split("\n").join("");
          element.content.rendered = element.content.rendered.split("</p><p>").join("<br><br>");
          element.content.rendered = element.content.rendered.split("<p>").join("");
          element.content.rendered = element.content.rendered.split("</p>").join("");
          element.content.rendered = element.content.rendered.split("</em><em>").join("");
          
          element.excerpt.rendered = element.excerpt.rendered.split("\n").join("");
          element.excerpt.rendered = element.excerpt.rendered.split("</p><p>").join("<br><br>");
          element.excerpt.rendered = element.excerpt.rendered.split("<p>").join("");
          element.excerpt.rendered = element.excerpt.rendered.split("</p>").join("");
          
        }

        imgIds.sort(function(a,b) {
          return a-b;
        })

        authorIds.sort(function(a,b) {
          return a-b;
        })

        cateogryIds.sort(function(a,b) {
          return a-b;
        })

        var authorList = "";
        var mediaList = "";
        var categoryList = "";

        for (let i = 0; i < authorIds.length; i++) {
          if (i == authorIds.length-1) {
            authorList += authorIds[i];
         
          } else {
            authorList += authorIds[i]+",";
          }
        }

        for (let i = 0; i < imgIds.length; i++) {
          if (i == imgIds.length-1) {
            mediaList += imgIds[i];
          } else {
            mediaList += imgIds[i]+",";
          }
        }

        for (let i = 0; i < cateogryIds.length; i++) {
          if (i == cateogryIds.length-1) {
            categoryList += cateogryIds[i];
          } else {
            categoryList += cateogryIds[i]+",";
          }
        }

        var images = {};
        var authors = {};
        var categories = {};

        if (imgIds.length != 0) {
          let imgData = await fetchURL(Constants.MEDIA_URL+"?"+Constants.INCLUDE+mediaList+"&"+Constants.ORDERBY_ID);

          for (let i = 0; i < imgData.length; i++) {
            images[imgIds[i]] = imgData[i];
          }
        }

        let authorData = await fetchURL(Constants.AUTHOR_URL+"?"+Constants.INCLUDE+authorList+"&"+Constants.ORDERBY_ID);

        for (let i = 0; i < authorData.length; i++) {
          authors[authorIds[i]] = authorData[i];
        }

        let categoryData = await fetchURL(Constants.CATEGOY_URL+"?"+Constants.INCLUDE+categoryList+"&"+Constants.ORDERBY_ID);
        for (let i = 0; i < categoryData.length; i++) {
          categories[cateogryIds[i]] = categoryData[i];
        }
    
        console.log(images);

        setCardData(cardData);
        setMediaData(images);
        setAuthorData(authors);
        setCategoryData(categories);

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