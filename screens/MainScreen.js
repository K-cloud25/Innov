import React,{useState,useEffect} from "react";
import { StyleSheet,View ,Text ,Button, TextComponent } from "react-native";


export default function MainScreen({navigation}){


    const callFlask = async() =>{
        url = "http://192.168.1.32:5000/phone"

        const getArticlesFromApi = async () => {
            let response = await fetch(
              url,{
                method : 'POST',
                headers : {
                    Accept : "application/json",
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    'String' : "HELLO"
                })
              }); 
            let json = await response.json();
            console.log(json)
            return json;
        }

        getArticlesFromApi();
    };

    return(
        <View style={stylesSheet.AppContainer}>
            <View>    
                <Text>
                    Main Screen Page
                </Text>
            </View>
            <View>
                <Button 
                    style={stylesSheet.butn}
                    title="Sign To Text"
                    onPress={()=>{
                        navigation.navigate("Camera")
                    }}
                />

                <Button
                    style={stylesSheet.butn}
                    title="PostRequestTrial"
                    onPress={()=>{
                        callFlask()
                    }}
                />
            </View>
        </View>
    );
}


const stylesSheet = StyleSheet.create({
    AppContainer : {
        flex : 1,
        backgroundColor : "#d7f2f7",
        alignContent : 'center',
        justifyContent : "center"
    },
    TitleBar : {
        flex : 0.2,
    },
    butn : {
        margin : "30px",
        padding : '20px'
    }
})