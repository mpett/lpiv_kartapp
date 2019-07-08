import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button, ThemeProvider, ListItem } from 'react-native-elements';

import type { Region } from 'react-native-maps';

export interface LatLng {
  latitude: number;
  longitude: number
}

let locations = new Array();

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

const GÖTEBORG = {
  latitude: 57.7089,
  longitude: 11.9746,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const LIDKÖPING = {
  latitude: 58.5035,
  longitude: 13.1571,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const TROLLHÄTTAN = {
  latitude: 58.2835,
  longitude: 12.2858,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const BORÅS = {
  latitude: 57.7210,
  longitude: 12.9398,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};

const VÄSTRA_GÖTALAND = {
  latitude: 58.2528,
  longitude: 13.0596,
  latitudeDelta: 2.5,
  longitudeDelta: 2.5
};

locations.push(SKÖVDE); locations.push(MARIESTAD); locations.push(TÖREBODA); 
locations.push(GÖTEBORG); locations.push(LIDKÖPING); locations.push(TROLLHÄTTAN); 
locations.push(BORÅS); 

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

type Props = {};
type State = { region: ?Region, }

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./tivala.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="green"
        />
      ),
      // headerTitle instead of title
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button  
          onPress = {
            navigation.getParam('increaseCount')
          }
          title = "Knapp + 1"
          color = "green"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {    
    this.setState({ count: this.state.count + 1 });
    
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detta är hemskärmen</Text>
        <Button 
          title = "Gå till detaljskärmen"
          onPress = {() => {
            // Navigate to details route with parameter
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'En strängparameter.'
            });
          }}
        />
      </View>
    );
  }
}

class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { region: VÄSTRA_GÖTALAND };
  }

  renderMarkers() {
    return locations.map((location, key) => {
      return (
        <Marker coordinate = {{
          latitude: location.latitude,
          longitude: location.longitude
        }} key={key}>
        </Marker>
      );
    } )
  }

  render() {
    return (
      <View style={ styles.container }>
        <MapView
          provider={ PROVIDER_GOOGLE }
          region={ this.state.region }
          style={ styles.mapViewContainer }>

          {
            this.renderMarkers()
          }
          
        </MapView>
      </View>
    );
  }
}

class BusinessScreen extends React.Component {
  render() {
    return(
      <View>
        {
          list.map((l, i) => (
            <ListItem 
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Text style={{ fontSize: 30 }}>
          Detta är en modal!
        </Text>
        <Button 
          onPress={() => this.props.navigation.goBack()}
          title="Hej då"
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'Detaljskärm med parameter.',
      // These values are used instead of the shared configuration
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    // Get the parameter, provide a fallback value if it is not available.

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'finns ej');

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detta är detaljskärmen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button 
          title = "Gå till detaljskärmen igen"
          onPress = {() => this.props.navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })}
        />
        <Button 
          title = "Gå hem"
          onPress = {() => this.props.navigation.navigate('Home')}
        />
        <Button 
          title = "Gå tillbaka"
          onPress = {() => this.props.navigation.goBack()}
        />
        <Button 
          title = "Uppdatera titeln"
          onPress = {() => this.props.navigation.setParams({ otherParam: 'Uppdaterad!' })}
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Äta: {
      screen: RootStack,
    },
    Fika: {
      screen: MapScreen,
    },
    Handla: {
      screen: BusinessScreen,
    },
  }
)

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  mapViewContainer: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  }
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
