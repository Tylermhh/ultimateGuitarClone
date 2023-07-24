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

const pageSize = 12;



const PokemonShopping = () => {

    const [oriData, setOriData] = useState();
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

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
        // console.log('currItemmmm', currItem)
        let modifiedData = data.map(item => {
            // console.log("curr", item)
            if (item.id == currItem){
                console.log("found item!")
                item.isSelected = true;
                item.set.total -= 1;
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
                        <View style={styles.priceStockIndivid}><Text style={styles.priceStockText}>$  {item.cardmarket?.prices?.averageSellPrice}</Text></View>
                        <View style={styles.priceStockIndivid}><Text style={styles.priceStockText}>{item.set.total} left</Text></View>
                    </View>
                </View>

                {item.isSelected ?
                    <TouchableOpacity style={{...styles.selectedBox, opacity: 0.75}} disabled={true}>
                    <Text style={styles.selectionText}>{"Added"}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.selectionBox} onPress={() => {setSelected(item.id)}}>
                    <Text style={styles.selectionText}>{"Add to Cart"}</Text>
                    </TouchableOpacity>

                }
                


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

            <ScrollView
            contentContainerStyle={{alignItems:'center', marginTop: 200}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                {useNativeDriver: false},
            )}>
                <FlatList
                    data = {data}
                    showsVerticalScrollIndicator = {false}
                    // style={{backgroundColor: 'yellow', alignItems:'center'}}
                    renderItem={({item,index}) => {
                        return(

                            <Item item = {item}>
                            </Item>

                            // <Item   //this is a custom container for how the items are displayed
                            //     imgSrc={item.cardmarket.url}
                            //     name={item.name}
                            //     rarity={item.rarity}
                            //     price={item.cardmarket.prices.averageSellPrice}
                            //     stock={item.set.total}
                            //     selectionStateText={item.isSelected}>
                            // </Item>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                    onEndReached={fetchMore}
                    onEndReachedThreshold={0.1}
                /> 
                
            </ScrollView>
            <TouchableOpacity style={styles.cartButton}>
            <Image source = {require("./pictures/cartTrans.png")} style={styles.cartImage}/>
            </TouchableOpacity>
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
        height: 400,
        width: 260,
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
        marginTop: -35,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },

    selectedBox: {
        selectionBox: {
            height: 50,
            width: 220,
            marginTop: -35,
            backgroundColor: "grey",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
        },
    },
    
    nameText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 80,
        color: "black",
    },

    rarityText: {
        fontSize: 20,
        color: "blue",
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
        color: "black",
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
    }
    
})

export default PokemonShopping;
