import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";

import Tasks from './Tasks';
import LoginPage from './HomePage';
import HomePage from './Tasks';


const Navigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            {/* <Stack.Screen name='login' component={HomePage} /> */}
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name='Tasks' component={Tasks} />
        </Stack.Navigator>
    );
}

export default Navigator;

