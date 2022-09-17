import React,{useState,useEffect} from "react";
import { StyleSheet,View ,Text ,Button } from "react-native";

export default function MainScreen({navigation}){
    return(
        <View style={stylesSheet.AppContainer}>
            <View>    
                <Text>
                    Main Screen Page
                </Text>
            </View>
            <View>
                <Button 
                    title="Sign To Text"
                    onPress={()=>{
                        navigation.navigate("Camera")
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

    }
})