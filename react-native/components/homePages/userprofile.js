import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Button,
  Modal,
  Input,
  Divider,
  Card,
  Spinner,
} from "@ui-kitten/components";
import { TouchableHighlight } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

export default function UserProfile({ route, navigation }) {
  const User = route.params.User;
  const CurrentUserId = route.params.CurrentUserId;
  const [routines, setRoutines] = useState(undefined);

  const [selectedRoutineSummary, setSelectedRoutineSummary] = useState("");
  const [selectedRoutineHour, setSelectedRoutineHour] = useState(0);
  const [selectedRoutineMinute, setSelectedRoutineMinute] = useState(0);
  const [selectedRoutineDescription, setSelectedRoutineDescription] = useState(
    ""
  );

  async function GetRoutines() {
    if (routines == undefined) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: User.id,
        }),
      };
      const response = await fetch(
        "http://192.168.56.1:6969/GetMyRoutines",
        requestOptions
      );

      const responce = await response.json();

      const routines = responce.map((item) => {
        const routine = {};
        routine.Id = item.id;
        routine.UserId = item.userId;
        routine.Summary = item.summary;
        routine.Description = item.description;
        routine.Hour = item.hour;
        routine.Minute = item.minute;
        routine.User = item.user;
        return routine;
      });
      console.log(routines);
      setRoutines(routines);
    }
  }

  GetRoutines();

  function CreateRoutine(data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = fetch(
      "http://192.168.56.1:6969/CreateRoutine",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {})
      .catch((error) => {});

    Toast.showWithGravity("Copied Routine", Toast.LONG, Toast.CENTER);
  }

  return (
    <Layout style={{ flex: 1 }} level="1">
      <TopNavigation
        alignment="center"
        title={`${User.name} ${User.surname}`}
        style={{ marginTop: 20 }}
      />
      <Divider />
      <ScrollView>
        {routines != undefined ? (
          routines.map((l, i) => (
            <Card
              key={i}
              status="warning"
              style={{ flex: 1, margin: 10 }}
              header={(props) => (
                <View {...props}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>
                      {l.Hour}:{l.Minute} | {l.Summary}
                    </Text>
                    <TouchableHighlight
                      onPress={() => {
                        setSelectedRoutineSummary(l.Summary);
                        setSelectedRoutineHour(l.Hour);
                        setSelectedRoutineMinute(l.Minute);
                        setSelectedRoutineDescription(l.Description);
                        Alert.alert(
                          "Copy Routine",
                          "Dou you want to take this routine '" +
                            l.Summary +
                            "'",
                          [
                            {
                              text: "Cancel",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () => {
                                var data = {
                                  userId: CurrentUserId,
                                  summary: l.Summary,
                                  description:
                                    l.Description +
                                    " ~ Copied from @" +
                                    User.userName,
                                  hour: l.Hour,
                                  minute: l.Minute,
                                };
                                CreateRoutine(data);
                              },
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Icon
                        style={{ width: 25, height: 25 }}
                        fill="#8F9BB3"
                        name="copy-outline"
                      ></Icon>
                    </TouchableHighlight>
                  </View>
                </View>
              )}
            >
              <Text>{l.Description}</Text>
            </Card>
          ))
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 500,
              width: "100%",
            }}
          >
            <Spinner size="giant" />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
