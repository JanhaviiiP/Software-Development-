import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Focus states
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !mobile) {
      Alert.alert("All fields are required!");
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('User account created & signed in:', userCredential.user.uid);

      await firestore().collection('Users').add({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        role: 'user',
        uid:userCredential.user.uid
      });

      Alert.alert('Account creatted successfully');

      navigation.navigate("Login");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert('Error creating user:', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Hi !</Text>
      <Text style={styles.subtitle}>Create a new account</Text>

      <View style={[styles.inputContainer, firstNameFocused ? styles.focusedInputContainer : null]}>
        <Fontisto name={"person"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => setFirstNameFocused(true)}
          onBlur={() => setFirstNameFocused(false)}
        />
      </View>

      <View style={[styles.inputContainer, lastNameFocused ? styles.focusedInputContainer : null]}>
        <Fontisto name={"person"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setLastNameFocused(true)}
          onBlur={() => setLastNameFocused(false)}
        />
      </View>

      <View style={[styles.inputContainer, emailFocused ? styles.focusedInputContainer : null]}>
        <Fontisto name={"email"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          keyboardType='email-address'
          placeholder="E-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />
      </View>

      <View style={[styles.inputContainer, passwordFocused ? styles.focusedInputContainer : null]}>
        <Fontisto name={"locked"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisibility}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialCommunityIcons name={passwordVisibility ? "eye" : "eye-off"} size={24} color={"#9A9A9A"} />
        </TouchableOpacity>
      </View>

      <View style={[styles.inputContainer, confirmPasswordFocused ? styles.focusedInputContainer : null]}>
        <Fontisto name={"locked"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!passwordVisibility}
          onFocus={() => setConfirmPasswordFocused(true)}
          onBlur={() => setConfirmPasswordFocused(false)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialCommunityIcons name={passwordVisibility ? "eye" : "eye-off"} size={24} color={"#9A9A9A"} />
        </TouchableOpacity>
      </View>

      <View style={[styles.inputContainer, mobileFocused ? styles.focusedInputContainer : null]}>
        <Fontisto name={"mobile-alt"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Mobile"
          keyboardType="numeric"
          placeholderTextColor="#888"
          value={mobile}
          onChangeText={setMobile}
          onFocus={() => setMobileFocused(true)}
          onBlur={() => setMobileFocused(false)}
        />
      </View>

      <TouchableOpacity style={styles.SignupButton} onPress={handleCreateAccount}>
        <Text style={styles.SignupButtonText}>Signup</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#4A4A4A',
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '90%',
  },
  focusedInputContainer: {
    borderColor: '#4A90E2',
    borderBottomWidth: 2,
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: 'grey',
  },
  inputIcon: {
    marginRight: 10,
  },
  SignupButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: width * 0.2, // Responsive width adjustment
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 20,
  },
  SignupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
