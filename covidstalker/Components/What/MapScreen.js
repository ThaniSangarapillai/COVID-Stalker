import react from 'React';
import MapView from 'react-native-maps';
   
export default class MapScreen extends Component(props){
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
    render(
        //<Text>{JSON.stringify(props)}</Text>
        <MapView 
            style = {{flex: 1}} 
            initialRegion={{
              this.state.location
            }}>
        </MapView>
    )
  }
