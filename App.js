import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import LoadingScreen from "./screens/loadingScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";
import FindScreen from "./screens/findScreen";
import DigScreen from "./screens/digScreen";
import ValidateScreen from "./screens/validateScreen";
import ProjectsScreen from "./screens/projectsScreen";
import Header from "@react-navigation/stack/src/views/Header/Header";
import React from "react";


const AppStack = createStackNavigator({
    Home : HomeScreen,
    Find : FindScreen,
    Dig : DigScreen,
    Validate : ValidateScreen,
    Projects : ProjectsScreen,
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