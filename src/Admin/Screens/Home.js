import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Home = (props) => {
  const navigation = useNavigation(); // Use the useNavigation hook

  const Signout = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('Logout successful.');
        console.log('User signed out!');
        navigation.navigate("Login");
      });
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ marginHorizontal: 60, marginTop: 120, alignItems: 'center' }}>
        <Text style={{ color: '#1E90FF', fontSize: 40, fontWeight: 'bold' }}>
          Home
        </Text>
        {/* <TouchableOpacity style={styles.Logout} onPress={Signout}>
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            Logout
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Logout: {
    backgroundColor: '#0066FF', borderRadius: 50,
    alignSelf: 'center', alignContent: 'center',
    width: '60%', padding: 8, marginBottom: 20, borderWidth: 2,
    borderColor: '#0066FF'
  }
});

export default Home;
