import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import User from './components/user';
const styles = require('./styles.json');

const App = () => {
  // State
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState('loading');

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/people');
        const data = await response.json();
        setUsers(data);
        setCurrentView('list');
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setCurrentView('error');
      }
    };

    fetchUsers();
  }, []);

  // Sorting helpers
  const sortUsersByAge = () => setUsers([...users].sort((a, b) => a.age - b.age));
  const sortUsersByName = () => setUsers([...users].sort((a, b) => a.name.localeCompare(b.name)));

  // Update user list
  const updateUserList = (updatedUser) =>
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));

  // Move user up
  const moveUserUp = (u) => {
    const tempUsers = [...users];
    const uIndex = users.findIndex((usahs) => usahs.id === u.id);
    const topUsahIndex = uIndex - 1;

    if (uIndex <= 0) {
      alert("Invalid action");
    } else {
      let temp = tempUsers[uIndex];
      tempUsers[uIndex] = tempUsers[topUsahIndex];
      tempUsers[topUsahIndex] = temp;

      setUsers([...tempUsers]);
      console.log(users);
  }};

  // Conditional rendering
  const renderContent = () => {
    switch (currentView) {
      case 'loading':
        return (
          <View style={styles.border}>
            <ActivityIndicator />
          </View>
        );
      case 'list':
        return (
          <View>
            <Pressable onPress={() => setCurrentView('create')} style={customStyles.addUserBtn}>
              <Text style={customStyles.addUserTxt}>Add User</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Pressable onPress={sortUsersByAge} style={customStyles.sortBtn}>
                <Text style={customStyles.sortBtnTxt}>Sort by Age</Text>
              </Pressable>
              <Pressable onPress={sortUsersByName} style={customStyles.sortBtn}>
                <Text style={customStyles.sortBtnTxt}>Sort by Name</Text>
              </Pressable>
            </View>
            <User.List
              users={users}
              update={(u) => {
                setUser(u);
                setCurrentView('edit');
              }}
              success={(u) => setUsers(users.filter((user) => user.id !== u.id))}
              move={moveUserUp}
            />
          </View>
        );
      case 'create':
        return (
          <User.Create
          success={(newUser) => setUsers([...users, newUser])}
            onClose={() => setCurrentView('list')}
            onLoader={() => setCurrentView('loading')}
          />
        );
      case 'edit':
        return (
          <User.Edit
            user={user}
            success={updateUserList}
            onClose={() => setCurrentView('list')}
            onLoader={() => setCurrentView('loading')}
          />
        );
      case 'error':
        return (
          <View>
            <Text>Error fetching users.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default App;

const customStyles = StyleSheet.create({
  addUserBtn: {
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#FC4B6C',
    marginBottom: 6,
    textAlign: 'center',
  },
  addUserTxt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sortBtn: {
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#fca64b',
    marginBottom: 6,
    textAlign: 'center',
  },
  sortBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
