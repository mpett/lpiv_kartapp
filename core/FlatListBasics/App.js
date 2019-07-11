/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { SearchBar, ListItem } from 'react-native-elements';

const rows = [
  {id: 0, text: 'View'},
  {id: 1, text: 'Text'},
  {id: 2, text: 'Image'},
  {id: 3, text: 'ScrollView'},
  {id: 4, text: 'ListView'},
]

const extractKey = ({ id }) => id.toString()

export default class App extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    console.log("update search");
    this.setState({ search });
  };

  renderItem = ({ item }) => {
    return (
      <Text style={styles.row}>
        {item.text}
      </Text>
    )
  }

  renderHeader = () => {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here"
        lightTheme
        round
        onChangeText={text => this.updateSearch()}
        autoCorrect={false}
        value={this.state}
      />
    );
  };

  render() {
    return (
        <FlatList 
            style={styles.container}
            data={rows}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
            ListHeaderComponent={this.renderHeader}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
})
