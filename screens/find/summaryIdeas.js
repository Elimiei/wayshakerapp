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

        this.setState({modalConsultVisible: false})
    }


    render() {
        return (
            <View>
                <Modal visible={this.state.modalConsultVisible}>
                    <View>
                        <Text>Hello!</Text>

                        <Text>Nom : {this.state.name}</Text>
                        <Text>Description : {this.state.description}</Text>

                        <TouchableOpacity onPress={() => this.setState({modalConsultVisible : false})}><Text>Fermer</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({modalConsultVisible:false, modalEditVisible: true})}><Text>Modifier</Text></TouchableOpacity>
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
                        <TouchableOpacity onPress={() => this.setState({modalEditVisible : false})}><Text>Fermer</Text></TouchableOpacity>
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
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Icon name={"pencil"} style={styles.icon} type='font-awesome' onPress={() => this.toggleModalConsult(item)}/>
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

    deleteIdea(){
        ideasCollection.doc(this.state.id).delete()
            .then(() => {
            console.log('Idea deleted!');
            this.setState({
                modalConsultVisible : false
            })
        });
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
    icon: {
        width:10,
        height:10
    },
    centeredView: undefined,
    modalView: undefined,
    modalText: undefined
})
