import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

// import logo from './assets/logo.png';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const Stack = createStackNavigator();

/*PAGES OF APP */
function WelcomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text style = {styles.heading}>COVID-19 Stalker</Text>
      {/* <Image source={logo} style={{ width: 256, height: 256 }}/> */}
      <Text style={{color: "#A00", fontSize: 20, padding: 5}}>To get started, please catch COVID-19!</Text>

      <TouchableOpacity
        onPress={() => {navigation.navigate("Maps")}}
        style={styles.button}>
        <Text style={styles.buttonText}>*cough*</Text>
       </TouchableOpacity>
    </View>
  )
}
function MapScreen({navigation}){
  return(
    <View>
      <Text>Insert map lol!</Text>
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    this._getLocation();
  }
  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.location);
    
    if (status !== 'granted') {
      console.log('Permission Denied!');

      this.setState({
        errorMessage: 'Permission Denied!'
      });
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({
      location
    })
  }



  render() {
    // 

    //Gets location from user

    state = {
      location: {},
      errorMessage: ' ',
    };

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
           <Stack.Screen name = "Maps" component = {MapScreen}/>
           <Stack.Screen name = "WelcomeScreen" component = {WelcomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,  
  }
  ,
  buttonText: {
    fontSize: 20,
    color: "#fff",  
  }
  ,
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  heading: {
    textAlign: 'center',
    margin: 5,
    fontSize: 40,
    fontWeight: 'bold'
  }
});
