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
                <Text> Content de te revoir {this.state.firstName} {this.state.name} !</Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={() => this.handleLink("trouver")}>
                    <Text> Trouver une idée </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 32}} onPress={() => this.handleLink("creuser")}>
                    <Text> Creuser une idée </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 32}} onPress={() => this.handleLink("valider")}>
                    <Text> Valider une idée </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 32}} onPress={() => this.handleLink("voir")}>
                    <Text> Voir mes projets </Text>
                </TouchableOpacity>


                <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
                    <Text> Logout </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {}
})
