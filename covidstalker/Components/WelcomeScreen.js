import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { Icon, Button, Container, Header, Content, Left } from 'native-base'
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Container style={{ flex: 0.1 }}>
        <Header style={{ top: 0 }}>
          <Left>
            <Icon style={{ color: "#ffffff" }} name="menu" onPress={() => navigation.openDrawer()} />
          </Left>
        </Header>
      </Container>

      <Container style={styles.outerContainer}>
        <Text style={styles.heading}>COVID-19 Stalker</Text>

        <Text style={{ color: "#A00", fontSize: 20, padding: 5 }}>To get started, please catch COVID-19!</Text>

        <TouchableOpacity
          onPress={() => { navigation.navigate('MapScreen') }}
          style={styles.button}>
          <Text style={styles.buttonText}>BRAVE THE OUTSIDE WORLD</Text>
        </TouchableOpacity>
      </Container>

    </View>
  )
}
export default WelcomeScreen;
