import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from 'react-native-elements';
import { Left, Right, Icon, Container } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapScreen from './Components/MapScreen.js';
import Constants from 'expo-constants';
import style from './stylesheet.js'
//import HomeScreen from './WelcomeScreen.js';
//import WelcomeScreen from './Components/WelcomeScreen';
 import logo from './assets/bestlogo.png';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


/*PAGES OF APP */
function FaqScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header containerStyle = {{backgroundColor: '#ff924e'}}>
        <Left>
          <Icon style={{ color: "#ffffff" }} name="menu" onPress={() => navigation.openDrawer()} />
        </Left>
      </Header>
      <Text>FAQ/Instructions</Text>
      <Text>
        COVID Stalker is going to help you avoid Coronavirus by exploiting sensitive location information of other installees!
        Simply search up a destination under 'MapScreen' and all densely populated points near you and your destination will render on the map.
      </Text>
    </View>
  )
}
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header containerStyle = {{backgroundColor: '#ff924e'}}>
        <Left>
          <Icon style={{ color: "#ffffff" }} name="menu" onPress={() => navigation.openDrawer()} />
        </Left>
      </Header>

      <Text style={styles.heading}>ViMAPS</Text>
      <Image style = {{width: 150, height: 150, margin: 30}}source = {logo}/>
      <Text style={{ color: "#adadad", fontSize: 20, padding: 5 }}>Make your next outing safer</Text>

      <TouchableOpacity
        onPress={() => { navigation.navigate('MapScreen') }}
        style={styles.button}>
        <Text style={styles.buttonText}>BRAVE THE OUTSIDE</Text>
      </TouchableOpacity>
    </View>
  )
}

const Drawer = createDrawerNavigator();

// function myDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Welcome" component={WelcomeScreen} />
//       <Drawer.Screen name="Maps" component={MapScreen} />
//     </Drawer.Navigator>
//   )
// }

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setState({
      location: null,
      errorMessage: null,
    })
  }

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
    console.log(location)
    this.setState({
      location
    })
    //if (location.latitude && location.longitude) {
      // fetch('http://192.168.2.17:3000/poll_location', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_id: Constants.deviceId,
      //     latitude: this.state.location.latitude,
      //     longitude: this.state.location.longitude
      //   }),
      // })
      //   .then(async response => {
      //     console.log(JSON.stringify(response));
      //     // check for error response
      //     if (!response.ok) {
      //       // get error message from body or default to response status
      //       const error = (data && data.message) || response.status;
      //       return Promise.reject(error);
      //     }
      //     const data = await response.json();

      //     //this.setState({ postId: data.id })
      //   })
      //   .catch(error => {
      //     console.error('There was an error!', error);
      //   });
    //}

  }

  render() {
    // 

    // //Gets location from user
    // let text = "";
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    //   console.log(text);
    // }

    // Side bar menu


    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="WelcomeScreen">
          <Drawer.Screen name="Welcome" component={WelcomeScreen} />
          <Drawer.Screen name="MapScreen" component={MapScreen} />
          <Drawer.Screen name="FaqScreen" component={FaqScreen} />
          {/* <Drawer.Screen name="Settings" component={SettingScreen}/> */}
          {/* <Drawer.Screen name="About" component={AboutScreen}/> */}
        </Drawer.Navigator>
      </NavigationContainer>


    );
  }
}
// const Drawer = createDrawerNavigator({

//   Home: {
//     screen: WelcomeScreen
//   },
//   Map: {
//     screen: MapScreen
//   }
// })


const styles = StyleSheet.create(
   {
   outerContainer: {
     flex: 0.9, 
     justifyContent: "center", 
     alignItems: 'center', 
     paddingTop: 500,
   },
   container: {
//     flex: 1,
   justifyContent: 'center',
     alignItems: 'center',
     //alignItems: 'center',
     //backgroundColor: '#F5FCFF',
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
     backgroundColor: "#47bfff",
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

     fontFamily:'sans-serif-thin',
    // flex: 1,
     textAlign: 'center',
     margin: 15,
     fontSize: 40
   }
 });
