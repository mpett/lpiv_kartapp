/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import SplashScreen from './SplashScreen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

class WelcomeScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>
          Welcome Screen!
        </Text>
      </View>
    );
  }
}

class PracticeScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>
          Practice Screen!
        </Text>
      </View>
    );
  }
}

class ResultsScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>
          Results Screen!
        </Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>
          Settings Screen!
        </Text>
      </View>
    );
  }
}

class HighScoresScreen extends React.Component {
  render() {
    console.log("Test");
    return(
      <View>
        <Text>
          High Scores Screen!
        </Text>
      </View>
    );
  }
}



const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: WelcomeScreen
});

const HomeNavigator = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Practice: PracticeScreen,
  Results: ResultsScreen
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator
    },
    HighScores: {
      screen: HighScoresScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
});

const AppContainer = createAppContainer(InitialNavigator);


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}