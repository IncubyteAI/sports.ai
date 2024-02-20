import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import TestScreen from '../screens/TestScreen';
import ProfileScreen from '../screens/ProfileScreen';
import useAuth from '../hooks/useAuth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { themeColors } from '../assets/theme/index';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function AppNavigation() {
    const {user}  = useAuth();
    if(user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='UserHome'>
                    <Stack.Screen name="UserHome" options={{headerShown: false}} component={UserTabs} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }else{
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Welcome'>
                    <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
                    <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
                    <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    function UserTabs() {
        return (
            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { 
                    elevation: 5,
                    position: 'absolute',
                    bottom: 50,
                    left: 20,
                    right: 20,
                    height: 57, 
                    borderRadius: 20,
                    backgroundColor: themeColors.whitey,
                    borderColor: themeColors.black,
                    borderWidth: 1.5,
                }, 
                tabBarActiveTintColor: themeColors.blue,
                tabBarInactiveTintColor: themeColors.black,
                swipeEnabled: false,
                
                tabBarPressColor: 'transparent',
                tabBarIndicatorStyle: {
                    backgroundColor: themeColors.blue,
                    width: 28,
                    left: 52.5,
                    borderRadius: 20,
                    bottom: 10
                }
            }} 
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({ color }) => (<Feather name="home" size={28} color={color} style={{marginBottom: -3, marginRight: -3}} />), }} />
                <Tab.Screen name="Test" component={TestScreen} options={{tabBarIcon: ({ color }) => (<Feather name="coffee" size={28} color={color} style={{marginBottom: -3, marginRight: -3}} />) }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: ({ color }) => (<Feather name="user" size={28} color={color} style={{marginBottom: -3, marginRight: -3}} />) }}/>
                
            </Tab.Navigator>
        )
    }
    
}