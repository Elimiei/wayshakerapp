import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button, Image} from 'react-native'
import firebase, {usersCollection} from "../../database/firebaseDB";
import AutoHeightImage from "react-native-auto-height-image";


export default class FindScreen extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>1. Exercice du brainstorming</Text>

                <AutoHeightImage
                    style={styles.logo}
                    width={300}
                    source={require('./../../images/200.gif')}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("CreateIdeas")}>
                    <Text style={styles.textgo}>GO !</Text>
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
    buttonContainer: {
        marginTop: 150,
        backgroundColor: "#ED7047",
        width: 250,
        height: 50,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: "Chivo-Black",
        color: "#ED7047",
        fontSize: 20,
        marginBottom: 70,
        marginTop: 10
    },
    textgo: {
        color: "white",
        fontFamily: "Chivo-Regular",
        fontSize: 20
    }
})
