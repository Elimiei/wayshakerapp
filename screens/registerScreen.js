import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
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
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    {`Hello new user ! Sign up to get started`}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Name</Text>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={name => this.setState({name})}
                                   value={this.state.name}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>firstName</Text>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={firstName => this.setState({firstName})}
                                   value={this.state.firstName}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Age range</Text>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={ageRange => this.setState({ageRange})}
                                   value={this.state.ageRange}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Email address</Text>
                        <TextInput style={styles.input}
                                   autocapitalize="none"
                                   onChangeText={email => this.setState({email})}
                                   value={this.state.email}
                        />
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry
                                   autocapitalize="none"
                                   onChangeText={password => this.setState({password})}
                                   value={this.state.password}/>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}
                                  onPress={this.handleRegister}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign up !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}}>
                    <Text> New ? <Text>Register !</Text></Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})