import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from './screens/WelcomePage';
import LoginPage from './screens/LoginPage';

const Stack = createNativeStackNavigator;

const App = () => {
  const optionsLst = {headerShown: false};
  <NavigationContainer>
    <Stack.Navigator initialRouteName="welcomePage">
      <Stack.Screen name="welcomePage" container={WelcomePage} options={optionsLst}/>
      <Stack.Screen name="loginPage" container={LoginPage} options={optionsLst}/>
      <Stack.Screen name="loginPage" container={LoginPage} options={optionsLst}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default App;