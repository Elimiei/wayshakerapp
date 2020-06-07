import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import firebase, {usersCollection} from "./../database/firebaseDB";


export default class ProjectsScreen extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Ecran de MES PROJETS</Text>

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