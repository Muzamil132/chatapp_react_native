import React, { useContext } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../firebase";
import tw from "react-native-tailwindcss";
import { StateContext } from "../context/StateContext";
import StyledButton from "./Button.js";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";

const Home = ({ navigation }) => {
  const [room, setRoom] = React.useState("");
  const [chats, setChats] = React.useState([]);
  const { state, addUser } = useContext(StateContext);
  console.log(state);
  // const chatId = Math.random().toString(36).substring(7);

  React.useEffect(() => {
    const unsub = db.collection("Chats").onSnapshot((snapshot) => {
      let bucket = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      });
      setChats(bucket);
      console.log(bucket);
    });
    return () => unsub();
  }, []);

  const addChateRoom = async () => {
    if (name) {
      db.collection("Chats").add({
        name: room,
      });
      setRoom("");
    } else {
      alert("Please enter a room name");
    }
  };

  // const goToChat = async () => {
  //   await setDoc(
  //     doc(db, "Great", chatId),
  //     {
  //       msg: "Hello",
  //     },
  //     { merge: true }
  //   );
  //   console.log(room);
  // };

  const [name, setName] = React.useState("");
  const userId = Math.random().toString(36).substring(7);

  // const addUser = () => {
  //   console.log("goooood");
  //   try {
  //     console.log("Added");
  //     AsyncStorage.setItem("user", JSON.stringify(name));
  //     setName("");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const myIcon = <Icon name="send-o" size={30} color="#374151" />;
  return (
    <View style={styles.container}>
      {state.user ? (
        <>
          <View style={styles.inputbox}>
            <TextInput
              value={room}
              onChangeText={(text) => setRoom(text)}
              style={styles.input}
              placeholder="Create Chat"
            />
            <TouchableOpacity onPress={addChateRoom}>{myIcon}</TouchableOpacity>
          </View>
          <ScrollView>
            {chats.map((chat) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("profile", { name: chat })}
              >
                <View style={styles.chatbox}>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2020/02/26/11/19/medicinal-herb-4881474_960_720.jpg",
                    }}
                  />
                  <View style={styles.headingbox}>
                    <Text style={styles.title}>{chat.name}</Text>
                    <Text style={styles.msg}>Yeah this is a good thing</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.inputbox}
            placeholder="Add User"
          />

          <StyledButton onPress={() => addUser(name)} title="ADD NAME" />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#374151",
    fontSize: 15,
  },
  msg: {
    fontSize: 14,
    color: "#374151",
  },
  headingbox: {
    paddingHorizontal: 10,
  },
  chatbox: {
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  input: {
    flex: 1,
  },
  roomheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#374151",
  },

  inputbox: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderColor: "lightgray",
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
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

  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
});
