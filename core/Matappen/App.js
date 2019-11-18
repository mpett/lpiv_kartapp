import React, {Component} from 'react';
import {View, Image, StyleSheet, ScrollView, FlatList, Platform, ImageBackground, TouchableOpacity, StatusBar, Dimensions, SafeAreaView, Linking} from 'react-native';
import { createAppContainer, NavigationActions, StackActions, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, ListItem, SearchBar, Header, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import Geolocation from '@react-native-community/geolocation';

import { Text } from "native-base";
import Polyline from "@mapbox/polyline";

import { Buffer } from 'buffer';

import type { Region } from 'react-native-maps';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export interface LatLng {
  latitude: number;
  longitude: number
}

const VÄSTRA_GÖTALAND = {
  latitude: 58.2528,
  longitude: 12.77,
  latitudeDelta: 3.2,
  longitudeDelta: 3.2
};

console.disableYellowBox = true;

start_list = []; producer_list = [];
full_producer_list = producer_list;

class SingleMapScreen extends Component {

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const lat_param = navigation.getParam('lat', '0.0');
    const long_param = navigation.getParam('long', '0.0');
    const name_parameter = navigation.getParam('name', "Producent AB")
    const latitude_parameter = parseFloat(lat_param);
    const longitude_parameter = parseFloat(long_param);
    const cord_params = latitude_parameter + "," + longitude_parameter;

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:latitude_parameter,
      cordLongitude:longitude_parameter,
      cordString: cord_params,
      name: name_parameter
    };

    this.mergeLot = this.mergeLot.bind(this);
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

  mergeLot() {
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, this.state.cordString);
       });
     }
   }

   async getDirections(startLoc, destinationLoc) {
      try {
          let resp = await fetch(
              `https://maps.googleapis.com/maps/api/directions/json?origin=
            ${ startLoc }&destination=${ destinationLoc }
            &key=${ "AIzaSyAQTzaFD-IjWN1V9RkHVwx---QVX4e8F8A" }`
          )
          let respJson = await resp.json();
          //console.error(respJson);
          let points = Polyline.decode(
            respJson.routes[0]
            .overview_polyline.points);
          let coords = points.map((point, index) => {
              return  {
                  latitude : point[0],
                  longitude : point[1]
              }
          })
          this.setState({coords: coords})
          this.setState({x: "true"})
          return coords
      } catch(error) {
          this.setState({x: "error"})
          return error
      }
  }

  render() {
    const marker_image = require('./lpiv_pin_29_44.png');

    const bottomViewStyles = {
      width: "100%",
      height: 60,
      backgroundColor: "rgba(255, 255, 255, 0)",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      flexDirection: 'row', flexWrap: 'wrap',
      marginTop: 5
    }

    return (
      <View style = { single_styles.container }>
        <MapView 
          provider={PROVIDER_GOOGLE} style={single_styles.map} 
          initialRegion={VÄSTRA_GÖTALAND} >

        {!!this.state.latitude && !!this.state.longitude && 
          <MapView.Marker
            coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
            color= "#446f6d"
            title={"Du är här"}
          />}

        {!!this.state.cordLatitude && !!this.state.cordLongitude && 
          <MapView.Marker
            coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
            title={this.state.name} image={marker_image}
          />}

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && 
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="#446f6d"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && 
          <MapView.Polyline
            coordinates={[
                {latitude: this.state.latitude, longitude: this.state.longitude},
                {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
            ]}
            strokeWidth={2}
            strokeColor="#446f6d"/>
        }
        </MapView>

        <View style = {bottomViewStyles}>
          <View style = {{ marginRight: 15 }}>
            <Button title="Gå tillbaka" buttonStyle = {{backgroundColor: "#446f6d"}}
              onPress = { () => { this.props.navigation.goBack() } }
            ></Button>
          </View>
          
          <Button title="Utförlig vägbeskrivning" buttonStyle = {{backgroundColor: "#446f6d"}} 
            onPress = { () => {
              const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
              const latLng = `${this.state.cordLatitude},${this.state.cordLongitude}`;
              const label = 'Custom Label';
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`
              });
              Linking.openURL(url); 
            }} > 
          </Button>

          <SafeAreaView />
        </View>
      </View>
    );
  }
}

const single_styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { region: VÄSTRA_GÖTALAND };
  }

  renderMarkers() {
    const marker_image = require('./lpiv_pin_16_24.png');
    
    return producer_list.map((location, key) => {

      return (
          <MapView.Marker coordinate = {{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude)
          }} key={key} image={marker_image}>
            <MapView.Callout onPress = {() => {
                  // Navigate to details route with parameter
                  this.props.navigation.navigate('Producer', {
                    itemId: 86,
                    otherParam: location.business_name,
                    desc: location.description,
                    image: location.logo_url,
                    cover: location.cover_image_url,
                    lat: location.latitude,
                    long: location.longitude,
                    direction: location.map_direction_link,
                    adress: location.visiting_adress,
                    name: location.business_name,
                    adress: location.visiting_adress,
                    contact_person: location.contact_person,
                    producer_city: location.city,
                    producer_email: location.email,
                    producer_phone: location.phone,
                    producer_website: location.website,
                    opening_hours: location.opening_hours
                  });
                }} >
              <View>
                <Text>{location.business_name}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
      );
    })
  }

  render() {
    function success(p) {
      position = p;
    }

    function error(msg) {
      message = msg;
    }

    Geolocation.getCurrentPosition(success, error);

    return (
      <View style={ styles.container }>
        <HideStatusBar />
          <MapView
            provider={ PROVIDER_GOOGLE }
            region={ this.state.region }
            showsUserLocation={true}
            style={ styles.mapViewContainer }>

            {
              this.renderMarkers()
            }
            
          </MapView>
        <MenuScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

class ConnectedProducers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  search = text => {};

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url }, justifyContent: 'center' }}
      title={item.business_name.slice(0, 40)}
      titleStyle = {{ color: 'black', fontWeight: 'bold' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 0,
        marginRight: 0, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 60,
        borderWidth: 1,
        borderColor: '#f2f2f2'
      }}

      onPress = {() => {
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name,
          adress: item.visiting_adress,
          contact_person: item.contact_person,
          producer_city: item.city,
          producer_email: item.email,
          producer_phone: item.phone,
          producer_website: item.website,
          opening_hours: item.opening_hours,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2
        });
      }} 
    />
  )

  componentDidMount() {
    const { navigation } = this.props;

    const connected_producer_list = navigation.getParam("connected_producer_list", []);

    this.SetList(connected_producer_list);
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  SetList(list) {
    this.setState(
      {
        isLoading: false,
        dataSource: list,
      },
      function() {
        this.arrayholder = list;
      }
    );
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    return(
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <View style={{marginTop: 105}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 45, marginBottom: 20}}>
            <Text style={descriptionStyles}>Anslutna Producenter</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sök bland alla producenter...</Text>
          </View>
        <View>
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
          </View>
        </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: screenHeight * 0.1 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
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
    const description = navigation.getParam('desc', 'Ingen beskrivning');
    const logo_image = navigation.getParam('image', '404');
    const background = navigation.getParam('cover', '404');
    const latitude = navigation.getParam('lat', '58.2528');
    const longitude = navigation.getParam('long', '12.77');
    const producer_adress = navigation.getParam('adress', 'Kogatan 12 Timmersdala 15623');
    const contact_person = navigation.getParam('contact_person', 'Anders Svensson');
    const producer_city = navigation.getParam('producer_city', 'Tidaholm');
    const producer_email = navigation.getParam('producer_email', 'anders@gmail.com');
    const producer_phone = navigation.getParam('producer_phone', '0705727004');
    const producer_website = navigation.getParam('producer_website', 'https://www.example.com');
    const producer_name = navigation.getParam("name", "Producent AB");
    const opening_hours = navigation.getParam("opening_hours", "00:00 - 23:00 torsdag - lördag")
    const matfest = navigation.getParam("matfest", false);
    const lpiv = navigation.getParam("lpiv", false);
    
    var category_string = "";

    if (matfest) {
      category_string += "Matfest ";
    }

    if (lpiv) {
      category_string += "LPIV ";
    }

    return(
      <View>
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}}>
          <ImageBackground source={{ uri: background }} style={{width: '100%', height: '100%'}}>
            <HideStatusBar />
            <ScrollView>
              <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 100, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 200 }}>
                <ScrollView>
                  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Image
                      source={ { uri: logo_image }}
                      style={{ width: 300, height: 100, flex: 1, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 15
                  }}>
                    <Text style={{fontWeight: 'bold'}}>{producer_name}</Text>
                    <Text style={{marginBottom: 20, marginTop: 5}}>{description}</Text>
                  </View>
                  <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 15,
                  }}>
                    <Text style={{fontWeight: 'bold'}}>Kontaktuppgifter</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Besöksadress: {producer_adress}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Kontaktperson: {contact_person}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Besöksort: {producer_city}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>E-post: {producer_email}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Telefon: {producer_phone}</Text>
                    <Text style={{marginBottom: 17, marginTop: 2}}>Webbsida: {producer_website}</Text>
                  </View>

                  <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 15,
                  }}>
                    <Text style={{fontWeight: 'bold'}}>Kategorier</Text>
                    <Text style={{marginBottom: 17, marginTop: 2}}>{category_string}</Text>
                  </View>
                  
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Öppettider</Text>
                    <Text style={{marginBottom: 20, marginTop: 5}}>{opening_hours}</Text>
                  </View>
                  <Button
                    backgroundColor='#37503c'
                    buttonStyle={{borderRadius: 5, marginLeft: 40, marginRight: 40, marginBottom: 0, marginTop: 20, backgroundColor: "#446f6d"}}
                    title='Hitta oss på kartan'
                    onPress = {() => {
                      this.props.navigation.navigate('Map', {
                        lat: latitude,
                        long: longitude,
                        adress: producer_adress,
                        name: producer_name
                      })}}
                    />
                </ScrollView>
              </View>
            </ScrollView>
          </ImageBackground>
        </ImageBackground>
        <MenuScreen navigation={this.props.navigation} />
      </View> 
    )
  }
}

class EventScreen extends React.Component {
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
    const description = navigation.getParam('desc', 'Ingen beskrivning');
    const logo_image = navigation.getParam('image', '404');
    const background = navigation.getParam('cover', '404');
    const latitude = navigation.getParam('lat', '58.2528');
    const longitude = navigation.getParam('long', '12.77');
    const producer_adress = navigation.getParam('adress', 'Kogatan 12 Timmersdala 15623');
    const contact_person = navigation.getParam('contact_person', 'Anders Svensson');
    const producer_city = navigation.getParam('producer_city', 'Tidaholm');
    const producer_email = navigation.getParam('producer_email', 'anders@gmail.com');
    const producer_phone = navigation.getParam('producer_phone', '0705727004');
    const producer_website = navigation.getParam('producer_website', 'https://www.example.com');
    const producer_name = navigation.getParam("name", "Producent AB");
    const opening_hours = navigation.getParam("opening_hours", "00:00 - 23:00 torsdag - lördag")
    const matfest = navigation.getParam("matfest", false);
    const lpiv = navigation.getParam("lpiv", false);

    const connected_producer_list = navigation.getParam("connected_producers", []);
    
    var category_string = "";

    if (matfest) {
      category_string += "Matfest ";
    }

    if (lpiv) {
      category_string += "LPIV ";
    }

    return(
      <View>
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}}>
          <ImageBackground source={{ uri: background }} style={{width: '100%', height: '100%'}}>
            <HideStatusBar />
            <ScrollView>
              <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 100, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 200 }}>
                <ScrollView>
                  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Image
                      source={ { uri: logo_image }}
                      style={{ width: 300, height: 100, flex: 1, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 15
                  }}>
                    <Text style={{fontWeight: 'bold'}}>{producer_name}</Text>
                    <Text style={{marginBottom: 20, marginTop: 5}}>{description}</Text>
                  </View>
                  <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 15,
                  }}>
                    <Text style={{fontWeight: 'bold'}}>Kontaktuppgifter</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Besöksadress: {producer_adress}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Kontaktperson: {contact_person}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Besöksort: {producer_city}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>E-post: {producer_email}</Text>
                    <Text style={{marginBottom: 2, marginTop: 2}}>Telefon: {producer_phone}</Text>
                    <Text style={{marginBottom: 17, marginTop: 2}}>Webbsida: {producer_website}</Text>
                  </View>

                  <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 15,
                  }}>
                    <Text style={{fontWeight: 'bold'}}>Kategorier</Text>
                    <Text style={{marginBottom: 17, marginTop: 2}}>{category_string}</Text>
                  </View>
                  
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Öppettider</Text>
                    <Text style={{marginBottom: 20, marginTop: 5}}>{opening_hours}</Text>
                  </View>
                  <Button
                    backgroundColor='#37503c'
                    buttonStyle={{borderRadius: 5, marginLeft: 40, marginRight: 40, marginBottom: 0, marginTop: 20, backgroundColor: "#446f6d"}}
                    title='Anslutna producenter'
                    onPress = {() => {
                      // Navigate to details route with parameter
                      this.props.navigation.navigate('Connected', {
                        lat: latitude,
                        long: longitude,
                        adress: producer_adress,
                        name: producer_name,
                        connected_producer_list: connected_producer_list
                      })}}
                    />
                </ScrollView>
              </View>
            </ScrollView>
          </ImageBackground>
        </ImageBackground>
        <MenuScreen navigation={this.props.navigation} />
      </View> 
    )
  }
}

class EventListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v2/eventlist', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }

  search = text => {};

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_image_url }, justifyContent: 'center' }}
      title={item.event_name.slice(0, 40)}
      titleStyle = {{ color: 'black', fontWeight: 'bold' }}
      subtitle={item.event_sub_title}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 0,
        marginRight: 0, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 60,
        borderWidth: 1,
        borderColor: '#f2f2f2'
      }}

      onPress = {() => {
        this.props.navigation.navigate('Event', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name,
          adress: item.visiting_adress,
          contact_person: item.contact_person,
          producer_city: item.city,
          producer_email: item.email,
          producer_phone: item.phone,
          producer_website: item.website,
          opening_hours: item.opening_hours,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2,
          connected_producers: item.connected_producers
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    return(
      <ImageBackground source={require('./field2.png')} style={viewStyles}>
        <View style={{marginTop: 105}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 45, marginBottom: 20}}>
            <Text style={descriptionStyles}>Event</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sök bland alla producenter...</Text>
          </View>
        <View>
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
          </View>
        </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: 380 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v2/globallist', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }  

  search = text => {};

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url }, justifyContent: 'center' }}
      title={item.business_name.slice(0, 40)}
      titleStyle = {{ color: 'black', fontWeight: 'bold' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 0,
        marginRight: 0, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 60,
        borderWidth: 1,
        borderColor: '#f2f2f2'
      }}

      onPress = {() => {
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name,
          adress: item.visiting_adress,
          contact_person: item.contact_person,
          producer_city: item.city,
          producer_email: item.email,
          producer_phone: item.phone,
          producer_website: item.website,
          opening_hours: item.opening_hours,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    return(
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <View style={{marginTop: 105}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 45, marginBottom: 20}}>
            <Text style={descriptionStyles}>Sök</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sök bland alla producenter...</Text>
          </View>
        <View>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText = {text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            placeholder="Sök..."
            value={this.state.search}
            width="100%"
            lightTheme = {true}
          />
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
          </View>
        </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: 380 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class FoodListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v2/producerlist/1', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }  

  search = text => {};

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url }, justifyContent: 'center' }}
      title={item.business_name.slice(0, 40)}
      titleStyle = {{ color: 'black', fontWeight: 'bold' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 0,
        marginRight: 0, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.75)',
        height: 60,
      }}

      onPress = {() => {
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name,
          adress: item.visiting_adress,
          contact_person: item.contact_person,
          producer_city: item.city,
          producer_email: item.email,
          producer_phone: item.phone,
          producer_website: item.website,
          opening_hours: item.opening_hours,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  CategoryFilterFunction(category_type) {
    if (category_type === "matfest") {
      const newData = this.arrayholder.filter(
        e => e.producer_category_1 === true
      );
      this.setState({
        dataSource: newData
      });
    } else if (category_type === "medlem") {
      const newData = this.arrayholder.filter(
        e => e.producer_category_2 === true
      );
      this.setState({
        dataSource: newData
      });
    }
  }

  Distance(lat1, long1, lat2, long2) {
    var d = Math.sqrt(Math.pow(lat2 - lat1, 2) 
                  + Math.pow(long2 - long1, 2));
    return d;
  }

  NearbyProducers() {
    const geo_lat = 58.3903;
    const geo_long = 13.8461;
    
    const newData = this.arrayholder.sort((a, b) => {
      const latA = a.latitude;
      const longA = a.longitude;
      const latB = b.latitude;
      const longB = b.longitude;
    
      const distanceA = 
        this.Distance(geo_lat, geo_long, 
                              latA, longA);
      const distanceB = 
        this.Distance(geo_lat, geo_long, 
                              latB, longB);
    
      if (distanceA > distanceB) {
        return 1;
      } else {
        return -1;
      }

    });
    this.setState({
      dataSource: newData
    });
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    //const store_type = this.props.navigation.dangerouslyGetParent().getParam("store_type");

    return(
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <HideStatusBar />
        <View style={{marginTop: 80}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 65}}>
            <Text style={descriptionStyles}>{"Äta2"}</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sortera efter avstånd...</Text>
          </View>
          <View>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
                <Button
                  backgroundColor='black'
                  buttonStyle={{borderRadius: 5, width: 270, backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}}
                  title='Producenter nära mig'
                  onPress = {() => {
                  // Navigate to details route with parameter
                  this.NearbyProducers()}}
                />
            </View>
          </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              //ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: screenHeight * 0.1 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class StoreListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v2/producerlist/3', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }  

  search = text => {};

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url }, justifyContent: 'center' }}
      title={item.business_name.slice(0, 40)}
      titleStyle = {{ color: 'black', fontWeight: 'bold' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 0,
        marginRight: 0, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.75)',
        height: 60,
      }}

      onPress = {() => {
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name,
          adress: item.visiting_adress,
          contact_person: item.contact_person,
          producer_city: item.city,
          producer_email: item.email,
          producer_phone: item.phone,
          producer_website: item.website,
          opening_hours: item.opening_hours,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  CategoryFilterFunction(category_type) {
    if (category_type === "matfest") {
      const newData = this.arrayholder.filter(
        e => e.producer_category_1 === true
      );
      this.setState({
        dataSource: newData
      });
    } else if (category_type === "medlem") {
      const newData = this.arrayholder.filter(
        e => e.producer_category_2 === true
      );
      this.setState({
        dataSource: newData
      });
    }
  }

  Distance(lat1, long1, lat2, long2) {
    var d = Math.sqrt(Math.pow(lat2 - lat1, 2) 
                  + Math.pow(long2 - long1, 2));
    return d;
  }

  NearbyProducers() {
    const geo_lat = 58.3903;
    const geo_long = 13.8461;
    
    const newData = this.arrayholder.sort((a, b) => {
      const latA = a.latitude;
      const longA = a.longitude;
      const latB = b.latitude;
      const longB = b.longitude;
    
      const distanceA = 
        this.Distance(geo_lat, geo_long, 
                              latA, longA);
      const distanceB = 
        this.Distance(geo_lat, geo_long, 
                              latB, longB);
    
      if (distanceA > distanceB) {
        return 1;
      } else {
        return -1;
      }

    });
    this.setState({
      dataSource: newData
    });
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    //const store_type = this.props.navigation.dangerouslyGetParent().getParam("store_type");

    return(
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <HideStatusBar />
        <View style={{marginTop: 80}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 65}}>
            <Text style={descriptionStyles}>{"Gårdsbutik2"}</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sortera efter avstånd...</Text>
          </View>
          <View>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
                <Button
                  backgroundColor='black'
                  buttonStyle={{borderRadius: 5, width: 270, backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}}
                  title='Producenter nära mig'
                  onPress = {() => {
                  // Navigate to details route with parameter
                  this.NearbyProducers()}}
                />
            </View>
          </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              //ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: screenHeight * 0.1 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class ProducerListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v2/producerlist/2', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }  

  search = text => {};

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url }, justifyContent: 'center' }}
      title={item.business_name.slice(0, 40)}
      titleStyle = {{ color: 'black', fontWeight: 'bold' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 0,
        marginRight: 0, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.75)',
        height: 60,
      }}

      onPress = {() => {
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name,
          adress: item.visiting_adress,
          contact_person: item.contact_person,
          producer_city: item.city,
          producer_email: item.email,
          producer_phone: item.phone,
          producer_website: item.website,
          opening_hours: item.opening_hours,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  CategoryFilterFunction(category_type) {
    if (category_type === "matfest") {
      const newData = this.arrayholder.filter(
        e => e.producer_category_1 === true
      );
      this.setState({
        dataSource: newData
      });
    } else if (category_type === "medlem") {
      const newData = this.arrayholder.filter(
        e => e.producer_category_2 === true
      );
      this.setState({
        dataSource: newData
      });
    }
  }

  Distance(lat1, long1, lat2, long2) {
    var d = Math.sqrt(Math.pow(lat2 - lat1, 2) 
                  + Math.pow(long2 - long1, 2));
    return d;
  }

  NearbyProducers() {
    const geo_lat = 58.3903;
    const geo_long = 13.8461;
    
    const newData = this.arrayholder.sort((a, b) => {
      const latA = a.latitude;
      const longA = a.longitude;
      const latB = b.latitude;
      const longB = b.longitude;
    
      const distanceA = 
        this.Distance(geo_lat, geo_long, 
                              latA, longA);
      const distanceB = 
        this.Distance(geo_lat, geo_long, 
                              latB, longB);
    
      if (distanceA > distanceB) {
        return 1;
      } else {
        return -1;
      }

    });
    this.setState({
      dataSource: newData
    });
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    const store_type = this.props.navigation.dangerouslyGetParent().getParam("store_type");

    return(
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <HideStatusBar />
        <View style={{marginTop: 80}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 65}}>
            <Text style={descriptionStyles}>{"Producent2"}</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sortera efter avstånd...</Text>
          </View>
          <View>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
                <Button
                  backgroundColor='black'
                  buttonStyle={{borderRadius: 5, width: 270, backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}}
                  title='Producenter nära mig'
                  onPress = {() => {
                  // Navigate to details route with parameter
                  this.NearbyProducers()}}
                />
            </View>
          </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              //ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: 342 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '', descColor: '#282828', descShadow: 'rgba(255, 255, 255, 0.85)', descTitle: 'Västsvenska\nMatappen', dField: require('./field2.png'), dLogo: require('./menu_icons3/1t.png'), dFontSize: 27 };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v1/producerlist', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
          producer_list = responseJson;
          full_producer_list = producer_list;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }  

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34',
      },
      { backgroundColor: '#827c34' }
    ];

    var field = this.state.dField;
    var logo = this.state.dLogo;
    
    return (
      <View style={styles.container}>
        <HideStatusBar />
        <RenderHeader navigation={this.props.navigation} />
          <ImageBackground source={field} style={{width: '100%', height: '100%'}} style={viewStyles}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Äta", {store_type:"Äta"})}}>
              <Image
                source={require('./menu_icons4/äta.png')}
                style={{ marginBottom: 50, marginTop: 0, width: 314, height: 114,
                  borderColor: '#99994d' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Handla", {store_type:"Gårdsbutik"})}}>
              <Image
                source={require('./menu_icons4/handla.png')}
                style={{ width: 314, height: 114, marginBottom: 50, 
                  borderColor: '#99994d' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Fika", {store_type:"Producent"})}}>
              <Image
                source={require('./menu_icons4/hitta.png')}
                style={{ width: 314, height: 114, marginBottom: 100, 
                  borderColor: '#99994d' }}
              />
            </TouchableOpacity>
          <MenuScreen navigation={this.props.navigation} />
        </ImageBackground>
      </View>
    );
  }
}

class RenderHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
          placement="left"
          leftComponent={<Avatar
            small
            rounded
            source={require("./logo-transparent.png")}
            activeOpacity={1.0}
        />}
          centerComponent={{ text: 'Västsvenska Matappen', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={<Avatar
            small
            rounded
            source={require("./search.png")}
            onPress={() => {this.props.navigation.navigate("Sök")}}
            activeOpacity={1.0}
        />}
          statusBarProps={{ barStyle: 'light-content' }}
          containerStyle={{
            backgroundColor: '#282828',
            justifyContent: 'space-around',
            marginTop: -25,
            height: 75
          }
        }
      />
    )
  }
}

class HideStatusBar extends React.Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor="#b3e6ff" barStyle="light-content" />  
        <View>  
          <StatusBar hidden={true} />  
        </View>  
      </View>
    )
  }
}

class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '', dStart: require('./menu_icons/start.png'), dAta: require('./menu_icons/äta.png'), dProducent: require('./menu_icons/producent.png'), dGardsbutik: require('./menu_icons2/Hem.png'), dKarta: require('./menu_icons2/Karta.png'), dSok: require('./menu_icons2/Event.png') };
    this.arrayholder = [];
  }

  ResetStack() {
  }

  StoreCategoryFilterFunction(store_type) {
    tmp_producer_list = full_producer_list;    

    if (store_type === "Äta") {
      const newData = tmp_producer_list.filter(
        e => e.producer_store_category_1 === true
      );
      tmp_producer_list = newData;
    } else if (store_type === "Producent") {
      const newData = tmp_producer_list.filter(
        e => e.producer_store_category_2 === true
      );
      tmp_producer_list = newData;
    } else if (store_type === "Gårdsbutik") {
      const newData = tmp_producer_list.filter(
        e => e.producer_store_category_3 === true
      );
      tmp_producer_list = newData;
    }

    producer_list = tmp_producer_list
  }

  render() {
    const bottomViewStyles = {
      width: "100%",
      height: 60,
      backgroundColor: "rgba(40,40,40, 1.0)",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      flexDirection: 'row', flexWrap: 'wrap',
      marginTop: 5
    }
  
    const iconStyles = {
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      height: 30, 
      width: 30, 
      marginRight: 25,
      marginTop: 10
    }

    return (
      <View style = {bottomViewStyles}>
        <TouchableOpacity onPress={() => {this.StoreCategoryFilterFunction("Start"), this.props.navigation.navigate("Start")}}>
          <Image source={this.state.dGardsbutik} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.ResetStack(), this.props.navigation.navigate("EventScreen")}}>
          <Image source={this.state.dSok} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.StoreCategoryFilterFunction("Karta"), this.props.navigation.navigate("Karta")}}>
          <Image source={this.state.dKarta} style={{ flexDirection: 'row', flexWrap: 'wrap', height: 30, width: 30, marginTop: 10, marginRight: 0 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const SearchStack = createStackNavigator(
  {
    ProducerList: {
      screen: SearchScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const EventSwitch = createSwitchNavigator({
  ProducerList: {
    screen: EventListScreen,
    navigationOptions: {
      header: null,
    }
  },
  Event: {
    screen: EventScreen,
    navigationOptions: {
      header: null,
    }
  },
  Map: {
    screen: SingleMapScreen,
    navigationOptions: {
      header: null,
    }
  },
  Connected: {
    screen: ConnectedProducers,
    navigationOptions: {
      header:null
    }
  },
  Producer: {
    screen: ProducerScreen,
    navigationOptions: {
      header: null,
    }
  },
},

{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    initialRouteName: 'ProducerList'
  },  
},
{headerMode: 'screen'}

);

const EventStack = createStackNavigator(
  {
    ProducerList: {
      screen: EventListScreen,
      navigationOptions: {
        header: null,
      }
    },
    Event: {
      screen: EventScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    },
    Connected: {
      screen: ConnectedProducers,
      navigationOptions: {
        header:null
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    
        
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      initialRouteName: 'ProducerList'
    },  
  },
  {headerMode: 'screen'}
)

const FoodStack = createStackNavigator(
  {
    FoodList: {
      screen: FoodListScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const StoreStack = createStackNavigator(
  {
    StoreList: {
      screen: StoreListScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const ProducerStack = createStackNavigator(
  {
    ProducerList: {
      screen: ProducerListScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const MapStack = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const TabNavigator = createBottomTabNavigator(
  {
    Start: {
      screen: SplashScreen,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Äta: {
      screen: FoodStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Fika: {
      screen: ProducerStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Handla: {
      screen: StoreStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Karta: {
      screen: MapStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Sök: {
      screen: SearchStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    EventS: {
      screen: EventSwitch,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    EventScreen: {
      screen: EventListScreen,
      navigationOptions: {
        tabBarVisible: false
      }
    },

  },
  {
    tabBarOptions: {
      backgroundColor: 'black',
      height: -5,
      labelStyle: {
        fontSize: 0,
      },
      style: {
        backgroundColor: 'black',
        height: -5,
        tabBarVisible: false
      },
    }
  },
)

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  mapViewContainer: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 30 : 0
  },
  textStyle: {
    padding: 10,
  },
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
