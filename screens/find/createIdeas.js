import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput} from 'react-native'
import firebase, {questionsCollection, usersCollection} from "../../database/firebaseDB";
import index from "@react-native-community/masked-view";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'


export default class CreateIdeas extends React.Component {

    indexQuestion = 0;
    arrayQuestions = [];
    placeholder = "Comment ça marche ? \n" +
        "1- J'écris UNE idée\n" +
        "2- Je clique sur \"envoyer\"\n" +
        "3- J'écris UNE idée\n" +
        "4- Je clique sur envoyer\n" +
        "5- J'écris UNE idée\n" +
        "Ainsi de suite...";
    chronoActive = false;
    chronoAlreadyDone = false;


    state = {
        question: "Fais défiler les flèches pour obtenir une question !",
        text: "",
        arrayIdeas: []
    }



    componentDidMount() {

        questionsCollection.get()
            .then(res => {
                res.forEach(document => {
                    this.arrayQuestions.push(document.data());
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Qu'aimerais-tu faire de ta vie ?</Text>

                <Text> A court d'idée ? Utilise les flèches ! </Text>
                <TouchableOpacity onPress={() => this.handleIndex("-")}>
                    <Text> gauche </Text>
                </TouchableOpacity>
                <Text> {this.state.question} </Text>
                <TouchableOpacity onPress={() => this.handleIndex("+")}>
                    <Text> droite </Text>
                </TouchableOpacity>

                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={this.placeholder}
                    value={this.state.text}/>

                <TouchableOpacity onPress={() => this.handleIdeas(this.state.text)}>
                    <Text> Envoyer ! </Text>
                </TouchableOpacity>

                <Stopwatch laps msecs start={this.state.stopwatchStart}
                           reset={this.state.stopwatchReset}
                           options={options}
                           getTime={this.getFormattedTime} />


            </View>
        )
    }

    handleIdeas(idea) {
        if (idea !== ""){
            this.state.arrayIdeas.push(idea);
            this.setState({
                text: ""
            })
        }
        if (this.chronoActive === false){
            this.setChrono();
        }
    }

    setChrono(){
        if(this.chronoAlreadyDone === true){
            console.log("error chrono already done");
        } else {
            // TODO chrono
        }
    }

    toggleTimer() {
        this.setState({timerStart: !this.state.timerStart, timerReset: false});
    }

    resetTimer() {
        this.setState({timerStart: false, timerReset: true});
    }

    toggleStopwatch() {
        this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }

    resetStopwatch() {
        this.setState({stopwatchStart: false, stopwatchReset: true});
    }

    handleIndex(sign) {
        switch (sign) {
            case "-" :
                if (this.indexQuestion > 0) {
                    this.indexQuestion -= 1;
                } else {
                    this.indexQuestion = this.arrayQuestions.length - 1;
                }
                break;
            case "+" :
                if (this.indexQuestion < this.arrayQuestions.length - 1) {
                    this.indexQuestion += 1;
                } else {
                    this.indexQuestion = 0;
                }
                break;
        }

        questionsCollection
            // Filter results
            .where('index', '==', this.indexQuestion)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(document => this.setState({question: document.data().content}));
            });
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