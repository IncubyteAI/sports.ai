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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const navigation = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (fullName && email && password) {
      try {
        setEmailError(false);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const db = getFirestore();
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName,
          email: email,
        });
      } catch (err) {
        console.log("got error: ", err.message);
        if (err.code === "auth/email-already-in-use") {
          setEmailError(true);
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

      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.form}>
        <View>
          <Text style={[styles.emailtext]}>Full Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailinput}
              value={fullName}
              onChangeText={(value) => setFullName(value)}
              cursorColor={themeColors.black}
            />
          </View>

          <Text style={[styles.emailtext, { marginTop: 22 }]}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailinput}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setEmailError(false);
              }}
              cursorColor={themeColors.black}
            />
          </View>

          <Text style={[styles.emailtext, { marginTop: 22 }]}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailinput}
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
              cursorColor={themeColors.black}
            />
          </View>

          <TouchableOpacity style={styles.loginbutton} onPress={handleSubmit}>
            <Text style={styles.loginbuttontext}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.noacc}>
            <Text style={styles.noacctext}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push("/login")}>
              <Text style={styles.signuptext}> Log in</Text>
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
