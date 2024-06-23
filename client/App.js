// src/App.js

import React from 'react';
import StartPage from './screens/StartPage';
import Home from './screens/Home';
import AddMoney from './screens/AddMoney';
import AddSpend from './screens/AddSpend';
import Setting from './screens/Setting';
import TransDetails from './screens/TransDetails';
import LandingPage from './screens/LandingPage';
import Login from './screens/Login';
import Register from './screens/Register';
import { AuthProvider } from './AuthContext'; // Adjust the path as needed
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransactionProvider } from './TransactionContext';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="StartPage" component={StartPage} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddMoney" component={AddMoney} />
            <Stack.Screen name="AddSpend" component={AddSpend} />
            <Stack.Screen name="TransDetails" component={TransDetails} />
            <Stack.Screen name="Setting" component={Setting} />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionProvider>
    </AuthProvider>
  );
}
