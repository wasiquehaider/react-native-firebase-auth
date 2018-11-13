import React, { Component } from "react";
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

// import the different screens
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'


// create our app's navigation stack
const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App
