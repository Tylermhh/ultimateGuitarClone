import * as React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const homeName = 'Home';
const downloadsName = 'Downloads';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

const TabBarContainer = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === homeName){
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routeName === downloadsName){
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (routeName === settingsName){
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}></Ionicons>
                },
            })}
            tabBarOptions = {{
                activeTintColor: "grey",
                inactiveTintColor: "white",
                labelStyle: {paddingBottom: 10, fontSize: 10},
                style: {
                    padding: 10,
                    height: 70,
                }
            }}
            >

                <Tab.Screen name={homeName} component={HomeScreen}></Tab.Screen>
                <Tab.Screen name={downloadsName} component={DownloadsScreen}></Tab.Screen>
                <Tab.Screen name={settingsName} component={SettingsScreen}></Tab.Screen>

            </Tab.Navigator>

            
        </NavigationContainer>
    )
}

export default TabBarContainer;