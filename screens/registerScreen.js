import React from 'react'
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import firebase, {usersCollection} from "./../database/firebaseDB";

export default class RegisterScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            firstName: "",
            ageRange: "",
            email: "",
            password: "",
            errorMessage: null,
            isLoading: false
        };
    }

    handleRegister = () => {
        const {email, password} = this.state

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                usersCollection.doc(userCredentials.user.uid).set(
                    {
                        name: this.state.name,
                        email: this.state.email,
                        firstName: this.state.firstName,
                        ageRange: this.state.ageRange
                    }
                ).then(() => console.log("ok"));
            }).catch((err) => {
            console.error("Error found: ", err);
            this.setState({
                isLoading: false,
            });
        })
            .catch(error => this.setState({errorMessage: error.message}))
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.greeting}>
                    {`Bienvenue à toi ! Inscris-toi pour pouvoir commencer.`}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View style={{marginTop: 30}}>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={firstName => this.setState({firstName})}
                                   value={this.state.firstName}
                                   placeholder={"Prénom"}
                        />
                    </View>
                    <View style={{marginTop: 30}}>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={name => this.setState({name})}
                                   value={this.state.name}
                                   placeholder={"Nom de famille"}
                        />
                    </View>
                    <View style={{marginTop: 30}}>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={ageRange => this.setState({ageRange})}
                                   value={this.state.ageRange}
                                   placeholder={"Tranche d'âge"}
                        />
                    </View>
                    <View style={{marginTop: 30}}>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={email => this.setState({email})}
                                   value={this.state.email}
                                   placeholder={"E-mail"}
                        />
                    </View>

                    <View style={{marginTop: 30}}>
                        <TextInput style={styles.input} secureTextEntry
                                   autocapitalize="none"
                                   onChangeText={password => this.setState({password})}
                                   value={this.state.password}
                                   placeholder={"Mot de passe"}/>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}
                                  onPress={this.handleRegister}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Commencer l'aventure !</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: -60,
        marginBottom: 48,
        marginHorizontal: 30
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
        width: 300,
        alignItems: "center",
        justifyContent: "center"
    }
})
