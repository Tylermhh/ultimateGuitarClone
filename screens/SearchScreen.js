import * as React from 'react';
import { View, Text, StyleSheet, } from 'react-native';



const SearchScreen = ({navigation}) =>{

  const [data, setData] = useState([]);

  // const getApiData = async() => {
  //   try{
  //     const response = await fetch('https://reactnative.dev/movies.json');
  //     const json = await response.json();
  //     console.log("json: ", json)
  //   }
  //   catch (error){
  //     console.error();
  //   }
  // }

  // useEffect(() => {
  //   getApiData();
  // }, []);

    return (
        <View  
            style = {styles.bgContainer}>
                <Text>
                    SearchScreen
                </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bgContainer: {
      flex: 1,
      backgroundColor: "#1a1a1a",
      justifyContent: 'center',
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
    }
  
  })

export default SearchScreen;