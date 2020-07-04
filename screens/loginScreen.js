import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import firebase from "./../database/firebaseDB";
import AutoHeightImage from "react-native-auto-height-image";

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }


    render() {
        return (
            <View style={styles.container}>
                <AutoHeightImage
                    style={styles.logo}
                    width={300}
                    source={require('./../images/Logo-final.png')}
                />

                <Text>CONNEXION</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={email => this.setState({email})}
                                   value={this.state.email}
                                   placeholder={"Email"}
                        />
                    </View>

                    <View style={{marginTop: 32}}>
                        <TextInput style={styles.input} secureTextEntry
                                   autocapitalize="none"
                                   onChangeText={password => this.setState({password})}
                                   value={this.state.password}
                                   placeholder={"Mot de passe"}/>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}
                                  onPress={this.handleLogin}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign in !</Text>
                </TouchableOpacity>

                <View style={styles.bottom}>
                    <Text>Pas encore de compte ?</Text>
                    <TouchableOpacity style={{alignSelf: "center", marginTop: 32}}
                                      onPress={() => this.props.navigation.navigate("Register")}>
                        <Text> Inscris toi !</Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
    },
    error: {
        color: "red",
        fontSize: 13
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        width: 300
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 20,
        backgroundColor: "#FFFFFF"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#ED7047",
        borderRadius: 20,
        borderBottomRightRadius: 0,
        height: 52,
        width: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {},
    bottom: {
        marginTop: 20
    }
})
