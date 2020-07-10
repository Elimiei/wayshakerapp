import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import firebase, {usersCollection} from "./../database/firebaseDB";


export default class HomeScreen extends React.Component {
    state = {
        email: "",
        name: "",
        firstName: "",
        ageRange: ""

    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        usersCollection.doc(user.uid).get().then(
            (res) => {
                this.setState({
                    email: res.data().email,
                    name: res.data().name,
                    firstName: res.data().firstName,
                    ageRange: res.data().ageRange
                });
            }
        );
    }


    signOutUser = () => {
        firebase.auth().signOut();
    }

    handleLink(link) {
        switch (link) {
            case "trouver":
                this.props.navigation.navigate("Find")
                break;
            case "creuser" :
                this.props.navigation.navigate("Dig")
                break;
            case "valider" :
                this.props.navigation.navigate("Validate")
                break;
            case "voir" :
                this.props.navigation.navigate("Projects")
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.content}> Content de te revoir <Text style={styles.pseudo}> {this.state.firstName} </Text>  !</Text>
                <Text style={styles.text}> Quelle étape souhaites-tu faire aujourd'hui ?</Text>

                <TouchableOpacity style={styles.links}  onPress={() => this.handleLink("trouver")}>
                    <Text> Trouver une idée </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.links} onPress={() => this.handleLink("creuser")}>
                    <Text> Creuser une idée </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.links} onPress={() => this.handleLink("valider")}>
                    <Text> Valider une idée </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.links} onPress={() => this.handleLink("voir")}>
                    <Text> Voir mes projets </Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text> Logout </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    buttonContainer: {},
    content: {
        fontFamily: "Chivo-Black",
        color: "#ED7047",
        fontSize: 20,
        margin:10,
    },
    text: {
        marginBottom: 30
    },
    pseudo: {
        color: "#0570B8"
    },
    links: {
        marginTop: 32,
        borderWidth:1,
        borderColor: "lightgray",
        width: 250,
        height: 50,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    logout: {
        alignSelf: "flex-end",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "lightgray",
        marginRight: 10,
        marginTop: 100,
        backgroundColor: "#ED7047",
        color: "white",
        fontFamily: "Chivo-Regular"
    }
})
