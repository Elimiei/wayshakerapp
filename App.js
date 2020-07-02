import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import LoadingScreen from "./screens/loadingScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";
import FindScreen from "./screens/find/findScreen";
import DigScreen from "./screens/digScreen";
import ValidateScreen from "./screens/validateScreen";
import ProjectsScreen from "./screens/projectsScreen";
import Header from "@react-navigation/stack/src/views/Header/Header";
import React from "react";
import CreateIdeas from "./screens/find/createIdeas";
import TriIdees from "./screens/find/triIdees";
import SummaryIdeas from "./screens/find/summaryIdeas";


const AppStack = createStackNavigator({
    Home : HomeScreen,
    Find : FindScreen,
    Dig : DigScreen,
    Validate : ValidateScreen,
    Projects : ProjectsScreen,
    CreateIdeas : CreateIdeas,
    TriIdeas : TriIdees,
    SummaryIdeas : SummaryIdeas
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
