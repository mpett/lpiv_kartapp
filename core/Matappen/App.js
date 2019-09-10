/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import { View, Text, Image, StyleSheet, ScrollView, FlatList, Platform, ImageBackground, TouchableOpacity, StatusBar } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, ListItem, SearchBar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient'
import Geolocation from '@react-native-community/geolocation';

import { Buffer } from 'buffer';

import type { Region } from 'react-native-maps';

const App = () => {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default App;
