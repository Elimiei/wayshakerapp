import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {ideasCollection} from "../../database/firebaseDB";
import GestureRecognizer from 'react-native-swipe-gestures';
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
                <Text>TRI IDEES</Text>

                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                    style={{
                        flex: 1,
                        backgroundColor: this.state.backgroundColor
                    }}
                >
                    <Text>{this.state.titleIdea}</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.setState({text})}
                        placeholder={"Décrire une idée de projet ...s"}
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
                        fullStarColor={'red'}
                    />
                </GestureRecognizer>

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
            this.setState(
                {
                    titleIdea: "Plus d'idées !"
                }
            )
        }
    }

    onSwipeRight = (gestureState) => {
        if (this.state.text) {
            if (this.indexIdeas === 0) {
                this.length = this.arrayIdeas.length;
            }
            if (this.indexIdeas < this.length - 1) {

                let idea = this.arrayIdeas[this.indexIdeas];
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
                this.setState(
                    {
                        titleIdea: "Plus d'idées !"
                    }
                )
            }
        } else {
            alert("Il faut compléter la description");
        }
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