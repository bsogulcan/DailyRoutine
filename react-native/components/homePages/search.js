import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Layout, Input, Divider, ListItem, Icon } from "@ui-kitten/components";

export default function Search({ route, navigation }) {
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState(undefined);
  const CurrentUser = route.params.CurrentUser;

  async function GetMyRoutines(userName) {
    if (userName) {
      setSearch(false);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserName: userName,
        }),
      };
      const response = await fetch(
        "http://192.168.56.1:6969/SearchUser",
        requestOptions
      );

      const responce = await response.json();
      if (responce.length > 0) {
        setUsers(responce);
      } else {
        setUsers(undefined);
      }
    } else {
      setUsers(undefined);
    }
  }

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  return (
    <Layout style={styles.background}>
      <Input
        style={{ margin: 10 }}
        size="large"
        value={searchText}
        placeholder="User name"
        onChangeText={(searctText) => {
          setSearch(true);
          setSearchText(searctText);
          GetMyRoutines(searctText);
        }}
      />
      <Divider />
      {users != undefined ? (
        users.map((l, i) => (
          <ListItem
            key={i}
            title={`${l.name} ${l.surname}`}
            description={`${l.userName}`}
            accessoryLeft={renderItemIcon}
            onPress={() => {
              navigation.navigate("UserProfile", {
                User: users[i],
                CurrentUserId: CurrentUser.Id,
              });
            }}
          />
        ))
      ) : (
        <Text></Text>
      )}
    </Layout>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    top: 23,
  },
});
