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
import PokemonShopping from './practice/PokemonShopping';
import SearchScreen from './screens/SearchScreen';
import MainPage from './screens/MainPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const optionsLst = {headerShown: false};

  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="loginPage">
      <Stack.Screen name="welcomePage" component={WelcomePage} options={optionsLst}/>
      <Stack.Screen name="loginPage" component={LoginPage} options={optionsLst}/>
      <Stack.Screen name="mainPage" component={MainPage} options={optionsLst}/>
      <Stack.Screen name="homePage" component={HomePage} options={optionsLst}/>
      <Stack.Screen name="pokiPage" component={PokemonShopping} options={optionsLst}/>
    </Stack.Navigator>

    {/* <Tab.Navigator>
        <Tab.Screen name="homeTab" component={HomePage} options={optionsLst}/>
        <Tab.Screen name="settingsTab" component={SettingsScreen} options={optionsLst}/>
        <Tab.Screen name="downloadsTab" component={DownloadsScreen} options={optionsLst}/>
        <Tab.Screen name="searchTab" component={SearchScreen} options={optionsLst}/>
    </Tab.Navigator> */}

    {/* <Tab.Navigator
            initialRouteName={homeTab}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === homeTab){
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routeName === downloadsTab){
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (routeName === settingsTab){
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

                <Tab.Screen name={homeTab} component={HomeScreen}></Tab.Screen>
                <Tab.Screen name={downloadsTab} component={DownloadsScreen}></Tab.Screen>
                <Tab.Screen name={settingsTab} component={SettingsScreen}></Tab.Screen>

            </Tab.Navigator> */}
  </NavigationContainer>

  );
};

export default App;