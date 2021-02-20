import React from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import StartUp from "./components/startup";
import SingIn from "./components/auth/singin";
import SingUp from "./components/auth/sinup";
import HomePage from "./components/homepage";
import UserProfile from "./components/homePages/userprofile";

const { Navigator, Screen } = createStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Navigator headerMode="none">
      <Screen name="Startup" component={StartUp} />
      <Screen name="SingIn" component={SingIn} />
      <Screen name="SingUp" component={SingUp} />
      <Screen name="HomePage" component={HomePage} />
      <Screen name="UserProfile" component={UserProfile} />
    </Navigator>
  </NavigationContainer>
);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Router />
      </ApplicationProvider>
    </View>
  );
}
