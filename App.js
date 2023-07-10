import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './screens/WelcomePage';
import LoginPage from './screens/LoginPage';

const Stack = createNativeStackNavigator();

const App = () => {
  const optionsLst = {headerShown: false};

  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="welcomePage">
      <Stack.Screen name="welcomePage" component={WelcomePage} options={optionsLst}/>
      <Stack.Screen name="loginPage" component={LoginPage} options={optionsLst}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;