import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import * as React from 'react';
import LinearGradient from "react-native-linear-gradient";

const AnimationContainerView = (props) => {
    const containerTranslation = React.useRef(new Animated.Value(-600)).current; //initial val of position set to be off screen

    //handles the animation behind the scenes. tweaks the values for animation to happen
    React.useEffect(() => {
        Animated.timing(containerTranslation, {
            toValue: 100,
            duration: 1500,
            easing: Easing.bounce,
            useNativeDriver: true //you just need this idk why
        }).start();
    })

    return (
        <Animated.View
            style={{
                ...props.style,
                transform: [
                    {
                        translateY: containerTranslation //connect the variable that we made change how we want to actually animate the thing that we see on screen
                    },
                ],
            }}>
            {
            props.children //this lets you nest more components inside this component
            }  
        </Animated.View>
    )

}

const WelcomePage = ({navigation}) => {

  
    return(
        <>
        <View
            style={styles.bgContainer}>

            <AnimationContainerView         //container for animation
                style={styles.animationContainer}>
                    
                <LinearGradient            //container for gradient
                    style = {styles.gradientContainer}
                    colors = {["#1e0d73", "#4e2fe9"]}>

                    <TouchableOpacity
                        style={styles.buttonGuest}
                        onPress={() => {
                            navigation.navigate("homePage")
                        }}>
                        <Text>Continue as Guest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonAcc}
                        onPress={() => {
                            navigation.navigate("loginPage");
                        }}>
                            <Text>Account Login</Text>
                    </TouchableOpacity>

                </LinearGradient>

            </AnimationContainerView>

        </View>
        </>
    )

}

const styles = StyleSheet.create({

    bgContainer: {
        flex: 1,
        backgroundColor: "#1a1a1a",
        justifyContent: 'center',
        padding: "5%"
    },

    animationContainer: {

        height: 500,
        borderRadius: 20,
        backgroundColor: "white",
    },

    gradientContainer: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
    },

    buttonGuest:{
        width: "100%",
        height: 50,
        backgroundColor: "#b0b0b5",
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: "5%",
        marginTop: "100%",
    },

    buttonAcc:{
        width: "100%",
        height: 50,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: "5%",
        marginTop: 10,
    },

    buttonText:{
        alignSelf: 'center',
        fontSize: 20,
        color: "white",
    }
})

export default WelcomePage;