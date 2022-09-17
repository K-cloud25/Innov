import React,{useEffect, useState} from 'react';
import { StyleSheet,Button, View, Text } from 'react-native';

export default function Login({navigation,route}){
    return (
        <View style = {cusSty.AppContainer}>
            <Text>Login Page</Text>
            <Button 
                title = 'HomePage'
                onPress={() => {
                    navigation.navigate('Homepage')
                }}
            />
        </View>
    );
}

const cusSty = StyleSheet.create({
    AppContainer : {
        flex : 1,
        padding : 1,
        alignItems : 'center',
        backgroundColor : '#d7f2f7',
        justifyContent : 'center'
    }
})