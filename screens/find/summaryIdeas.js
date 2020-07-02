import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {ideasCollection, signedIn} from "../../database/firebaseDB";
import {FlatGrid} from 'react-native-super-grid';

export default class SummaryIdeas extends React.Component {

    tmpIdeasArray = [];
    state = {
        arrayIdeas: []
    }

    componentDidMount() {
        if (signedIn) {
            ideasCollection.get()
                .then(res => {
                    res.forEach(document => {
                        this.tmpIdeasArray.push(document.data());
                    });
                    this.setState({arrayIdeas: this.tmpIdeasArray});
                });
        } else {
            console.log('PROBLEME USER');
        }
    }

    render() {
        return (
            <View>

                <Text> BILAN DES IDEES </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}><Text> Retour à
                    l'accueil </Text></TouchableOpacity>
                <FlatGrid
                    itemDimension={150}
                    data={this.state.arrayIdeas}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    )}
                />


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
    buttonContainer: {},
    col: {
        width: 15
    },
    item: {
        backgroundColor: "grey",
        color: "white",
        height: 100
    }
})
