import * as React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

const DownloadsScreen = ({navigation}) =>{
    return (
        <View  
            style = {styles.bgContainer}>
                <Text>
                    DownloadsScreen
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

export default DownloadsScreen;