import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { setTopLevelNavigator } from './navigationService';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    return (
        <NavigationContainer ref={(navigatorRef) => {
            if (navigatorRef) {
                setTopLevelNavigator(navigatorRef as any);
            }
        }}>
            <Stack.Navigator initialRouteName="Landing" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}