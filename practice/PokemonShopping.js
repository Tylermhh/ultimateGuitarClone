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

import React, { useState, useRef } from 'react';
import DynamicHeader from './components/DynamicHeader';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const PokemonShopping = () => {

    const [oriData, setOriData] = useState();
    const [data, setData] = useState();

    //gets the raw data from api
    const getApiData = async() => {
        try{
            const response = await fetch("https://api.pokemontcg.io/v2/cards?");
            const json = await response.json();
            let addedSelectionData = json.data.map(item => {
                return {...item, isSelected: false};
            })
            setOriData(addedSelectionData);
            setData(addedSelectionData);
        }
        catch(error){
            console.error;
        }
    }

    //runs the getApiData function
    React.useEffect(() => {
        getApiData();
    }, [])


    //the design of each card display with all its info and select button
    const Item = (imgSrc, name, rarity, price, stock, selectionStateText) => {
        return(
            <View style={styles.itemView}>
                <Image source = {imgSrc} style={styles.imageContainer}/>
                <View style={styles.itemDetailsBox}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.rarityText}>{rarity}</Text>
                    <View style={styles.priceStockContainer}>
                        <Text style={styles.priceStockText}>{"$ " + {price}}</Text>
                        <Text style={styles.priceStockText}>{{stock} + " left"}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.selectionBox}>
                    {selectionStateText 
                    ?
                    <Text style={styles.selectionText}>{"Added"}</Text>
                    :
                    <Text style={styles.selectionText}>{"Add to Cart"}</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    //for the sticky header
    const scrollOffsetY = useRef(new Animated.Value(0)).current;


    return(
    <>
    <SafeAreaView style={{ ...styles.bgContainer, flex: 1 }} forceInset={{ top: 'always' }}>       
        <DynamicHeader animHeaderValue={scrollOffsetY} />
            <ScrollView
                style={{alignItems: 'center'}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                {useNativeDriver: false},
            )}>
                <FlatList
                    data = {data}
                    showsVerticalScrollIndicator = {false}
                    renderItem={({item}) => {
                        return(
                            <Item
                                imgSrc={item.cardmarket.url}
                                name={item.name}
                                rarity={item.rarity}
                                price={item.cardmarket.prices.averageSellPrice}
                                stock={item.set.total}
                                selectionStateText={item.isSelected}>
                            </Item>
                        )
                    }}
                    keyExtractor={item => item.id}
                /> 
            </ScrollView>
    </SafeAreaView> 

    

    </> 

    )


}

const styles = StyleSheet.create({
    itemView: {
        height: 500,
        width: 300,
        alignItems: 'center',
    },

    imageContainer: {
        height: 400,
        width: 200,
        borderRadius: 5,
    },

    itemDetailsBox: {
        height: 200,
        width: 300,
        marginTop: -50,
        backgroundColor: "white",
        shadowOffset: {
            width: 5,
            height: 10,},
        borderRadius: 20,
        alignItems: 'center',
    },

    selectionBox: {
        height: 50,
        width: 150,
        marginTop: -50,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    
    nameText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 75,
    },

    rarityText: {
        fontSize: 20,
        color: "blue",
        marginTop: 20,
    },

    priceStockContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },

    priceStockText: {
        fontSize: 26,
        flex: 1,
        color: "dark-grey",
    },

    selectionText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "white",
    },

    bgContainer: {
        flex: 1,
        backgroundColor: "grey",
    }
})

export default PokemonShopping;
