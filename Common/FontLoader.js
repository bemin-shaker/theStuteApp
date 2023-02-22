import { useFonts } from "expo-font";

export default function FontLoader({ children }) {
    const [fontsLoaded] = useFonts({
      "Georgia" : require("../assets/fonts/Georgia.ttf"),
      "GeorgiaBold" : require("../assets/fonts/GeorgiaBold.ttf"),
    }); 
  
    if (!fontsLoaded) {
      return null;
    }
  
    return <>{children}</>
  }