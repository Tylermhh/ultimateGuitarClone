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

const HomePage = ({navigation}) => {
  const [id, setId] = React.useState('');
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const getApiData = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const json = await response.json();
      setData(json);
      // console.log(data)
    } catch (error) {
      console.error();
    }
  };

  React.useEffect(() => {
    getApiData();
  }, []);

  const filterData = searchFilter => {
    let filtered = data.filter(item => 
      item.id == searchFilter
    );
    setFilteredData(filtered);

    // const filtered = data.map((item) => {
    //   item.category
    // }).filter((i) => {
    //   return i == {searchFilter};
    // });

    console.log('filtered by ', searchFilter, ': ', filtered);
  };

  return (
    // <TabBarContainer/>

    <>
      <View style={styles.bgContainer}>
        <TextInput
          style={styles.searchbar}
          // keyboardType='number-pad'
          placeholder="Category"
          placeholderTextColor={'white'}
          onChangeText={input => setId(input)}
          value={id}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            filterData(id);
          }}>
          <Text>Click to Search</Text>
        </TouchableOpacity>

        <SafeAreaView>
          {
            filteredData.length > 0
            ?
            <ScrollView>
            {filteredData.map(i => (
              <View style={styles.itemContainer}>
                <Image src={i.image} style={styles.image} />
                <Text style={styles.itemText}>{i.title}</Text>
                <Text style={styles.itemText}>{i.description}</Text>
                <Text style={styles.itemText}>{'Price: ' + i.price}</Text>
                <Text style={styles.itemText}>
                  {'Rating: ' + i.rating.rate + ' (' + i.rating.count + ')'}
                </Text>
              </View>
            ))}
          </ScrollView>
            :
            <ScrollView>
            {data.map(i => (
              <View style={styles.itemContainer}>
                <Image src={i.image} style={styles.image} />
                <Text style={styles.itemText}>{i.title}</Text>
                <Text style={styles.itemText}>{i.description}</Text>
                <Text style={styles.itemText}>{'Price: ' + i.price}</Text>
                <Text style={styles.itemText}>
                  {'Rating: ' + i.rating.rate + ' (' + i.rating.count + ')'}
                </Text>
              </View>
            ))}
          </ScrollView>
          }
          
        </SafeAreaView>

        <View style={styles.bottomBar}></View>
      </View>
    </>
  );
};

const myTabBar = () => {};

const styles = StyleSheet.create({
  bgContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },

  bottomBar: {
    marginTop: 'auto',
    height: '10%',
    width: '100%',
    backgroundColor: '#262626',
    verticalAlign: 'bottom',
    borderTopColor: 'black',
    borderTopWidth: 3,
  },

  searchbar: {
    borderColor: 'white',
    backgroundColor: '#595959',
    borderRadius: 20,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },

  searchButton: {
    borderColor: 'white',
    backgroundColor: '#595959',
    borderRadius: 20,
    alignSelf: 'center',
    width: '30%',
    height: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  image: {
    width: 300,
    height: 400,
    marginBottom: 10,
  },

  itemContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  itemText: {
    marginBottom: 10,
  },
});

export default HomePage;
