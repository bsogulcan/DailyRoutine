import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import User from "../../models/user";
import { Layout, Input, Text, Spinner, Button } from "@ui-kitten/components";

export default function SingIn({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  var _loginRequest = async () => {
    // if (userName.length == 0 || password.length == 0) return;

    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    };
    const response = await fetch(
      "http://192.168.56.1:6969/LogIn",
      requestOptions
    );

    const user = new User(await response.json());
    if (user.Id) {
      navigation.navigate("HomePage", { CurrentUser: user });
    }
    setLoading(false);
  };

  return (
    <Layout style={styles.background}>
      <Text category="h1" style={styles.title}>
        Daily Routine
      </Text>
      {loading ? (
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <Spinner size="giant" />
        </View>
      ) : (
        <View> 
          <Input
            size="large"
            style={styles.userNameInput}
            value={userName}
            label="User name"
            onChangeText={(value) => setUserName(value)}
          />
          <Input
            size="large"
            style={styles.userNameInput}
            value={password}
            label="Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
          <View style={{ alignItems: "center" }}>
            <Button
              status="basic"
              onPress={() => _loginRequest()}
              style={styles.loginButton}
            >
              Login
            </Button>
          </View>
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  title: {
    top: 20,
    width: "100%",
    fontSize: 50,
    textAlign: "center",
  },
  userNameInput: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    top: 40,
  },
  loginButton: {
    top: 40,
    width: "50%",
    borderRadius: 20,
    height: 44,
    alignItems: "center",
  },
});