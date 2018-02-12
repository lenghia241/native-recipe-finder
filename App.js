import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TextInput, Button,Image,Alert} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {foods: [], ingredients: ''};
  }

  getFoods = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingredients;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({foods: responseJson.results});
      })
      .catch((error) => { 
        Alert.alert(error); 
      });    
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <TextInput style={{fontSize: 18, width: 200}} placeholder='Ingredients' onChangeText={(ingredients) => this.setState({ingredients})} />
        <Button title="Find" onPress={this.getFoods} />
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id} 
          renderItem={({item}) =>
          <View>
          <Text style={{fontSize: 18}}>{item.title}, {item.thumbnail}</Text>
          <Image 
          style={{width: 66, height: 58}}
          source={{uri: item.thumbnail}}/>
          </View>       
        } data={this.state.foods} 
          ItemSeparatorComponent={this.listSeparator} />      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
