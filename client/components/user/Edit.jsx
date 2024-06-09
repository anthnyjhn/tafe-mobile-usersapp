import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
const styles = require("../../styles.json");

const Edit = (props) => {
  const [name, setName] = useState(props.user.name);
  const [age, setAge] = useState(props.user.age);
  const submit = () => {
    props.loader();
    fetch(`http://localhost:3000/people/${props.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.user.id, name, age }),
    })
      .then((r) => r.json())
      .then((j) => props.success(j))
      .catch((e) => console.error(e.message))
      .finally(() => props.close());
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
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
        </Pressable>
        <Pressable
          onPress={() => props.close()}
          style={{
            width: 60,
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
export default Edit;
