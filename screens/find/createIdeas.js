import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput} from 'react-native'
import firebase, {questionsCollection, usersCollection} from "../../database/firebaseDB";
import index from "@react-native-community/masked-view";
import {Stopwatch, Timer} from 'react-native-stopwatch-timer'


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


    state = {
        question: "Fais défiler les flèches pour obtenir une question !",
        text: "",
        arrayIdeas: [],
        totalDuration: 6000,
        chronoAlreadyDone : false
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

                {(!this.state.chronoAlreadyDone) &&
                <Timer
                    totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                    reset={this.state.timerReset}
                    handleFinish={this.handleTimerComplete}/>
                }
                {this.state.chronoAlreadyDone &&
                <Text>TIME OUT</Text>
                }
                {this.state.chronoAlreadyDone &&
                <TouchableOpacity onPress={() => this.props.navigation.navigate("TriIdeas", {arrayIdeas : this.state.arrayIdeas})}>
                    <Text> Passer à la suite ! </Text>
                </TouchableOpacity>
                }
            </View>
        )
    }

    handleTimerComplete = () => {
        if(!this.state.chronoAlreadyDone){
            console.log("fini", this.state.arrayIdeas);
            this.resetTimer();
            this.setState(
                {chronoAlreadyDone : true}
            )
        }
    }

    handleIdeas(idea) {
        if (idea !== "") {
            this.state.arrayIdeas.push(idea);
            this.setState({
                text: ""
            })
            if (this.chronoActive === false && !this.state.chronoAlreadyDone) {
                console.log("hééé");
                this.setChrono();
            }
        }
    }

    setChrono() {
        if (this.chronoAlreadyDone === true) {
            console.log("error chrono already done");
        } else {
            this.startTimer();
            this.chronoActive = true;
        }
    }

    startTimer() {
        this.setState({timerStart: true, timerReset: false});
    }

    resetTimer() {
        this.setState({timerStart: false, timerReset: true});
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