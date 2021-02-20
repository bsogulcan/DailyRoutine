import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { ListItem, BottomSheet } from "react-native-elements";
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Button,
  Modal,
  Input,
  Divider,
  Card,
  Spinner,
} from "@ui-kitten/components";

export default function MyRoutines({ route, navigation }) {
  const [addRoutineModalVisible, setAddRoutineModalVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  const [myRoutines, setMyRoutines] = useState(undefined);
  const [getData, setgetData] = useState(true);

  const [addRoutineSummary, setaddRoutineSummary] = useState("");
  const [addRoutineDescription, setaddRoutineDescription] = useState("");
  const [addRoutineHour, setaddRoutineHour] = useState(0);
  const [addRoutineMinute, setaddRoutineMinute] = useState(0);

  const [updateRoutineSummary, setUpdateRoutineSummary] = useState("");
  const [updateRoutineHour, setUpdateRoutineHour] = useState(0);
  const [updateRoutineMinute, setUpdateRoutineMinute] = useState(0);
  const [updateRoutineDescription, setUpdateRoutineDescription] = useState("");

  const [selectedRouitineId, setSelectedRouitineId] = useState(0);

  const [updateRoutine, setUpdateRoutine] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const toggleOverlay = () => {
    setaddRoutineSummary("");
    setaddRoutineHour("");
    setaddRoutineMinute("");
    setaddRoutineDescription("");
    setAddRoutineModalVisible(!addRoutineModalVisible);
  };

  const toggleUpdateOverlay = () => {
    setUpdateVisible(!updateVisible);
  };
  const CurrentUser = route.params.CurrentUser;

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setgetData(true);
    GetMyRoutines();
    setRefreshing(false);
  }, []);

  async function GetMyRoutines() {
    if (getData) {
      setgetData(false);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: CurrentUser.Id,
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

      setMyRoutines(routines);
    }
  }

  function CreateRoutine() {
    var data = {
      userId: CurrentUser.Id,
      summary: addRoutineSummary,
      description: addRoutineDescription,
      hour: addRoutineHour,
      minute: addRoutineMinute,
    };

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
      .then((json) => {
        setgetData(true);
        GetMyRoutines();
        setAddRoutineModalVisible(false);
      })
      .catch((error) => {
        setgetData(true);
        GetMyRoutines();
        setAddRoutineModalVisible(false);
      });

    setgetData(true);
    GetMyRoutines();
    setAddRoutineModalVisible(false);
  }

  function UpdateRoutine() {
    var data = {
      id: updateRoutine.Id,
      summary: updateRoutineSummary,
      description: updateRoutineDescription,
      hour: updateRoutineHour,
      minute: updateRoutineMinute,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = fetch(
      "http://192.168.56.1:6969/UpdateRoutine",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        setgetData(true);
        GetMyRoutines();
        setUpdateVisible(false);
      });
  }

  function DeleteRoutine(id) {
    var data = {
      id: id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = fetch(
      "http://192.168.56.1:6969/DeleteRoutine",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        setgetData(true);
        GetMyRoutines();
      });
  }

  GetMyRoutines();

  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "Update",
      onPress: () => {
        setIsVisible(false);
        setUpdateVisible(true);
      },
    },
    {
      title: "Delete",
      onPress: () => {
        setIsVisible(false);
        Alert.alert(
          "Deleting Routine",
          "Are you sure to delete '" + updateRoutine.Summary + "' Routine",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                DeleteRoutine(updateRoutine.Id);
              },
            },
          ],
          { cancelable: false }
        );
      },
    },
    {
      title: "Cancel",
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <Layout style={styles.background} level="1">
      <TopNavigation
        alignment="center"
        title="Daily Routine"
        style={{ marginTop: 20 }}
        accessoryRight={() => (
          <TopNavigationAction
            onPress={() => {
              toggleOverlay();
            }}
            icon={(props) => <Icon {...props} name="plus-outline" />}
          />
        )}
      />
      <Divider />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          <Modal
            visible={addRoutineModalVisible}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setAddRoutineModalVisible(false)}
          >
            <Layout
              style={{
                width: 350,
                height: 310,
                borderRadius: 20,
              }}
            >
              <View style={{ margin: 10 }}>
                <Input
                  size="large"
                  label="Summary"
                  placeholder="Have Lunch!"
                  value={addRoutineSummary}
                  onChangeText={(summary) => {
                    setaddRoutineSummary(summary);
                  }}
                />
                <View style={styles.row}>
                  <Input
                    style={{ width: "50%" }}
                    size="medium"
                    label="Summary"
                    keyboardType={"numeric"}
                    value={addRoutineHour.toString()}
                    onChangeText={(hour) => {
                      setaddRoutineHour(hour);
                    }}
                  />
                  <Input
                    style={{ width: "47%", marginLeft: 10 }}
                    size="medium"
                    label="Minute"
                    keyboardType={"numeric"}
                    value={addRoutineMinute.toString()}
                    onChangeText={(minute) => {
                      setaddRoutineMinute(minute);
                    }}
                  />
                </View>
                <Input
                  multiline={true}
                  size="large"
                  label="Description"
                  value={addRoutineDescription}
                  textStyle={{ maxHeight: 64, minHeight: 64 }}
                  onChangeText={(desc) => {
                    setaddRoutineDescription(desc);
                  }}
                />
                <Button
                  onPress={() => {
                    CreateRoutine();
                  }}
                >
                  Add Routine
                </Button>
              </View>
            </Layout>
          </Modal>
        }
        {updateRoutine ? (
          <Modal
            visible={updateVisible}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setUpdateVisible(false)}
          >
            <Layout
              style={{
                width: 350,
                height: 310,
                borderRadius: 20,
              }}
            >
              <View style={{ margin: 10 }}>
                <Input
                  size="large"
                  label="Summary"
                  placeholder="Have Lunch!"
                  value={updateRoutineSummary}
                  onChangeText={(summary) => {
                    setUpdateRoutineSummary(summary);
                  }}
                />
                <View style={styles.row}>
                  <Input
                    style={{ width: "50%" }}
                    size="medium"
                    label="Summary"
                    keyboardType={"numeric"}
                    value={updateRoutineHour.toString()}
                    onChangeText={(hour) => {
                      setUpdateRoutineHour(hour);
                    }}
                  />
                  <Input
                    style={{ width: "47%", marginLeft: 10 }}
                    size="medium"
                    label="Minute"
                    keyboardType={"numeric"}
                    value={updateRoutineMinute.toString()}
                    onChangeText={(minute) => {
                      setUpdateRoutineMinute(minute);
                    }}
                  />
                </View>
                <Input
                  multiline={true}
                  size="large"
                  label="Description"
                  value={updateRoutineDescription}
                  textStyle={{ maxHeight: 64, minHeight: 64 }}
                  onChangeText={(desc) => {
                    setUpdateRoutineDescription(desc);
                  }}
                />
                <Button
                  onPress={() => {
                    UpdateRoutine();
                  }}
                >
                  Update Routine
                </Button>
              </View>
            </Layout>
          </Modal>
        ) : (
          <View></View>
        )}
        <View style={{ marginTop: 5 }}></View>
        <BottomSheet isVisible={isVisible}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
        {myRoutines != undefined ? (
          myRoutines.map((l, i) => (
            <Card
              key={i}
              status="primary"
              style={{ flex: 1, margin: 10 }}
              header={(props) => (
                <View {...props}>
                  <Text>{l.User.userName}</Text>
                  <Text>
                    {l.Hour}:{l.Minute}
                    {" | "} {l.Summary}
                  </Text>
                </View>
              )}
              onPress={() => {
                setUpdateRoutine(myRoutines[i]);
                setUpdateRoutineSummary(myRoutines[i].Summary);
                setUpdateRoutineDescription(myRoutines[i].Description);
                setUpdateRoutineHour(myRoutines[i].Hour);
                setUpdateRoutineMinute(myRoutines[i].Minute);
                setIsVisible(true);
              }}
            >
              <Text>{l.Description}</Text>
            </Card>
          ))
        ) : (
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <Spinner size="giant" />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
});
