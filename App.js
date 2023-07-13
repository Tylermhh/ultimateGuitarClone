import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './screens/WelcomePage';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import DownloadsScreen from './screens/DownloadsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const optionsLst = {headerShown: false};

  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="homePage">
      <Stack.Screen name="welcomePage" component={WelcomePage} options={optionsLst}/>
      <Stack.Screen name="loginPage" component={LoginPage} options={optionsLst}/>
      <Stack.Screen name="homePage" component={HomePage} options={optionsLst}/>
    </Stack.Navigator>

    {/* <Tab.Navigator
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

            </Tab.Navigator> */}
  </NavigationContainer>

  );
};

export default App;