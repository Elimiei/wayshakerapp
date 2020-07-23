import React from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {ideasCollection, signedIn} from "../../database/firebaseDB";
import {Icon} from "react-native-elements";
import {FlatGrid} from 'react-native-super-grid';
import StarRating from "react-native-star-rating";


export default class SummaryIdeas extends React.Component {

    tmpIdeasArray = [];
    tmpIds = [];
    state = {
        arrayIdeas: [],
        modalConsultVisible: false,
        modalEditVisible: false,
        startCount: 3
    }

    componentDidMount() {
        this.refresh();
        this.setState({modalConsultVisible: false})
    }

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
                <Modal visible={this.state.modalConsultVisible} transparent={true}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modal}>

                            <Icon name={"close"} type='font-awesome' size={25} style={styles.close}
                                onPress={() => this.setState({modalConsultVisible: false})}/>

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
                            <View style={styles.save}>
                            <Icon name={"check"} style={styles.icon} color={"white"} type='font-awesome'
                                  size={25}
                                  onPress={() => this.modifyIdea()}/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}><Text> Retour à
                    l'accueil </Text></TouchableOpacity>

                <FlatGrid
                    itemDimension={150}
                    data={this.state.arrayIdeas}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text style={styles.nameModal}>{item.data.name}</Text>
                            <Text style={styles.description}>{item.data.description}</Text>

                            <StarRating
                                disabled={true}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={3}
                                rating={item.data.rating}
                                fullStarColor={'#ED7047'}
                            />

                            <View style={styles.itemBottom}>
                                <View style={styles.crayon}>
                                    <Icon name={"pencil"} style={styles.icon} color={"white"} type='font-awesome'
                                          size={25}
                                          onPress={() => this.toggleModalConsult(item)}/>
                                </View>
                                <View style={styles.poubelle}>
                                    <Icon name={"trash"} style={styles.icon} type='font-awesome' size={25}
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
            this.refresh();
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
        padding: 10
    },
    icon: {
        width: 10,
        height: 10,
    },
    centeredView: undefined,
    modalView: undefined,
    modalText: undefined,
    crayon: {
        width: 40,
        padding: 2,
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#0570B8"
    },
    poubelle: {
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        padding: 2,
        width: 40,
        margin: 5
    },
    itemBottom: {
        margin: 10,
        flexDirection: "row",
        alignSelf: "center"
    },
    modalBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(100,100,100, 0.5)',
        padding: 20,
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20
    },
    nameModal: {
        fontWeight: "bold",
        fontSize: 18
    },
    description: {
        marginVertical: 10
    },
    close: {
        alignSelf: "flex-end"
    },
    save: {
        backgroundColor: "#ED7047",
        borderRadius: 10,
        borderBottomRightRadius: 0,
        padding: 2,
        width: 100,
        margin: 5,
        alignSelf: "center"
    }
})
