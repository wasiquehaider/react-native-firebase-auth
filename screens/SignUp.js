import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import firebase from "react-native-firebase";

export default class SignUp extends Component {
  state = { username: "", age: "", email: "", password: "", errorMessage: null };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        let account = {}
        account.email = this.state.email.toLowerCase()
        account.uid = res.user.uid
        account.username = this.state.username
        account.age = this.state.age
        

        firebase.database().ref('users/' + res.user.uid).set({
          account
        }).then(() => console.log(account.uid))
        console.log(res)
        this.props.navigation.navigate("Main")
      }
    )
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
         <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
         <TextInput
          placeholder="Age"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={age => this.setState({ age })}
          value={this.state.age}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button transparent title="Sign Up" onPress={this.handleSignUp} />
        <Button transparent
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
