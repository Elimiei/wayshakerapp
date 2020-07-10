import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {questionsCollection} from "../../database/firebaseDB";
import index from "@react-native-community/masked-view";
import {Timer} from 'react-native-stopwatch-timer'
import {Icon} from 'react-native-elements'


export default class CreateIdeas extends React.Component {

    indexQuestion = 0;
    arrayQuestions = [];
    placeholder = "Comment ça marche ? \n \n" +
        "1- J'écris UNE idée\n" +
        "2- Je clique sur \"envoyer\"\n" +
        "3- J'écris UNE idée\n" +
        "4- Je clique sur envoyer\n" +
        "5- J'écris UNE idée\n" +
        "Ainsi de suite...";
    chronoActive = false;

    options = {
        container: {
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 5,
            width: 220,
            marginTop: 50
        },
        text: {
            fontSize: 30,
            color: '#000',
            marginLeft: 7,
        }
    }


    state = {
        question: "A court d'idée ? Utilise les flèches !",
        text: "",
        arrayIdeas: [],
        totalDuration: 6000,
        chronoAlreadyDone: false
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
                <Text style={styles.title}>Qu'est ce que j'ai envie de <Text style={styles.faire}>faire</Text> dans ma
                    vie ?</Text>

                <View style={styles.questions}>
                    <TouchableOpacity onPress={() => this.handleIndex("-")}>
                        <Icon color={"#0570B8"} size={50} name={"chevron-left"}/>
                    </TouchableOpacity>
                    <Text style={styles.text}> {this.state.question} </Text>
                    <TouchableOpacity onPress={() => this.handleIndex("+")}>
                        <Icon color={"#0570B8"} size={50} name={"chevron-right"}/>
                    </TouchableOpacity>
                </View>


                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={this.placeholder}
                    value={this.state.text}
                    style={styles.input}/>

                <TouchableOpacity style={styles.button} onPress={() => this.handleIdeas(this.state.text)}>
                    <Text style={styles.envoyer}> Envoyer ! </Text>
                </TouchableOpacity>

                {(!this.state.chronoAlreadyDone) &&
                <Timer
                    totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
                    reset={this.state.timerReset}
                    handleFinish={this.handleTimerComplete}
                    options={this.options}/>
                }
                {this.state.chronoAlreadyDone &&
                <Text style={styles.timeout}>TIME OUT</Text>
                }
                {this.state.chronoAlreadyDone &&
                <Text style={styles.textBottom}>Il te reste des idées ?
                    Prends le temps de les envoyer.

                    Une fois que tu es prêt.e, tu peux passer à la suite !</Text>}
                {this.state.chronoAlreadyDone &&
                <TouchableOpacity style={styles.buttonSuite}
                                  onPress={() => this.props.navigation.navigate("TriIdeas", {arrayIdeas: this.state.arrayIdeas})}>
                    <Text style={styles.envoyer}> Passer à la suite ! </Text>
                </TouchableOpacity>
                }
            </View>
        )
    }

    handleTimerComplete = () => {
        if (!this.state.chronoAlreadyDone) {
            console.log("fini", this.state.arrayIdeas);
            this.resetTimer();
            this.setState(
                {chronoAlreadyDone: true}
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
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    buttonContainer: {},
    title: {
        fontFamily: "Chivo-Black",
        color: "#ED7047",
        fontSize: 20,
        margin: 20,
    },
    faire: {
        color: "#0570B8"
    },
    questions: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        width: 170,
        textAlign: "center",
        flex: 2
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "lightgray",
        width: 250,
        marginTop: 20
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#0570B8",
        borderRadius: 20,
        borderBottomRightRadius: 0,
        height: 52,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25
    },
    buttonSuite: {
        marginHorizontal: 30,
        backgroundColor: "#ED7047",
        borderRadius: 20,
        borderBottomRightRadius: 0,
        height: 52,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    envoyer: {
        color: "white",
        fontFamily: "Chivo-Regular",
        fontSize: 15
    },
    timeout: {
        fontFamily: "Chivo-Black",
        fontSize: 20,
        marginTop: 30
    },
    textBottom: {
        width: 200
    }
})
