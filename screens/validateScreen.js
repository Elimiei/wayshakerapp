import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import firebase, {usersCollection} from "./../database/firebaseDB";


export default class ValidateScreen extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Ecran de VALIDER UNE IDEE</Text>

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