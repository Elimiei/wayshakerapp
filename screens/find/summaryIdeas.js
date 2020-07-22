import React from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {ideasCollection, signedIn} from "../../database/firebaseDB";
import {Icon} from "react-native-elements";
import {FlatGrid} from 'react-native-super-grid';


export default class SummaryIdeas extends React.Component {

    tmpIdeasArray = [];
    tmpIds = [];
    state = {
        arrayIdeas: [],
        modalConsultVisible: false,
        modalEditVisible: false
    }

    componentDidMount() {
        this.refresh();
        this.setState({modalConsultVisible: false})
    }


    forceUpdateHandler(){
        console.log('ok')
        this.forceUpdate();
    };

    refresh() {
        this.tmpIdeasArray = [];
        if (signedIn) {
            ideasCollection.get()
                .then(res => {
                    res.forEach(document => {
                        console.log(document.data())
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

    }


    render() {
        return (
            <View style={styles.container}>
                <Modal visible={this.state.modalConsultVisible}>
                    <View>
                        <Text>Hello!</Text>

                        <Text>Nom : {this.state.name}</Text>
                        <Text>Description : {this.state.description}</Text>

                        <TouchableOpacity
                            onPress={() => this.setState({modalConsultVisible: false})}><Text>Fermer</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({
                            modalConsultVisible: false,
                            modalEditVisible: true
                        })}><Text>Modifier</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteIdea()}><Text>Supprimer</Text></TouchableOpacity>
                    </View>
                </Modal>

                <Modal visible={this.state.modalEditVisible}>
                    <View>
                        <Text>Hello!</Text>
                        <Text>Nom :</Text>
                        <TextInput
                            multiline={false}
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                            placeholder={this.state.name}
                            value={this.state.name}/>

                        <Text>Description : </Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.setState({
                                description: text
                            })}
                            placeholder={this.state.description}
                            value={this.state.description}/>
                        <TouchableOpacity
                            onPress={() => this.setState({modalEditVisible: false})}><Text>Fermer</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.modifyIdea()}><Text>Valider</Text></TouchableOpacity>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}><Text> Retour à
                    l'accueil </Text></TouchableOpacity>

                <FlatGrid
                    itemDimension={150}
                    data={this.state.arrayIdeas}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text>{item.data.name}</Text>
                            <Text>{item.data.description}</Text>

                            <View style={styles.itemBottom}>
                                <View style={styles.crayon}>
                                    <Icon name={"pencil"} style={styles.icon} type='font-awesome' size={20}
                                          onPress={() => this.toggleModalConsult(item)}/>
                                </View>
                                <View style={styles.poubelle}>
                                    <Icon name={"trash"} style={styles.icon} type='font-awesome' size={20}
                                          onPress={() => this.deleteIdea(item)}/>
                                </View>
                            </View>
                        </View>
                    )}
                />


            </View>


        )

    }

    toggleModalConsult(item) {
        this.setState({
            modalConsultVisible: !this.state.modalConsultVisible
        })
        if (signedIn) {
            console.log("item", item);
            this.setState({
                id: item.id
            })
            ideasCollection.doc(item.id).get()
                .then(res => {
                    let data = res.data();
                    this.setState({
                        description: data.description,
                        name: data.name,
                        rating: data.rating
                    })
                });
        } else {
            console.log('PROBLEME USER');
        }
    }


    modifyIdea() {
        this.setState({
            modalConsultVisible: false,
            modalEditVisible: true
        })
        ideasCollection.doc(this.state.id).update(
            {
                name: this.state.name,
                description: this.state.description,
                rating: this.state.rating
            }
        ).then(() => {
            console.log('Idea updated!');
            this.setState({
                modalEditVisible: false,
                name: "",
                description: "",
                rating: "",
                id: ""
            })
        });


    }

    deleteIdea(item) {

        if (signedIn) {
            console.log("item", item);
            this.setState({
                id: item.id
            })
            ideasCollection.doc(this.state.id).delete()
                .then(() => {
                    console.log('Idea deleted!');
                    this.setState({
                        modalConsultVisible: false,

                    })
                    this.refresh();
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
        backgroundColor: "white"
    },
    buttonContainer: {},
    col: {
        width: 15
    },
    item: {
        backgroundColor: "white",
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 20,
        color: "white",
        height: 100,
        padding: 10
    },
    icon: {
        width: 10,
        height: 10
    },
    centeredView: undefined,
    modalView: undefined,
    modalText: undefined,
    crayon: {
        borderColor: "lightgray",
        borderWidth: 1,
        width: 40,
        padding: 2,
        borderRadius: 5,
        margin: 5
    },
    poubelle: {
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 5,
        borderBottomRightRadius: 0,
        padding: 2,
        width: 40,
        margin: 5
    },
    itemBottom: {
        margin: 10,
        flexDirection: "row",
        alignSelf: "center"
    }
})
