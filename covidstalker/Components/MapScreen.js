import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigator } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
   
export default class MapScreen extends Component(){
    state = {
      location: null,
      errorMessage: null,
    };
  
    componentDidMount() {
      this._getLocation();
    }
    _getLocation = async () => {
      /*
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      
      if (status !== 'granted') {
        console.log('Permission Denied!');
  
        this.setState({
          errorMessage: 'Permission Denied!'
        })
      }
      */
      const location = await Location.getCurrentPositionAsync();
      this.setState({
        location
      })
    }  
    render(){
      return( 
            <MapView 
              style = {{flex: 1}} 
              initialRegion={{
                latitude: 0,
                longitude: 0
              }}>
          </MapView>)
    }
}
