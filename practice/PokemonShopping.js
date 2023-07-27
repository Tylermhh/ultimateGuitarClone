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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, { useState, useRef } from 'react';
import DynamicHeader from './components/DynamicHeader';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { ShoppingCart, X } from 'lucide-react-native';

const pageSize = 12;



const PokemonShopping = () => {

    const [oriData, setOriData] = useState();
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [cartData, setCartData] = useState([])

    console.log('aaaaa', cartData)

    const toggleModal = () =>{
        if (isLoading){
            return
        }
        setIsLoading(true);
        setModalVisibility(!modalVisibility);
        setIsLoading(false);
    };

    const fetchCards = async (page) => {
        try {
          const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`);
          const json = await response.json();
          let addedSelectionData = json.data.map(item => {
                        return {...item, isSelected: false};
            })
            // console.log("fetched: ", addedSelectionData)
          return addedSelectionData;
          
        } catch (error) {
          console.error(error);
          return [];
        }
      }

    const fetchMore = async() => {
        if (isLoading) {
            return
        }

        setIsLoading(true);
        const nextPage = currentPage + 1;
        const newData = await fetchCards(nextPage);

        setCurrentPage(nextPage);
        setIsLoading(false);
        setData(prevData => [...prevData, ...newData]);
    };

    //gets the raw data from api
    // const getApiData = async() => {
    //     try{
    //         const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=5&pageSize=12`);
    //         const json = await response.json();

    //         let addedSelectionData = json.data.map(item => {
    //             return {...item, isSelected: false};
    //         })


    //         setOriData(addedSelectionData);
    //         setData(addedSelectionData);
    //         // console.log('added data',addedSelectionData);
    //         // console.log("hi")
    //     }
    //     catch(error){
    //         console.error;
    //     }
    // }

    //runs the getApiData function
    React.useEffect(() => {
        fetchCards(currentPage).then(datas => setData(datas));
    }, [])

    //to set the item's selected boolean to true if the add to cart button is clicked
    const setSelected = (currItem) => {

        let modifiedData = data.map(item => {
            
            // console.log('bbbb', item);
            if (item.id == currItem.id){
                
                //if we are unselecting
                if (item.isSelected){

                    setCartData(cartData.filter(item=>item.id !==currItem.id ))
                    //increase set total again
                    item.set.total += 1;
                }
                //else if we are selecting, decrement total
                else{
                    {cartData? setCartData(prevData => [...prevData, currItem]) : setCartData(currItem)}
                    item.set.total -= 1;
                }

                item.isSelected = !item.isSelected;
            }
            return item;
        })
        setData(modifiedData);
    }


    //to reset all selection variables for all items when cart is cleared
    const resetData = () => {
        setData(oriData);
    }


    //the design of each card display with all its info and select button
    const Item = ({item}) => {

        // console.log("Image src: ", item.images?.small)
        return(
            <View style={{...styles.itemView}}>
                <Image source = {{uri:item.images?.small}} style={styles.imageContainer}
                        defaultSource={require('./pictures/pokemonLogo.png')}/>
                 <View style={styles.itemDetailsBox}>
                    <Text style={styles.nameText}>{item.name}</Text>

                    {item.rarity?
                    <Text style={styles.rarityText}>{item.rarity}</Text>
                    :
                    <Text style={styles.rarityText}>Rarity Unknown</Text>
                    }
                    
                    <View style={styles.priceStockContainer}>
                        <View style={styles.priceStockIndivid}><Text style={styles.priceStockText}>${item.cardmarket?.prices?.averageSellPrice}</Text></View>
                        <View style={styles.priceStockIndivid}><Text style={styles.priceStockText}>{item.set.total} left</Text></View>
                    </View>
                </View>

                {item.isSelected && item.set.total > 0 ?
                    <TouchableOpacity style={{...styles.selectedBox}} onPress={() => {setSelected(item)}}>
                    <Text style={styles.selectionText}>{"Added"}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.selectionBox} onPress={() => {setSelected(item)}}>
                    <Text style={styles.selectionText}>{"Add to Cart"}</Text>
                    </TouchableOpacity>

                }
                


            </View>
       )
    }

    const CartItem = ({item}) => {
        return(
            <View style={styles.cartItemBox}>
                <Image 
                source={require("./pictures/pokemonLogo.png")}
                // source = {{uri:item.images?.small}} 
                style={styles.cartImageContainer}
                defaultSource={require('./pictures/pokemonLogo.png')}/>

                <View style={styles.cardDetails}>
                    <Text style={{fontSize: 17, fontWeight: 'bold', color: "black",}}>Name </Text>
                    <Text style={{fontSize: 10, color: 'black'}}>$ per card</Text>
                    <Text style={{marginTop: 20, fontSize: 10, color: '#cccccc'}}>____ cards left</Text>
                </View>

                <View style={styles.quantPriceBox}></View>
                
                <TouchableOpacity style={styles.deleteItemIcon} onPress={() => {}}>
                    <X  color='grey' size={15}></X>
                </TouchableOpacity>

            </View>
        )
    }

    //for the sticky header
    const scrollOffsetY = useRef(new Animated.Value(0)).current;


    // console.log("Data===>",data)
    return(
    <>
    <SafeAreaView style={{ ...styles.bgContainer, flex: 1 }} forceInset={{ top: 'always' }}>       
        <DynamicHeader //this is a custom container to animate the header when scrolling
            animHeaderValue={scrollOffsetY} /> 

            {/* <ScrollView
            contentContainerStyle={{alignItems:'center', marginTop: 200}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                {useNativeDriver: false},
            )}> */}
                <FlatList
                    data = {data}
                    showsVerticalScrollIndicator = {false}
                    contentContainerStyle={{alignItems: 'center', marginTop: 50}}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                    {useNativeDriver: false},
                    )}
                    // style={{backgroundColor: 'yellow', alignItems:'center'}}
                    
                    renderItem={({item,index}) => {
                        return(
                            <Item item = {item}>
                            </Item>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    onEndReached={fetchMore}
                    onEndReachedThreshold={0.1}
                /> 
                
            {/* </ScrollView> */}
            <TouchableOpacity style={styles.cartButton} onPress={() => {toggleModal()}}>
                <ShoppingCart style={styles.cartImage} color='white' size={26}></ShoppingCart>
            </TouchableOpacity>

            <Modal
            isVisible= {modalVisibility}
            onBackdropPress={toggleModal}>
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.escapeImage} onPress={toggleModal}>
                        <X  color='grey'></X>
                    </TouchableOpacity>

                    <Text style={styles.cartTitle}>Your Cart</Text>
                    <SafeAreaView style={styles.cartListContainer}>
                        <FlatList
                            data={cartData}
                            showsVerticalScrollIndicator = {true}
                            contentContainerStyle={{alignItems: 'center', marginTop: 50}}
                            renderItem={({item,index}) => {
                                return(
                                    <CartItem item = {item}>
                                    </CartItem>
                                )
                            }}
                            keyExtractor={(item, index) => index}
                            />
                    </SafeAreaView>
                </View>
            </Modal>
    </SafeAreaView> 

    

    </> 

    )


}

