import React, { Component } from "react";
import { StyleSheet, Platform, Image, Text, View, Button } from "react-native";
import firebase from "react-native-firebase";

export default class Main extends Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <Button
      primary
      title="Logout"
      onPress={() => {
        firebase
          .auth()
          .signOut()
          .then(
            () => {
              navigation.navigate("Login");
            },
            function(error) {
              // An error happened.
            }
          );
      }}
        
      >
        Log out
      </Button>
    )
})

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button
          primary
          title="Logout"
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(
                () => {
                  this.props.navigation.navigate("Login");
                },
                function(error) {
                  // An error happened.
                }
              );
          }}
        >
          Log out
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
