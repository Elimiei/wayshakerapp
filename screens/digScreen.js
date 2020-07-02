import React, {useState} from 'react';
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {ideasCollection, signedIn} from "../database/firebaseDB";
import {Icon} from "react-native-elements";
import {FlatGrid} from 'react-native-super-grid';



export default class DigScreen extends React.Component {

    tmpIdeasArray = [];
    tmpIds = [];
    state = {
        arrayIdeas: [],
        modalVisible: false
    }

    componentDidMount() {
        if (signedIn) {
            ideasCollection.get()
                .then(res => {
                    res.forEach(document => {
                        this.tmpIdeasArray.push({
                            data: document.data(),
                            id: document.id
                        });
                    });
                    this.setState({arrayIdeas: this.tmpIdeasArray});
                });
        } else {
            console.log('PROBLEME USER');
        }

        this.setState({modalVisible: false})
    }


    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}><Text> Retour à
                    l'accueil </Text></TouchableOpacity>
                <FlatGrid
                    itemDimension={150}
                    data={this.state.arrayIdeas}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Icon name={"pencil"} type='font-awesome' onPress={() => this.modifyIdea(item)}/>
                        </View>
                    )}
                />

                <Button title="Show modal" onPress={this.toggleModal.bind(this)}/>

                <Modal isVisible={false}>
                    <View>
                        <Text>Hello!</Text>

                        <Button title="Hide modal" onPress={this.toggleModal.bind(this)}/>
                    </View>
                </Modal>

            </View>


        )

    }

    toggleModal() {
        console.log(this.state.modalVisible);
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }


    modifyIdea(item) {
        if (signedIn) {
            console.log(item);
            ideasCollection.doc(item.id).get()
                .then(res => {
                    console.log("data", res.data());
                });
        } else {
            console.log('PROBLEME USER');
        }

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
    },
    centeredView: undefined,
    modalView: undefined,
    modalText: undefined
})
