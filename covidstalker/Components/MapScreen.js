import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Left, Right, Icon, Container } from 'native-base';
import Constants from 'expo-constants';
//import { hostname } from 'os';
/* side menu? */
const Drawer = createDrawerNavigator();

class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: null,
      search: '',
      searchTimeout: null, //timeout to prevent search spamming
      dest: {}, //destination data
      route: [],
      circles: [{ center: { latitude: 0, longitude: 0 }, num: 0 }]
    };
  }
  componentDidMount() {
    this._getLocation();

  }
  addCircles = (data) => {
    var num = data.nearby.length
    let center = {
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.state.circles.push({ center, num });
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

  search = (search) => {
    if (search == "") {
      return;
    }

    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyA1ZRbmrfVoexPgAOYXWk3lIY4OkjSGNSE&input=${search}&inputtype=textquery&fields=formatted_address,geometry,place_id`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "INVALID_REQUEST") {
          return alert("Error: Invalid request.");
        }
        const resObj = responseJson.candidates[0];
        if (!resObj) {
          return alert("Error: response object undefined (most likely location not found).");
        }
        this.setState(
          {
            dest:
            {
              place_id: resObj.place_id,
              address: resObj.formatted_address,
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


    //send ur data to server 
      // fetch('http://192.168.2.17:3000/poll_location', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_id: Constants.deviceId,
      //     latitude: this.state.dest.latitude,
      //     longitude: this.state.dest.longitude,
      //     location: {
      //       latitude: this.state.dest.latitude,
      //       longitude: this.state.dest.longitude,
      //       location_id: this.state.dest.place_id
      //     }
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


    //FETCH RESPONSE FOR PLOTTING HOTSPOTS 
    fetch('http://192.168.2.17:3000/request_nearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: Constants.deviceId,
        latitude: this.state.dest.latitude,
        longitude: this.state.dest.longitude,
        location: {
          latitude: this.state.dest.latitude,
          longitude: this.state.dest.longitude,
          location_id: this.state.dest.place_id
        }
      }),
    })
      .then(async response => {
        console.log(JSON.stringify(response));
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        const data = await response.json();


        console.log(data)
        for (let i = 0; i < data.hotspots.length; i++) {
          this.addCircles(data.hotspots[i]);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }


  updateSearch = search => {
    this.setState({ search });
    clearTimeout(this.state.searchTimeout);
    this.state.searchTimeout = setTimeout(
      () => {
        this.search(search);
      }, 1000);
  };

  render() {
    let latitude, longitude;
    latitude = 0;
    longitude = 0;
    if (this.state.location) {
      latitude = this.state.location.latitude;
      longitude = this.state.location.longitude;
    }
    const marker = this.state.dest.latitude && this.state.dest.longitude ? <MapView.Marker key={1} coordinate={{ longitude: this.state.dest.longitude, latitude: this.state.dest.latitude }} pinColor='red' title='Your Destination'></MapView.Marker> : null;
    let i = 0;
    let fillColor = "";
    let strokColor = "";
    const circles = this.state.circles.map(c => {

      if (c.num < 4) {
        fillColor = 'rgba(' + (103 + 10 * c.num) + ',' + (194 - 10 * c.num) + ',' + (100 - 10 * c.num) + ',' + 0.3 + ')';
        strokeColor = '#46ab3a';
      } else {
        fillColor = 'rgba(' + (103 + 10 * c.num) + ',' + (194 - 10 * c.num) + ',' + (100 - 10 * c.num) + ',' + 0.3 + ')';
        strokeColor = '#ff5e00';
      }
      return (
        <MapView.Circle key={i++} center={c.center}
          radius={500}
          strokeWidth={1}
          strokeColor={strokeColor}
          fillColor={fillColor} />)
    });

    return (
      <View>
        <Header containerStyle={{ backgroundColor: '#ff924e' }}>
          <Left>
            <Icon style={{ color: "#ffffff" }} name="menu" onPress={() => alert("haha")} />
          </Left>
        </Header>
        <View>
          <SearchBar showLoadingIcon={true} lightTheme={true} placeholder="Find destination..." value={this.state.search} onChangeText={this.updateSearch} />
        </View>
        <MapView
          style={{ alignSelf: 'stretch', height: '80%' }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034
          }}
          showsUserLocation={true}

        >
          {marker}
          {circles}
        </MapView>
      </View>
    )
  }
}
export default MapScreen;