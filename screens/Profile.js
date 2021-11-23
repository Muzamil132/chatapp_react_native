import React from "react";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StateContext } from "../context/StateContext";
import db from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Profile = ({ route }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const {
    state: { user },
  } = React.useContext(StateContext);
  console.log(user);

  const SendMessage = () => {
    console.log(route.params.name);
    db.collection("Chats")
      .doc(route.params.name.id)
      .collection("messages")
      .add({
        message,
        name: user.name,
        msgId: user.userId,

        createdAt: new Date(),
      });

    setMessage("");
  };

  React.useEffect(() => {
    if (route.params.name.id) {
      getMessages();
    }
  }, []);

  const getMessages = () => {
    const unsub = db
      .collection("Chats")
      .doc(route.params.name.id)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        let bucket = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            message: doc.data().message,
            createdAt: doc.data().createdAt,
            msgId: doc.data().msgId,
            name: doc.data().name,
          };
        });
        console.log(bucket);
        setMessages(bucket);
      });
    return () => unsub();
  };

  const myIcon = <Icon name="send" size={30} color="#374151" />;
  return (
    <View style={styles.chatcontainer}>
      <ScrollView>
        <View style={styles.chatbox}>
          {messages.map((message) => (
            <View
              style={
                user.userId == message.msgId ? styles.msgbox : styles.msgbox1
              }
            >
              <Text
                style={
                  user.userId == message.msgId
                    ? styles.msguser
                    : styles.msguser1
                }
              >
                {message.name}
              </Text>
              <Text
                style={user.userId == message.msgId ? styles.msg : styles.msg1}
              >
                {message.message}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputbox}>
        <TextInput
          onChangeText={(text) => setMessage(text)}
          value={message}
          style={styles.input}
          placeholder="Write..."
        />
        <TouchableOpacity onPress={SendMessage}>{myIcon}</TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  msguser: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  msguser1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
  },

  input: {
    flex: 1,
  },
  inputbox: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  msg: {
    fontSize: 13,
    color: "#fff",
  },
  msg1: {
    fontSize: 13,
    color: "#1e293b",
  },
  msgbox1: {
    borderRadius: 5,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fafafa",
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,

    maxWidth: "80%",
    margin: 5,
  },
  msgbox: {
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignSelf: "flex-start",
    borderRadius: 5,
    backgroundColor: "#1e293b",
    paddingHorizontal: 10,
    paddingVertical: 5,

    maxWidth: "80%",
    margin: 5,
  },

  chatcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e5e7eb",
  },
  chatbox: {
    // backgroundColor: "orange",
    flex: 1,
  },
});
