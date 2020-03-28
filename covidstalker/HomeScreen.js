import React, { Component } from "react";
import{
    View,
    Text,
    StyleSheet
} from "react-native";
import { Icon, Button, Container, Header, Content, Left } from 'native-base'

class HomeScreen extends Component{
    render(){
        return (
            <Container>
                <Content>
                    <Text>Home</Text>
                </Content>
            </Container>
        );
    }
}
export default HomeScreen;