import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';

const Max_Header_Height = 150;
const Min_Header_Height = 70;
const Scroll_Distance = Max_Header_Height - Min_Header_Height;



const DynamicHeader = ({animHeaderValue}) => {

    const animatedHeaderHeight = animHeaderValue.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [Max_Header_Height, Min_Header_Height],
        extrapolate: 'clamp',
    })


  return (
    <Animated.View
        style={{...styles.header, height: animatedHeaderHeight}}>
          <Text style={styles.headerText}>POKEMON CARDS</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',      
        left: 0,
        right: 0,
        paddingTop: 10         
    },
    headerText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
  });

export default DynamicHeader;