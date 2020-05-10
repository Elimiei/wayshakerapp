import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.welcome}>
                    Login !</Text>
                <TextInput
                    onChangeText={(username) => this.setState({username})}
                    value={(this.state.username)}
                    style={styles.input} placeholder={"Username"}/>
                <TextInput
                    onChangeText={(password) => this.setState({password})}
                    value={(this.state.password)}
                    style={styles.input} placeholder={"Password"}
                    secureTextEntry={true}/>
                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={this._signin}
                >
                    <Text>ENTER</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _signin = async () => {

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: 'blue'

    },
    btnEnter: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
