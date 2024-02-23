import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { themeColors } from "@assets/theme";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        setLoginError(false);
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("got error: ", err.message);
        if (
          err.code === "auth/invalid-email" ||
          err.code === "auth/invalid-login-credentials"
        ) {
          setLoginError(true);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.back()}
        style={styles.backbutton}
      >
        <Feather name="corner-up-left" size={30} color={themeColors.black} />
      </TouchableOpacity>

      <Text style={styles.header}>Log in</Text>

      <View style={styles.form}>
        <View>
          <Text style={[styles.emailtext]}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailinput}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setLoginError(false);
              }}
              cursorColor={themeColors.black}
            />
          </View>

          <Text style={[styles.emailtext, { marginTop: 22 }]}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailinput}
              secureTextEntry
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setLoginError(false);
              }}
              cursorColor={themeColors.black}
            />
          </View>

          <TouchableOpacity style={styles.forgotpwd}>
            <Text style={styles.forgotpwd}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginbutton} onPress={handleSubmit}>
            <Text style={styles.loginbuttontext}>Login</Text>
          </TouchableOpacity>

          <View style={styles.noacc}>
            <Text style={styles.noacctext}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push("/signup")}>
              <Text style={styles.signuptext}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.whitey,
  },
  header: {
    color: themeColors.black,
    fontWeight: "200",
    fontSize: 35,
    marginTop: 15,
    fontFamily: "Kamerik-105-Bold",
    alignSelf: "center",
  },
  form: {
    backgroundColor: themeColors.whitey,
    paddingTop: 0,
    marginTop: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  backbutton: {
    marginLeft: 20,
    marginTop: 30,
  },
  emailtext: {
    color: themeColors.black,
    marginTop: 50,
    fontWeight: "200",
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "Kamerik-105-Bold",
  },
  emailinput: {
    width: 350,
    marginLeft: 10,
    height: 50,
    borderRadius: 15,
    fontFamily: "Kamerik-105-Bold",
  },
  forgotpwd: {
    alignItems: "flex-end",
    marginRight: 5,
    fontFamily: "Kamerik-105-Bold",
    marginTop: 10,
    color: themeColors.black,
  },
  loginbutton: {
    padding: 10,
    borderRadius: 10,
    width: 375,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: themeColors.mblue,
  },
  loginbuttontext: {
    fontFamily: "Kamerik-105-Bold",
    color: themeColors.whitey,
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: 355,
    marginLeft: 10,
    marginTop: 10,
    borderColor: themeColors.mblue,
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
  },
  noacc: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  noacctext: {
    fontFamily: "Kamerik-105-Normal",
    fontSize: 15,
  },
  signuptext: {
    fontFamily: "Kamerik-105-Bold",
    fontSize: 15,
    color: themeColors.mblue,
  },
});
