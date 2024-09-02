import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headerText}>Let's Start</Text>
                <Text style={[styles.headerText, styles.shoppingText]}>Shopping</Text>
                <Image style={styles.logo} source={require('./assets/cart.png')} />
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.signInPrompt}>
                    Already have an Account ?
                </Text>
                <TouchableOpacity style={styles.signinButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.signinButtonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>By using this app, you agree to</Text>
                    <Text style={styles.termsText}>Pre Food Terms of Use and</Text>
                    <Text style={styles.termsText}>Privacy Policy.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        marginHorizontal: 40,
        marginTop: 100,
        alignItems: 'center',
    },
    headerText: {
        color: '#1E90FF',
        fontSize: 45,
        fontWeight: 'bold',
    },
    shoppingText: {
        color: '#7F00FF',
    },
    logo: {
        marginVertical: 30,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    signupButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 30,
        width: 250,
        paddingVertical: 12,
        borderWidth: 0,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    signInPrompt: {
        color: '#4E60BE',
        fontSize: 18,
        marginVertical: 20,
    },
    signinButton: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: 250,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    signinButtonText: {
        color: '#4A90E2',
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    termsContainer: {
        marginTop: 40,
        alignItems:'center'
    },
    termsText: {
        color: '#000595',
        fontSize: 15,
    }
});

export default Welcome;
