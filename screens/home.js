import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Button } from "react-native";
import styles from "../styles/_base";
import List from "./list";
import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation';

export default class Home extends React.Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} />
        <Text style={styles.textStyle}>Welcome to User CRUD</Text>
        <Text style={styles.textSmall}>Testing React Native</Text>
        <Button
          title="Start"
          loading
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          titleStyle={{ fontWeight: "200", color: "#d1d8de" }}
          buttonStyle={{
            width: 300,
            height: 45,
            borderColor: "#d1d8de",
            borderWidth: 1,
            borderRadius: 15,
            padding: 10
          }}
          onPress={this.navigateToScreen("List")}
        />
      </View>
    );
  }
}
