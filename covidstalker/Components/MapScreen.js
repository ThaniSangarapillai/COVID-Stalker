import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { View } from 'native-base';
import {SearchBar} from 'react-native-elements';   
import {Alert} from 'react-native';
import { Header } from 'react-native-elements';
class MapScreen extends Component{
    constructor(){
      super();
      this.state = {
        location: null,
        errorMessage: null,
        search: '',
        searchTimeout: null, //timeout to prevent search spamming
        dest:{}, //destination data
        route: [],
        markers: []
      };
    }
    renderRoute (coordinates, i) {
      return (
          <MapView.Polyline
            key={i}
            coordinates={coordinates}
            strokeColor={'blue'}
            strokeWidth={4}
          />
      );
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
      this.setState({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude  
        }
      })
    } 

  search = (search)=>{
    if(search == ""){
      return;
    }
    
    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyA1ZRbmrfVoexPgAOYXWk3lIY4OkjSGNSE&input=${search}&inputtype=textquery&fields=formatted_address,geometry`)
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.status == "INVALID_REQUEST"){
        return alert("Error: Invalid request.");
      }
      const resObj = responseJson.candidates[0];
      if(!resObj){
        return alert("Error: response object undefined (most likely location not found).");
      }
      this.setState(
        {
          dest: 
          {address: resObj.formatted_address, 
           longitude: resObj.geometry.location.lng, 
           latitude: resObj.geometry.location.lat
          }
        }
      );
      console.log(this.state.dest);
      Alert.alert(
        `Routing to ${search}`,
        this.state.dest.address,
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      );

    })
    .catch(error => {
      console.error(error);
    });

    return;
  }
  updateSearch = search => {
    this.setState({ search });
    clearTimeout(this.state.searchTimeout);
    this.state.searchTimeout = setTimeout(
    () => {
      this.search(search);
    }, 1000);
  };
    render(){
      let latitude, longitude;
      latitude = 0;
      longitude =  0;
      
      if(this.state.location){
        latitude = this.state.location.latitude;
        longitude = this.state.location.longitude;
      }
      const marker =this.state.dest.latitude &&this.state.dest.longitude ?<MapView.Marker key = {1} coordinate = {{longitude: this.state.dest.longitude, latitude:this.state.dest.latitude}} pinColor = 'red' title = 'Your Destination'></MapView.Marker> : null;
      return(
        <View>
            <Header></Header>
            <View>
              <SearchBar showLoadingIcon = {true} lightTheme = {true} placeholder = "Find destination..." value = {this.state.search} onChangeText = {this.updateSearch}/>
          </View>
          <MapView 
              style={{ alignSelf: 'stretch', height: '80%'}}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.043,
                longitudeDelta: 0.034
              }}
              showsUserLocation = {true}
              >
            {marker}
          </MapView>
        </View>
      )
    }
}
export default MapScreen;