const styles = StyleSheet.create({
    itemView: {
        height: 700,
        width: 300,
        alignItems: 'center',
        marginBottom: 100,
        // backgroundColor: "red",
        // borderColor: "black",
        // borderWidth: 5,
    },

    imageContainer: {
        height: 380,
        width: 250,
        borderRadius: 5,
        zIndex: 1,
        backgroundColor: "#bfbfbf",
    },

    imageUnavailable: {
        height: 380,
        width: 250,
        borderRadius: 5,
        zIndex: 1,
    },

    itemDetailsBox: {
        height: 240,
        width: 300,
        marginTop: -70,
        backgroundColor: "white",
        shadowOffset: {
            width: 5,
            height: 10,},
        borderRadius: 20,
        alignItems: 'center',
        zIndex: 0,
    },

    selectionBox: {
        height: 50,
        width: 220,
        marginTop: -30,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },

    selectedBox: {
        height: 50,
        width: 220,
        marginTop: -30,
        backgroundColor: "grey",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    
    nameText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 80,
        color: "black",
    },

    rarityText: {
        fontSize: 20,
        fontFamily: "sans-serif-condensed",
        color: "#5900b3",
        marginTop: 20,
        // backgroundColor: "red",
    },

    priceStockContainer: {

        height: 40,
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        // backgroundColor: "yellow",
    },

    priceStockIndivid: {
        flex: 1,
    },

    priceStockText: {
        fontSize: 20,
        alignSelf: 'center',
        color: "#404040",
        fontWeight: '400',
    },

    selectionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
    },

    bgContainer: {
        flex: 1,
        backgroundColor: "#d9d9d9",
    },

    cartButton:{
        position: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 20,
        marginRight: 20,
        marginTop: 10,
        width: 55,
        height: 55,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: "#3366ff",
        zIndex: 2,
        justifyContent: 'center',
        alignItems:'center',
    },

    cartImage:{
        height: 30,
        width: 30,
    },

    modal: {
        height: "50%",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
    },

    modalButton:{
        width: 100,
        marginBottom: 10,
    },

    escapeImage: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end',
        // backgroundColor: "red",
        alignItems:'center',
        justifyContent: 'center',
    },

    cartTitle:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 10,
    },

    cartItemBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        width: "100%",
        height: 100,
        backgroundColor: 'red',
        marginBottom: 10,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },

    cartImageContainer:{
        height: "100%",
        width: "20%",
        backgroundColor: "green",
    },

    deleteItemIcon: {
        height: 10,
        width: 10,
        backgroundColor: "yellow",
        alignSelf: 'flex-start',
        alignItems:'center',
        justifyContent: 'center',
    },

    cardDetails: {
        flexDirection: 'column',
        backgroundColor: 'green',
        height: "100%",
        width: "40%",
    },

    quantPriceBox: {
        backgroundColor: 'blue',
        height: "100%",
        width: "30%",
    },

    cartListContainer:{
        height: "70%",
        backgroundColor: 'orange',
        alignItems: 'center',
    }

    
})

export default PokemonShopping;
