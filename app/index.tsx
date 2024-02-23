import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { themeColors } from "@assets/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { g } from "@styles";

export default function WelcomeScreen() {
  const navigation = useRouter();
  return (
    <SafeAreaView style={g.main}>
      <LinearGradient
        colors={[themeColors.whitey, themeColors.mblue]}
        locations={[0.0, 0.6]}
        style={styles.god}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.header}>SPORTS.AI</Text>
          <Text style={styles.subheader}>
            {"the future of \nsports coaching"}
          </Text>

          <TouchableOpacity onPress={() => navigation.push("/login")}>
            <View style={styles.loginbutton}>
              <Text style={styles.logintext}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("/signup")}>
            <View style={styles.registerbutton}>
              <Text style={styles.registertext}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  god: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    color: themeColors.whitey,
    fontWeight: "200",
    fontSize: 60,
    fontFamily: "Kamerik-105-Bold",
    marginLeft: 20,
  },
  subheader: {
    color: themeColors.whitey,
    fontWeight: "200",
    fontSize: 34,
    fontFamily: "Kamerik-105-Normal",
    marginLeft: 20,
  },
  loginbutton: {
    marginTop: 75,
    borderColor: themeColors.whitey,
    backgroundColor: themeColors.whitey,
    borderWidth: 1,
    borderRadius: 10,
    width: 375,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  logintext: {
    color: themeColors.mblue,
    fontSize: 20,
    fontFamily: "Kamerik-105-Bold",
  },
  registerbutton: {
    marginTop: 15,
    borderColor: themeColors.whitey,
    borderWidth: 1,
    borderRadius: 10,
    width: 375,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  registertext: {
    color: themeColors.whitey,
    fontSize: 20,
    fontFamily: "Kamerik-105-Bold",
  },
});
