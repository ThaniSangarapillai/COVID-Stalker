import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { View } from 'native-base';
import {SearchBar} from 'react-native-elements';   
import {Alert} from 'react-native';
import decode from './RouteDecode';
class MapScreen extends Component{
    constructor(){
      super();
      this.state = {
        location: null,
        errorMessage: null,
        search: '',
        searchTimeout: null, //timeout to prevent search spamming
        dest:{}, //destination data
        route: []
      };
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
          dest: {address: resObj.formatted_address, longitude: resObj.geometry.location.lng, latitude: resObj.geometry.location.lat}
        }
      );
      Alert.alert(
        `Routing to ${search}`,
        this.state.dest.address,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );

    })
    .catch(error => {
      console.error(error);
    });

    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.location.latitude},${this.state.location.longitude}&destination=${this.state.dest.latitude},${this.state.dest.longitude}&key=AIzaSyA1ZRbmrfVoexPgAOYXWk3lIY4OkjSGNSE`)
      .then(response=>response.json())
      .then(responseJson=>{
        if(responseJson.error_message){
          alert(responseJson.error_message);
        }
        alert("...??");
        this.setState({route: decode(responseJson)})
      }).catch(err=> console.log("??????"+err));
      console.log(this.state.route);
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

      return(
        <View>
            <View>
              <SearchBar placeholder = "Find destination..." value = {this.state.search} onChangeText = {this.updateSearch}/>
          </View>
          <MapView 
              style={{ alignSelf: 'stretch', height: '90%'}}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.043,
                longitudeDelta: 0.034
              }}
              showsUserLocation = {true}
              >
          </MapView>

        </View>
      )
    }

    // var POI = new google.maps.Circle({
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: '#FF0000',
    //   fillOpacity: 0.35,
    //   // map: map, // map object 
    //   center: ,
    //   radius: 500
    // })
}
export default MapScreen;