import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigator } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
//import MapView from 'react-native-maps';

import MapScreen from './Components/MapScreen.js'
//import {Header, Left, Button, Icon,Body,Title,Right,Fab} from 'native-base';
// import logo from './assets/logo.png';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const Stack = createStackNavigator();

/*PAGES OF APP */
function WelcomeScreen({navigation, props}){
  return(
    <View style={styles.container}>
      <Text style = {styles.heading}>COVID-19 Stalker</Text>
      {/*<Image source={logo} style={{ width: 256, height: 256 }}/>*/}
      <Text style={{color: "#A00", fontSize: 20, padding: 5}}>To get started, please catch COVID-19!</Text>
      

      <TouchableOpacity
        onPress={() => {navigation.navigate("Maps")}}
        style={styles.button}>
        <Text style={styles.buttonText}>srave the outside world</Text>
       </TouchableOpacity>
    </View>
  )
}

const MyApp = DrawerNavigator({

  Home: {
    screen: HomeScreen
  },
  Map: {
    screen: MapScreen
  }
})

export default class App extends Component {

  state = {
    location: null,
    errorMessage: null,
  };

  componentDidMount() {
    this._getLocation();
  }
  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted') {
      console.log('Permission Denied!');

      this.setState({
        errorMessage: 'Permission Denied!'
      })
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({
      location
    })
  }

  

  render() {
    // 

    //Gets location from user
    let text = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      console.log(text);
    }
    
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
