import react from 'React';
//IMPORTTTTTTANT 
import {MapView} from 'expo';   
class Maps extends React.Component{
    constructor(props){
        super(props);
    }


}

function MapScreen({navigation}){
    return(
    <View>
        <Header>
            <Left></Left>
            <Body>
                <Title>Map</Title>
            </Body>
            <Right>
            </Right>
        </Header>

        <MapView 
            style = {flex: 1} 
            initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
        >
            <Text>Insert map lol!</Text>
        </MapView>
    </View>
    )
  }