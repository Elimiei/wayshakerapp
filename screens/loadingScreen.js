import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native'
import firebase from "./../database/firebaseDB";

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./../images/Logo-final.png')} />
                <Text> Le programme qui t'apprends à trouver ta voie.</Text>
                <ActivityIndicator size={"large"}></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
