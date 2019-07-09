import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button, ThemeProvider, ListItem, Card, Icon } from 'react-native-elements';

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

const producer_list = [
  {
    name: 'Bossgårdens Grönsaker',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/90ygod4pqwuf0b2.jpg',
    type: 'Frukt och grönt'
  },
  {
    name: 'Stjärnegärdet Gourmet',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
    type: 'Bageri och spannmål'
  },
  {
    name: 'Ehrenhofers Lamm & Vilt',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/d6gq2vao23j7l45.jpg',
    type: 'Kött och chark'
  },
  {
    name: 'Qvänum Mat & Malt AB',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/m8f6urjy8hsyfe3.jpg',
    type: 'Dryck'
  },
  {
    name: 'Skeby Gårdar AB',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/e8vpvc8hycb74xc.jpg',
    type: 'Bageri och spannmål'
  },
  {
    name: 'Söråsen',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/fq3y7mhjj4c86j3.jpg',
    type: 'Fisk och skaldjur'
  },
  {
    name: 'Sommarhagens gårdsmejeri',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/ammj7islftlacgh.jpg',
    type: 'Mejeri'
  },
  {
    name: 'Torggummans ägg',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/lt7044o0kxpyp1m.png',
    type: 'Ägg'
  },
  {
    name: 'ÖstraGärde Gård',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/hfok6bdk49tm2nt.png',
    type: 'Frukt och grönt'
  },
  {
    name: 'Bärby självplock',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/m4nlu6p3nuacu48.png',
    type: 'Bageri och spannmål'
  },
  {
    name: 'Kullans Lycka',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/f2sf93ctvmd9mn7.jpg',
    type: 'Kött och chark'
  },
  {
    name: 'Honungshuset HB',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/37y4xju5cku7ae8.jpg',
    type: 'Honung'
  },
  {
    name: 'Claessons Charkuteri',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/g2za84wp4wb3sl4.png',
    type: 'Kött och chark'
  },
  {
    name: 'Dalis Gård',
    logo_url: 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
    type: 'Fisk och skaldjur'
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

class ProducerScreen extends React.Component {
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
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'finns ej');
    const logo_image = navigation.getParam('image', '404');

    return(
      <View>
        <Card
          title={JSON.stringify(otherParam)}
          image={{ uri: logo_image }}>
          <Text style={{marginBottom: 10}}>
            Här bör det stå något om {otherParam}.
          </Text>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
      </View>
    )
  }
}

class BusinessScreen extends React.Component {
  render() {
    return(
      <ScrollView>
        <View>
          {
            producer_list.map((l, i) => (
              <ListItem 
                onPress = {() => {
                  // Navigate to details route with parameter
                  this.props.navigation.navigate('Producer', {
                    itemId: 86,
                    otherParam: l.name,
                    image: l.logo_url,
                  });
                }}
                key={i}
                leftAvatar={{ source: { uri: l.logo_url } }}
                title={l.name}
                subtitle={l.type}
              />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return(
      <ScrollView>
        <View>
          <Card
            title='HELLO WORLD'
            image={{ uri: 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg' }}>
            <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW' />
          </Card>
          <Button 
            onPress={() => this.props.navigation.goBack()}
            title="Hej då"
          />
        </View>
      </ScrollView>
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
    Producer: {
      screen: ProducerScreen,
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
