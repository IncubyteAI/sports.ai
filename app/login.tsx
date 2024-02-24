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
import { g } from "@styles";

export default function LoginScreen() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async () => {
    console.log("logging in");
    if (email && password) {
      try {
        setLoginError(false);
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("got error: ", err.message);
        setLoginError(true);
      }
    }
  };

  return (
    <View style={g.main}>
      <TouchableOpacity onPress={() => navigation.back()} style={l.backbutton}>
        <Feather name="corner-up-left" size={30} color={themeColors.black} />
      </TouchableOpacity>

      <Text style={g.h1}>Log in</Text>

      <View className="self-center">
        <Text style={[g.h3]}>Email</Text>
        <View style={l.inputContainer}>
          <TextInput
            style={g.input}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setLoginError(false);
            }}
            autoCapitalize="none"
            cursorColor={themeColors.black}
          />
          {loginError && (
            <Text style={{ color: "red" }}>Invalid email or password</Text>
          )}
        </View>

        <Text style={[g.h3, { marginTop: 22 }]}>Password</Text>
        <View style={l.inputContainer}>
          <TextInput
            style={g.input}
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setLoginError(false);
            }}
            autoCapitalize="none"
            cursorColor={themeColors.black}
          />
          {loginError && (
            <Text style={{ color: "red" }}>Invalid email or password</Text>
          )}
        </View>
        <TouchableOpacity style={l.forgotpwd}>
          <Text style={l.forgotpwd}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={l.loginbutton} onPress={handleSubmit}>
          <Text style={l.loginbuttontext}>Login</Text>
        </TouchableOpacity>
        <View style={l.noacc}>
          <Text style={l.noacctext}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push("/signup")}>
            <Text style={l.signuptext}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const l = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.whitey,
  },
  form: {
    backgroundColor: themeColors.whitey,
    paddingTop: 0,
    marginTop: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  backbutton: {
    marginLeft: 20,
    marginTop: 30,
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
