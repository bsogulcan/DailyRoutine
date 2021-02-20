import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button} from "@ui-kitten/components";

export default function Startup({ navigation }) {
  
  return (
    <Layout style={{ flex: 1, alignItems: "center" }}>
      <Text category="h1" style={styles.title}>
        Daily Routine
      </Text>
      <Button
        style={styles.buttons}
        appearance="ghost"
        status="basic"
        onPress={() => navigation.navigate("SingIn")}
      >
        SING IN
      </Button>
      <Button
        style={styles.buttons}
        appearance="ghost"
        status="basic"
        onPress={() => navigation.navigate("SingUp")}
      >
        SING UP
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    top: 90,
    width: "100%",
    textAlign: "center",
    letterSpacing: 20,
  },
  buttons: {
    top: 120,
  },
});
