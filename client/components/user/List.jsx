import React from "react";
import axios from "axios";
import { View, Text, Pressable, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const List = (props) => {
  // Log the users prop to ensure it's being passed correctly
  console.log("props.users:", props.users);

  // Check if props.users is an array
  if (!Array.isArray(props.users)) {
    console.error("props.users is not an array:", props.users);
    return <Text>No data available</Text>;
  }

  return (
    <View>
      {props.users.map((u) => (
        <View key={u.id} style={listStyle.allViews}>
          <Text style={listStyle.userNameTxt}>
            {u.name} {u.age}
          </Text>
          <Pressable
            onPress={() => props.update(u)}
            style={listStyle.pressables}
          >
            <Text style={listStyle.allTexts}>Update</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              deleteUser(u, props);
            }}
            style={listStyle.pressables2}
          >
            <Text style={listStyle.allTexts}>Delete</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const deleteUser = (u, p) => {
  try {
    axios.delete(`http://localhost:3000/people/${u.id}`).finally(() => {
      p.success(u);
    });
  } catch (error) {
    console.error(error);
  }
};

const listStyle = StyleSheet.create({
  userNameTxt: {
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#bfbfbf",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    color: "black",
  },
  pressables: {
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#1E88E5",
    marginBottom: 6,
    minWidth: "48%",
  },
  pressables2: {
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#FC4B6C",
    marginBottom: 6,
    minWidth: "48%",
  },
  allTexts: {
    color: "white",
    textAlign: "center",
  },
  allViews: {
    flexDirection: "row",
    gap: 5,
  },
});

List.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    })
  ).isRequired,
  update: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
};

export default List;
