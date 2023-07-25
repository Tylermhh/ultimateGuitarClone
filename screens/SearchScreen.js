import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, Car, Download, Home, Search, Settings} from 'lucide-react-native'



const SearchScreen = ({navigation}) =>{

  const [id, setId] = React.useState('');
    return (
        <View style = {styles.bgContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIcon}>
              <Search style={{flex: 1}} color='#d9d9d9' size={20} strokeWidth={2}/>
            </TouchableOpacity>
            <TextInput
              style={styles.searchbar}
              // keyboardType='number-pad'
              placeholder="Search"
              placeholderTextColor={'#d9d9d9'}
              onChangeText={input => setId(input)}
              value={id}/>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bgContainer: {
      flex: 1,
      backgroundColor: "#1a1a1a",
      paddingTop: 20,
      paddingHorizontal: 10,
    },
  
    bottomBar: {
      marginTop: 'auto',
      height: "10%",
      width: "100%",
      backgroundColor: "#262626",
      verticalAlign: 'bottom',
      borderTopColor: "black",
      borderTopWidth: 3,
    },

    tempText:{
        fontSize: 26,
    },

    searchContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      backgroundColor: '#595959',
      borderRadius: 10,
      height: 50,
      paddingHorizontal: 5,
    },

    searchbar: {
      flex: 1,
      borderColor: 'white',
      backgroundColor: '#595959',
      borderRadius: 10,
      width: '90%',
      height: 50,
      paddingHorizontal: 0,
      // backgroundColor: 'red',
    },

    searchIcon: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'yellow',
    },
  
  })

export default SearchScreen;