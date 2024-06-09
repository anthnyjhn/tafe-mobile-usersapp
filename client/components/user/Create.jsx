import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
const styles = require("../../styles.json");

const Create = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const submit = () => {
    props.loader();
    fetch("http://localhost:3000/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    })
      .then((r) => r.json())
      .then((j) => props.success(j))
      .catch((e) => console.error(e.message))
      .finally(() => props.close());
  };

  return (
    <View>
      <View style={createStyles.nameAgeRow}>
        <View>
          <Text style={{}}>Name: </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{ ...styles.border }}
          />
        </View>

        <View>
          <Text style={{}}>Age: </Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={{ ...styles.border }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Pressable
          onPress={submit}
          style={{
            borderRadius: 4,
            backgroundColor: "#035afc",
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 4,
            marginBottom: 6,
            minWidth: "48%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              height: "100%",
            }}
          >
            Save
          </Text>
        </Pressable>{" "}
        <Pressable
          onPress={() => props.close()}
          style={{
            flex: 1,
            backgroundColor: "#FC4B6C",
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 4,
            marginBottom: 6,
            minWidth: "48%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const createStyles = StyleSheet.create({
  nameAgeRow: {
    flexDirection: "row",
  },
});

export default Create;
