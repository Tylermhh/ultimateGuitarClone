import {
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    StyleSheet,
  } from 'react-native';
  import * as React from 'react';
  // import {NavigationContainer} from '@react-navigation/native';
  // import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import LinearGradient from "react-native-linear-gradient";
  import Modal from "react-native-modal";

  const LoginPage = ({navigation}) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pwVisibility, setPwVisibility] = React.useState(false);
    const [modalVisibility, setModalVisibility] = React.useState(false);

    const toggleModal = () =>{
        setModalVisibility(!modalVisibility);
    };

    return(
        <>
        <View style={{paddingHorizontal:15}}>
        <TextInput          //username input box
            style={styles.inputs}
            placeholder='Username'
            placeholderTextColor={"#b3b3b3"}
            onChangeText={(inputedUsername) => setUsername(inputedUsername)} //this modifies the state variable 
            value={username} //and then this line sets the value of this textinput to be that variable
            />

        <View style={styles.pwAndIconContainer}>

            <TextInput          //password input box
                style={styles.pwBox}
                placeholder='Password'
                placeholderTextColor={"#b3b3b3"}
                onChangeText={(inputedPassword) => setPassword(inputedPassword)} //this modifies the state variable 
                value={password} //and then this line sets the value of this textinput to be that variable
                secureTextEntry = {!pwVisibility}
                />

            <TouchableOpacity
                //this switches the pwVisibility between true and false everytime this thing is pressed
                onPress={() => setPwVisibility(!pwVisibility)}>

                {pwVisibility?

                    //if pwVisibility is true
                    <Image
                        source={require("../images/eye-closed.png")}  //sets the image to be an eyeclosed icon to indicate what will happen when pressed
                        style={styles.eyeIcon}/>
                    :
                    
                    //else if pwVisibility is false
                    <Image
                        source={require("../images/eye-open.png")}   //sets image to eye-open
                        style={styles.eyeIcon}/>
            
                }
            </TouchableOpacity>
            
        </View>

        <Text style = {styles.text} onPress={() => {alert("Too bad")}}>Forgot Password?</Text>

        <TouchableOpacity
            //makes the button disabled by setting disabled to true if the given password conditions aren't met
            disabled = {password.length > 7 && /\d/g.test(password) ? false : true}
            opacity = {disabled ? 0.5 : 1}
            style={styles.loginButton}
        >
            <Text style={styles.text}>
                Login
            </Text>
        </TouchableOpacity>

        <Text
            style= {styles.text}>
            By clicking the button above, I agree to the

            <Text
                style= {{
                    color: "blue",
                    fontFamily: "serif",
                }}
                onPress={() =>{
                    toggleModal  //to show the terms and conditions modal
                }}>
                Terms and Conditions
            </Text>

        </Text>

        <Modal
            isVisible = {modalVisibility}>
            <View 
                style={styles.modal}
                onBackdropPress = {() => {toggleModal}}>
                <Text>Ur not actually gonna read it even if it were here. Just go back and click the login button</Text>
                <Button title="Okay bring me back" onPress={toggleModal} />
            </View>
        </Modal>
        

        </View>

        </>

        
    )
  }

  const styles = StyleSheet.create({
    inputs: {
        flex: 1,
        backgroundColor: "#737373",
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'flex-start',
        borderRadius: 10,
        color: 'white',
    },

    pwAndIconContainer:{
        flexDirection: 'row',
        backgroundColor: "#737373",
        borderWidth: 1,
        borderColor: 'black',
        width: "100%",
        height: 55,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        color: 'white',
        paddingHorizontal: 10,
    },

    pwBox: {
        flex: 1,
        backgroundColor: "#737373",
        borderWidth: 1,
        borderColor: 'transparent',
        alignSelf: 'flex-start',
        borderRadius: 10,
        color: 'white',
    },

    eyeIcon: {
        height: 15,
        width: 20,
    },

    loginButton: {
        width: "100%",
        backgroundColor: "#664bec",
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: "white",
        fontSize: 10,
        fontFamily: "serif",
    },

    modal: {
        flex: 1,
        backgroundColor: "grey",
    }
  })

  export default LoginPage;