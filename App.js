import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Pages
import Login from './screens/Login';
import CameraPage from './screens/CameraPage';
import MainScreen from './screens/MainScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Login'
          component={Login}
          options={{title : "Login"}}
        />

        <Stack.Screen 
          name='Homepage'
          component={MainScreen}
          options={{title : "Hear My Sign"}}
        />

        <Stack.Screen 
          name='Camera'
          component={CameraPage}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
