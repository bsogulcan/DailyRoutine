import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import MyRoutines from "./homePages/routine/myRoutines";
import Search from "./homePages/search";
export default function HomePage({ route, navigation }) {
  const { Navigator, Screen } = createBottomTabNavigator();

  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

  const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
  const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="My Routines" icon={PersonIcon} />
      <BottomNavigationTab title="Search Users" icon={SearchIcon} />
    </BottomNavigation>
  );

  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen
        name="MyRoutines"
        component={MyRoutines}
        initialParams={{ CurrentUser: route.params.CurrentUser }}
        options={{ title: "My Routines", tabBarIcon: "account" }}
      />
      <Screen
        name="Settings"
        component={Search}
        initialParams={{ CurrentUser: route.params.CurrentUser }}
        options={{ title: "Search", tabBarIcon: "account-search" }}
      />
    </Navigator>
  );
}
