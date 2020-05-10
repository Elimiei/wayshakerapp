import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import LoadingScreen from "./screens/loadingScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";

import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB29O4kR5jGtJLgVEhU2fVx_1CXaA5gLhg",
    authDomain: "wayshakerbdd.firebaseapp.com",
    databaseURL: "https://wayshakerbdd.firebaseio.com",
    projectId: "wayshakerbdd",
    storageBucket: "wayshakerbdd.appspot.com",
    messagingSenderId: "1033199004292",
    appId: "1:1033199004292:web:3e1e664ee82e7e83b870d1",
    measurementId: "G-11SVBPKBY3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
    Home : HomeScreen
})

const AuthStack = createStackNavigator({
    Login : LoginScreen,
    Register : RegisterScreen
})

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading : LoadingScreen,
            App : AppStack,
            Auth : AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
)