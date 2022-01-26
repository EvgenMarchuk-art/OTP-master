import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthenticationScreen} from './Component/authentication/AuthenticationScreen';
import {InputOtpScreen} from './Component/inputOtpScreen/InputOtpScreen';
import {HomeScreen} from './Component/homescreen/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name="inputOtpScreen"
          component={InputOtpScreen}
          options={{
            title: 'Input Otp',
            headerBackTitle:'',

          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerBackTitle:'',

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
