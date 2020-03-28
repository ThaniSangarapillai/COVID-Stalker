import React, { useState, useEffect } from 'react';
import { Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { startAsync } from 'expo/build/AR';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function App() {

  // class App extends React.Component {
  //   componentDidMount() {
      

  //     this.setState({ fontLoaded: true});
  //   }
  // }

  //Gets location from user

  state = {
    location: {},
    errorMessage: ' ',
  };

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = async => {
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
    });
  };
  

  const getFonts = () => {
    return Font.loadAsync({
       "quicksand": require("./assets/Quicksand-Light.ttf"),
     });
   };

  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return(
      <AppLoading
      startAsync={getFonts} 
      onFinish={() => setDataLoaded(true)}
      />
    );
  }

  const FadeInView = props => {
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{ ...props.style, opacity: fadeAnim, }}>
        {props.children}
      </Animated.View>
    );
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <FadeInView style={{ resizeMode: "contain"}}>
        <Text style={styles.heading}>Let's Get You Started On Braving the Outside World</Text>
        <Text>{JSON.stringify(this.state.location)}</Text>
        <TouchableOpacity
          onPress={() => alert("Hello!")}
          style={styles.button}>
          <Text style={styles.buttonText}>*cough*</Text>
        </TouchableOpacity>
      </FadeInView>

      {/* <Image source={logo} style={{ width: 256, height: 256 }}/> */}
      {/* <Text style={{color: "#A00", fontSize: 20, padding: 5}}>To get started, please catch COVID-19!</Text> */}


    </View>
  );
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
    //fontFamily: 'quicksand',
    // fontSize: 40,
    // fontWeight: 'bold'
  },
});
