import { 
  useFonts,
  PTSerif_400Regular,
  PTSerif_400Regular_Italic,
  PTSerif_700Bold,
  PTSerif_700Bold_Italic,
 } from "@expo-google-fonts/pt-serif";
import { AbrilFatface_400Regular } from "@expo-google-fonts/abril-fatface";

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    "PTSerifRegular" : PTSerif_400Regular,
    "PTSerifItalic" : PTSerif_400Regular_Italic,
    "PTSerifBold" : PTSerif_700Bold,
    "PTSerifBoldItalic" : PTSerif_700Bold_Italic,
    "AbrilFatface" : AbrilFatface_400Regular,
  }); 

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>
}