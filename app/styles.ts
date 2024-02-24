import { StyleSheet } from "react-native";
import { themeColors } from "@assets/theme";

/**
 * Global styles: h1, h3, p, etc.
 */
export const g = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: themeColors.whitey,
  },
  h1: {
    color: themeColors.black,
    fontWeight: "200",
    fontSize: 35,
    marginTop: 15,
    fontFamily: "Kamerik-105-Bold",
    alignSelf: "center",
  },
  h3: {
    color: themeColors.black,
    marginTop: 50,
    fontWeight: "200",
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "Kamerik-105-Bold",
  },
  input: {
    width: 350,
    marginLeft: 10,
    height: 50,
    borderRadius: 15,
    fontFamily: "Kamerik-105-Bold",
  },
});
