import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {ideasCollection} from "../../database/firebaseDB";
import * as firebase from "firebase";
import {Icon} from "react-native-elements";
import GestureRecognizer from "react-native-swipe-gestures";
import StarRating from "react-native-star-rating";


export default class TriIdees extends React.Component {

    constructor(props) {
        super(props);
    }

    arrayIdeas = this.props.navigation.state.params.arrayIdeas;
    indexIdeas = 0;

    length;
    state = {
        titleIdea: "",
        gestureName: 'none',
        backgroundColor: '#fff',
        text: "",
        user: "",
        starCount: 0
    };


    componentDidMount = () => {
        this.setState(
            {
                ideas: this.arrayIdeas,
                titleIdea: this.arrayIdeas[this.indexIdeas]
            }
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Décris, note, et fais le <Text style={styles.bleu}>tri</Text> dans tes idées.</Text>

                <View style={styles.content}>
                    <Text>Tu connais Tinder ?
                        Ici même principe, <Text style={styles.bold}> swipe tes idées par affinité. </Text>
                    </Text>

                    <Text>
                        Pour t'aider à te décider, <Text style={styles.bold}> détaille-les en leur
                        ajoutant une description et note-les sur trois </Text> en
                        fonction de l'envie et l'enthousiasme qu'elles te
                        procurent.
                    </Text>
                </View>


                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                >

                    <View style={styles.view}>
                        <Text>{this.state.titleIdea}</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.setState({text})}
                            placeholder={"Décrire une idée de projet ..."}
                            value={this.state.text}/>

                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={3}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            fullStarColor={'#ED7047'}
                        />
                    </View>


                </GestureRecognizer>



                <View style={styles.left}>
                    <Icon name={"times-circle"} type='font-awesome' size={50} color={"red"}
                          onPress={(state) => this.onSwipeLeft(state)}/>
                </View>
                <View style={styles.right}>
                    <Icon name={"check-circle"} type='font-awesome' size={50} color={"green"}
                          onPress={(state) => this.onSwipeRight(state)}/>
                </View>

            </View>

        )
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    onSwipeLeft(gestureState) {
        if (this.indexIdeas === 0) {
            this.length = this.arrayIdeas.length;
        }
        if (this.indexIdeas < this.length - 1) {
            this.indexIdeas += 1;
            console.log("2", this.indexIdeas, this.length, this.arrayIdeas[this.indexIdeas]);
            this.setState(
                {
                    titleIdea: this.arrayIdeas[this.indexIdeas]
                }
            )
        } else {
            this.props.navigation.navigate("SummaryIdeas");
        }
    }

    onSwipeRight = (gestureState) => {
        if (this.state.text) {
            if (this.indexIdeas === 0) {
                this.length = this.arrayIdeas.length;
            }
            if (this.indexIdeas < this.length - 1) {
                let idea = this.arrayIdeas[this.indexIdeas];
                if (firebase.auth().currentUser.uid) {
                    ideasCollection.add(
                        {
                            name: idea,
                            description: this.state.text,
                            rating: this.state.starCount
                        }
                    ).then(() => {
                        this.setState(
                            {
                                text: ""
                            }
                        )
                        console.log('Idea added !');
                    });

                    this.indexIdeas += 1;
                    this.setState(
                        {
                            titleIdea: this.arrayIdeas[this.indexIdeas]
                        }
                    )
                } else {
                    alert("Il faut être connecté !");
                }

            } else {
                this.props.navigation.navigate("SummaryIdeas");
            }
        } else {
            alert("Il faut compléter la description");
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    buttonContainer: {},
    wrapper: {
        width: 260,
        height: 200,
        backgroundColor: "white",


    },
    title: {
        fontFamily: "Chivo-Black",
        color: "#ED7047",
        fontSize: 20,
        margin: 20,
    },
    bleu: {
        color: "#0570B8"
    },
    bold: {
        fontWeight: "bold"
    },
    content: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    view: {
        borderColor: "lightgray",
        borderWidth: 1,
        padding: 20,
        marginBottom: 50
    },
    left: {
        alignSelf: "flex-start",
        marginLeft: 20
    },
    right: {
        alignSelf: "flex-end",
        marginTop: -55,
        marginRight: 20
    }
})
