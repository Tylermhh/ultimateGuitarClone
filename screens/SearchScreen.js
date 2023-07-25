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

const CLIENT_ID = "0a3f6d6c86994102a14e9626074c8a8f"
const REDIR_URI = "http://localhost:8080/"

//the container for how each search result will be displayed
const Item = ()=> {
  return(
    <>
    <TouchableOpacity
    style={styles.itemContainer}>
      <Image style={styles.albumCoverImg}/>
      <View style={styles.itemDetailsBox}>
        <Text>Song title</Text>
        <Text>Artist</Text>
      </View>
    </TouchableOpacity>
    </>
  )
}



const SearchScreen = ({navigation}) =>{

  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState([]);
    return (
      <View style = {styles.bgContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIcon}>
              <Search style={{flex: 1}} color='#d9d9d9' size={20} strokeWidth={2}/>
            </TouchableOpacity>
            <TextInput
              style={styles.searchbar}
              placeholder="Search"
              placeholderTextColor={'#d9d9d9'}
              onChangeText={input => setSearch(input)}
              value={search}/>
          </View>

        <SafeAreaView
        style={styles.safeAreaContainer}>
          <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=> <Item/>}>
          

          </FlatList>
        </SafeAreaView>

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
      height: "6%",
      backgroundColor: '#595959',
      borderRadius: 10,
      paddingHorizontal: 5,
    },

    searchbar: {
      flex: 1,
      borderColor: 'white',
      backgroundColor: '#595959',
      borderRadius: 10,
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

    safeAreaContainer:{
      flex: 1,
      backgroundColor: 'red',
      marginTop: 10,
    },

    itemContainer:{
      flexDirection: 'row',
      width: "100%",
      height: "15%"
    },

    albumCoverImg: {
      height: "100%",
      aspectRatio: 1,
      marginHorizontal: 10,
      marginVertical: 10,
    },

    itemDetailsBox:{
      flex: 1,

    },

    itemDetailsText:{
      color: 'white',

    }
  
  })

export default SearchScreen;