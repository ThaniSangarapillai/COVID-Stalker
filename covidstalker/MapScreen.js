import React, { Component } from "react";
import{
    View,
    Text,
    StyleSheet
} from "react-native";
import { Icon, Button, Container, Header, Content, Left } from 'native-base'

class MapScreen extends Component{
    render(){
        return (
            <Container>           
                <Content>
                    <Text>Map</Text>
                </Content>
            </Container>
        );
    }
}
export default MapScreen;