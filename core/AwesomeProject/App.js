/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import type { Region } from 'react-native-maps';

export interface LatLng {
  latitude: number;
  longitude: number
}

const SKÖVDE = {
  latitude: 58.3903,
  longitude: 13.8461,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const MARIESTAD = {
  latitude: 58.7101,
  longitude: 13.8213,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const TÖREBODA = {
  latitude: 58.7055,
  longitude: 14.1261,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const VÄSTRA_GÖTALAND = {
  latitude: 58.2528,
  longitude: 13.0596,
  latitudeDelta: 2.5,
  longitudeDelta: 2.5
};

type Props = {};
type State = { region: ?Region, }

export default class App extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { region: VÄSTRA_GÖTALAND };
  }

  // Button handlers
  _showSkövde = (): void => { this.setState({ region: SKÖVDE }) };
  _showMariestad = (): void => { this.setState({ region: MARIESTAD }) };
  _showTöreboda = (): void => { this.setState({ region: TÖREBODA }) };

  render() {
    return (
      <View style={ styles.container }>
        <MapView
          provider={ PROVIDER_GOOGLE }
          region={ this.state.region }
          style={ styles.mapViewContainer }>
        </MapView>

        <View style={ styles.buttonsContainer }>
          <Button title={ 'Skövde' } onPress={ this._showSkövde } />
          <Button title={ 'Mariestad' } onPress={ this._showMariestad } />
          <Button title={ 'Töreboda' } onPress={ this._showTöreboda } />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  mapViewContainer: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  }
});
