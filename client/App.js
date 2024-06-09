import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import User from "./components/user";
const styles = require("./styles.json");

const app = () => {
  //state
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("loading");
  //use effect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/people");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(JSON.stringify(error));
      } finally {
        setCurrentView("list");
      }
    };

    fetchUsers();
  }, []);
  //JSX (conditional return on value of currentView state managed variable)
  if (currentView == "loading")
    return (
      <View style={styles.border}>
        <Text>Loading...</Text>
      </View>
    );
  if (currentView == "list")
    return (
      <View>
        <Pressable
          onPress={() => setCurrentView("create")}
          style={stylest.addUserBtn}
        >
          <Text style={stylest.addUserTxt}>Add user</Text>
        </Pressable>
        <User.List
          users={users}
          update={(u) => {
            setUser(u);
            setCurrentView("edit");
          }}
          success={(u) => {
            const nes = users.filter(usahs => usahs.id != u.id);
            setUsers(nes)
          }}
        />
      </View>
    );
  if (currentView == "create")
    return (
      <View>
        <User.Create
          success={(u) => setUsers([...users, u])}
          close={() => setCurrentView("list")}
          loader={() => setCurrentView("loader")}
        />
      </View>
    );
  if (currentView == "edit")
    return (
      <View>
        <User.Edit
          user={user}
          success={(updatedUser) =>
            setUsers(
              users.map((u) => (u.id == updatedUser.id ? updatedUser : u))
            )
          }
          close={() => setCurrentView("list")}
          loader={() => setCurrentView("loader")}
        />
      </View>
    );
};

export default app;

const stylest = StyleSheet.create({
  addUserBtn: {
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#FC4B6C",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  addUserTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
