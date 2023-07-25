import * as React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {Camera, Car, Download, Home, Search, Settings} from 'lucide-react-native'
import SearchScreen from '../screens/SearchScreen';

const homeName = 'Home';
const downloadsName = 'Downloads';
const settingsName = 'Settings';
const searchName = 'Search'

const Tab = createBottomTabNavigator();

const TabBarContainer = () => {
    const optionsLst = {headerShown: false, tabBarHideOnKeyboard: true,};
    return (
            <Tab.Navigator
            
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                // tabBarIcon: ({focused, color, size}) => {
                //     let iconName;
                //     let routeName = route.name;

                //     if (routeName === homeName){
                //         iconName = focused ? 'home' : 'home-outline'
                //     } else if (routeName === downloadsName){
                //         iconName = focused ? 'list' : 'list-outline'
                //     } else if (routeName === settingsName){
                //         iconName = focused ? 'settings' : 'settings-outline'
                //     }

                //     return <Ionicons name={iconName} size={size} color={color}></Ionicons>
                // },


                //to spotlight which tab we have selected and change icon effects accordingly
                tabBarIcon:({focused})=>{
                    let routeName = route.name;
                        if (routeName === homeName){
                                if(focused){
                                    return <Home color='#c5bbf7' strokeWidth={1}/>
                                }else{
                                    return <Home color='grey' strokeWidth={1}/>
                                }
                        }
                        else if (routeName === searchName){
                            if (focused){
                                return <Search color='#c5bbf7' strokeWidth={1}/>
                            }else{
                                return <Search color='grey' strokeWidth={1}/>
                            }
                        }
                        else if (routeName === downloadsName){
                            if (focused){
                                return <Download color='#c5bbf7' strokeWidth={1}/>
                            }else{
                                return <Download color='grey' strokeWidth={1}/>
                            }
                        }
                        else if (routeName === settingsName){
                            if (focused){
                                return <Settings color='#c5bbf7' strokeWidth={1}/>
                            }else{
                                return <Settings color='grey' strokeWidth={1}/>
                            }
                        }
                },
                tabBarStyle: {
                    marginTop: 'auto',
                    height: '9%',
                    width: '100%',
                    backgroundColor: '#262626',
                    verticalAlign: 'bottom',
                    borderTopColor: 'black',
                    borderTopWidth: 1,
                }
            })}
            tabBarOptions = {{
                activeTintColor: "#c5bbf7",
                inactiveTintColor: "grey",
                labelStyle: {paddingBottom: 10, fontSize: 10},
                style: {
                    padding: 10,
                    height: 70,
                }
            }}
            >

                <Tab.Screen name={homeName} component={HomeScreen} options={optionsLst}></Tab.Screen>
                <Tab.Screen name={searchName} component={SearchScreen} options={optionsLst}></Tab.Screen>
                <Tab.Screen name={downloadsName} component={DownloadsScreen} options={optionsLst}></Tab.Screen>
                <Tab.Screen name={settingsName} component={SettingsScreen} options={optionsLst}></Tab.Screen>

            </Tab.Navigator>
    )
}

export default TabBarContainer;