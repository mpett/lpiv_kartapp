import React, {Component, useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView, FlatList, Platform, ImageBackground, TouchableOpacity, StatusBar, Dimensions, SafeAreaView, Linking, Alert} from 'react-native';
import { createAppContainer, NavigationActions, StackActions, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, ListItem, SearchBar, Header, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import Geolocation from '@react-native-community/geolocation';
import SplashScreen from "react-native-splash-screen";

import { Text } from "native-base";
import Polyline from "@mapbox/polyline";

import { Buffer } from 'buffer';

import type { Region } from 'react-native-maps';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

geo_lat = 0;
geo_long = 0;

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

class EventSingleMapScreen extends Component {

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
      marginTop: 5,
      marginBottom: 70
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
          <Button title="Utförlig vägbeskrivning" buttonStyle = {{backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}} 
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
        <MenuScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

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
      marginTop: 5,
      marginBottom: 70
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
            <Button title="Gå tillbaka" buttonStyle = {{backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}} 
              onPress = { () => { this.props.navigation.goBack() } }
            ></Button>
          </View>
          
          <Button title="Utförlig vägbeskrivning" buttonStyle = {{backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}} 
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
        <MenuScreen navigation={this.props.navigation} />
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
                    opening_hours: location.opening_hours,
                    ableToGoBack: true,
                    matfest: location.producer_category_1,
                    lpiv: location.producer_category_2,
                    smaka: location.producer_category_3,
                    meny: location.producer_category_4
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
          ableToGoBack: false,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2,
          smaka: item.producer_category_3,
          meny: item.producer_category_4
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

    const topMenuStyles = {
      color: 'white',
      width: screenWidth,
      height: 35,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center'
    }

    return(
      <View style = {styles.container}>
        <RenderHeader navigation={this.props.navigation} />
        <View style = {topMenuStyles}>
          
          <View style = {{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text>Anslutna producenter</Text>
          </View>
          
        </View>
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <View style={{marginTop: 5}}>
        <View>
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
          </View>
        </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginBottom: screenHeight * 0.11 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
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
    const matfest = navigation.getParam("matfest", true);
    const lpiv = navigation.getParam("lpiv", true);
    const smaka = navigation.getParam("smaka", true);
    const meny = navigation.getParam("meny", true);
    const ableToGoBack = navigation.getParam("ableToGoBack", true);
    
    var category_string = "";

    if (matfest) {
      category_string += "Matfest ";
    }

    if (lpiv) {
      category_string += "LPIV ";
    }

    const matfest_rendering = <Image source = {require("./memberlogos/mf.png")} style= {{ width: 48.36, height: 48.36, marginRight: 20 }}></Image>
    const lpiv_rendering = <Image source = {require("./memberlogos/lpiv.png")} style= {{ width: 48.36, height: 48.36, marginRight: 20 }}></Image>
    const smaka_rendering = <Image source = {require("./memberlogos/spv.png")} style= {{ width: 48.36, height: 48.36, marginRight: 20 }}></Image>
    const meny_rendering = <Image source = {require("./memberlogos/lm.png")} style= {{ width: 33.33, height: 48.36 }}></Image>

    const void_rendering = <View></View>

    const other_button_rendering = <Button title="Gå tillbaka"  buttonStyle={{borderRadius: 5, width: screenWidth / 2.5, marginLeft: 25, marginRight: 20, marginBottom: 0, marginTop: 20, backgroundColor: "#282828", text:{color: "black"}}}
    onPress = { () => { this.props.navigation.navigate("ProducerList") } }></Button>

    const button_rendering = <Button title="Gå tillbaka"  buttonStyle={{borderRadius: 5, width: screenWidth / 2.5, marginLeft: 25, marginRight: 20, marginBottom: 0, marginTop: 20, backgroundColor: "#282828", text:{color: "black"}}}
        onPress = { () => { this.props.navigation.goBack() } }></Button>

    return(
      <View>
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}}>
          <ImageBackground source={{ uri: background }} style={{width: '100%', height: '100%'}}>
            <HideStatusBar />
            <ScrollView>
            <View style = {{ marginTop: 200 }}>
                  <View style = {{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                      source={ { uri: logo_image }}
                      style={{ resizeMode: 'center', width: 300, height: 100 }}
                    />
                  </View>
                
                  <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 20, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{fontWeight: 'bold'}}>{producer_name}</Text>
                    <Text style={{marginBottom: 20, marginTop: 5}}>{description}</Text>
                  </View>
                
                  <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 20, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>Kontaktuppgifter</Text>
                    <Text>{contact_person}</Text>
                    <Text>{producer_adress}</Text>
                    <Text>{producer_city}</Text>
                    <Text>{producer_email}</Text>
                    <Text>{producer_phone}</Text>
                    <Text>{producer_website}</Text>
                    <Text>{opening_hours}</Text>
                  </View>
                
                  <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 20, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>Vi är medlem i</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      { matfest ? matfest_rendering : void_rendering }
                      { lpiv ? lpiv_rendering : void_rendering }
                      { smaka ? smaka_rendering : void_rendering }
                      { meny ? meny_rendering : void_rendering }
                    </View>
                  </View>
                  <View style = {{flexDirection: "row", flexWrap: "wrap" }}>
                  
                  { ableToGoBack ? button_rendering : other_button_rendering }
                  
                  <Button
                    backgroundColor='#37503c'
                    buttonStyle={{borderRadius: 5, marginLeft: 5, marginRight: 10, marginBottom: 0, marginTop: 20, width: screenWidth/2.5, backgroundColor: "#282828", text:{color: "black"}}}
                    title='Hitta oss'
                    onPress = {() => {
                      this.props.navigation.navigate('Map', {
                        lat: latitude,
                        long: longitude,
                        adress: producer_adress,
                        name: producer_name
                    })}}
                  />
                </View>
                <View style = {{marginTop: screenHeight * 0.12}}></View>
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
    const logo_image = navigation.getParam('image', '404');
    const background = navigation.getParam('cover', '404');
    const latitude = navigation.getParam('lat', '58.2528');
    const longitude = navigation.getParam('long', '12.77');
    const producer_adress = navigation.getParam('adress', 'Kogatan 12 Timmersdala 15623');
    const producer_name = navigation.getParam("name", "Producent AB");
    const matfest = navigation.getParam("matfest", false);
    const lpiv = navigation.getParam("lpiv", false);
    const info = navigation.getParam("information", "Information om producent");
    const contact_info = navigation.getParam("contact_information", "Kontaktinformation om producenten");
    const name = navigation.getParam("event_name", "Eventnamn");
    const event_subtitle = navigation.getParam("event_subtitle", "Subtitel");
    const has_connected_producers = navigation.getParam("has_connected_producers", false);

    const connected_producer_list = navigation.getParam("connected_producers", []);
    
    var category_string = "";

    if (matfest) {
      category_string += "Matfest ";
    }

    if (lpiv) {
      category_string += "LPIV ";
    }

    const button_rendering = <Button
                                backgroundColor='#37503c'
                                buttonStyle={{borderRadius: 5, marginLeft: screenWidth/20, marginRight: screenWidth/20, marginBottom: screenHeight * 0.25, marginTop: 20, backgroundColor: "rgba(0, 0, 0, 0.7)", text:{color: "black"}}}
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

    const void_rendering = <View style = {{marginBottom: screenHeight * 0.25}}></View>

    return(
      <View style = {styles.container}>
        <RenderHeader navigation={this.props.navigation} />
        
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}}>
          <ScrollView>
            <ImageBackground source={{ uri: background }} style={{width: '100%', height: 250}}>
              <HideStatusBar />
              <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 40, marginBottom: 20, marginRight: 40, marginTop: 5, borderRadius: 30, marginTop: 80, flexDirection: 'row' }}>
                <Image source = {{ uri: logo_image }} style={{width: 50, height: 50, resizeMode: "contain"}}/>
                <View>
                  <Text style={{ fontSize: 20, fontStyle: 'bold', marginLeft: 15, marginRight: 10 }}>{name}</Text>
                  <Text style={{ fontSize: 14, fontStyle: 'italic', marginLeft: 15, marginRight: 10 }}>{event_subtitle}</Text>
                </View>
              </View>  
            </ImageBackground>
            
            <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 20, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 20, fontStyle: 'bold', marginLeft: 5, marginRight: 10 }}>Evenemang</Text>
                <Text style={{ fontSize: 15, marginLeft: 5, marginRight: 10 }}>{info}</Text>
              </View>
            </View>
            <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginRight: 20, borderRadius: 10, marginBottom: 5, marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 20, fontStyle: 'bold', marginLeft: 5, marginRight: 10 }}>Information</Text>
                <Text style={{ fontSize: 15, marginLeft: 5, marginRight: 10 }}>{contact_info}</Text>
              </View>
            </View>

            { has_connected_producers ? button_rendering : void_rendering }

          </ScrollView>
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

  async UpdateList() {
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
        borderRadius: 9, // adds the rounded corners
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 85,
        borderWidth: 1,
        borderColor: '#f2f2f2'
      }}

      onPress = {() => {
        this.props.navigation.navigate('Event', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_image_url,
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
          ableToGoBack: true,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2,
          smaka: item.producer_category_3,
          meny: item.producer_category_4,
          connected_producers: item.connected_producers,
          information: item.event_information,
          contact_information: item.event_contact_information,
          event_name: item.event_name,
          event_subtitle: item.event_sub_title,
          has_connected_producers: item.has_connected_producers
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

    const topMenuStyles = {
      color: 'white',
      height: 35,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center'
    }

    const iconStyles2 = {
      width: 27.368,
      height: 27.368,
      marginLeft: 10,
      resizeMode: "contain"
    }

    return(
      <View style={styles.container}>
        <RenderHeader navigation={this.props.navigation} />
        <View style = {topMenuStyles}>
          <View style = {{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style = {{ flexDirection: "row" }}>
              <Image source = {require("./symboler/events-512x512.png")} style = {{ width: 14, height: 14, marginTop: 6 }}></Image>
              <Text style = {{ marginLeft: 10, marginTop: 2 }}>Evenemang</Text>  
            </View> 
            <View style = {{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => {this.UpdateList()}}>
                <Image source={require("./update.png")} style={ iconStyles2 } />
              </TouchableOpacity>
            </View>
          </View>
         </View>
          <ImageBackground source={require('./field2.png')} style={viewStyles}>
          <View style={{marginTop: 0}}>
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
      </View>
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
          ableToGoBack: true,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2,
          smaka: item.producer_category_1,
          meny: item.producer_category_2
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.search_tags ? item.search_tags.toUpperCase() + " " + item.business_name.toUpperCase() : ''.toUpperCase();
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

    return(
      <View style = {styles.container}>
        <RenderHeader  navigation = {this.props.navigation} />

        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText = {text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          containerStyle = {{
            backgroundColor: 'white',
            borderColor:'rgba(0,0,0,0)',
            borderBottomColor: 'rgba(0,0,0,0)',
            borderTopColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
          }}
          inputContainerStyle = {{
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor:'rgba(0,0,0,0)',
          }}
          placeholder="Sök..."
          value={this.state.search}
          width="100%"
          lightTheme = {true}
        />

        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
          <View style={{marginTop: 5}}>
            <View>
              <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
              </View>
            </View>
            <View style={{marginTop:5}}>
              <FlatList 
                data={this.state.dataSource}
                renderItem={this.renderItem}
                enableEmptySections={false}
                style={{ marginBottom: screenHeight * 0.11 }}
                keyExtractor = {(item, index) => index.toString()}
              />
            </View>
          </View>
          <MenuScreen navigation={this.props.navigation} />
        </ImageBackground>
      </View>
    );
  }
}

class FoodListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '', rand_old: -1, latitude: 0.0, longitude: 0.0, location: "", checked: false };
    this.arrayholder = [];
  }

  componentDidMount() {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
         //getting the Longitude from the location json
         const currentLatitude = JSON.stringify(position.coords.latitude);
         //getting the Latitude from the location json
          this.setState({ latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude) });
          geo_lat = parseFloat(currentLatitude);
          geo_long = parseFloat(currentLongitude);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch(error) {
      console.log(error);
    }

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

  componentDidUpdate() {
    
  }

  async UpdateList() {
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
          update: false
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      //alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }

  PrepareUpdate() {
    navigation_rand = this.props.navigation.dangerouslyGetParent().getParam("rand");
    
    current_rand_old = this.state.rand_old;
    if (navigation_rand != current_rand_old) {
      this.setState({ rand_old: navigation_rand });
      this.UpdateList();
    }  
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
        {
          this.UpdateList(),
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
            ableToGoBack: true,
            matfest: item.producer_category_1,
            lpiv: item.producer_category_2,
            smaka: item.producer_category_3,
            meny: item.producer_category_4
          });
        }
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

  tmp = false;

  NearbyProducers() {
    console.log(this.state.latitude + " " + geo_long + " KOORDINATER KOORDINATER KOORDINATER KOORDINATER KOORDINATER KOORDINATER ");

    try {
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

    } catch(error) {
      console.log(error);

    }
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

    const topMenuStyles = {
      color: 'white',
      height: 35,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center'
    }

    const iconStyles = {
      width: 90,
      height: 27.368
    }

    const iconStyles2 = {
      width: 27.368,
      height: 27.368,
      marginLeft: 10,
      resizeMode: "contain"
    }

    return(
      <View style={styles.container}>
        <RenderHeader navigation={this.props.navigation} />
        <View style = {topMenuStyles}>
          <View style = {{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style = {{ flexDirection: "row" }}>
              <Image source = {require("./symboler/eat-512x512.png")} style = {{ width: 14, height: 14, marginTop: 6 }}></Image>
              <Text style = {{ marginLeft: 10, marginTop: 2 }}>Restauranger</Text>  
            </View> 
            <View style = {{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => {this.NearbyProducers()}}>
                <Image source={require("./close.png")} style={ iconStyles } />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.UpdateList()}}>
                <Image source={require("./update.png")} style={ iconStyles2 } />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
          <HideStatusBar />
          <View style={{marginTop: 0}}>
            <View>
              <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
              </View>
            </View>
            <View style={{marginTop:5}}>
              <FlatList 
                data={this.state.dataSource}
                //ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={this.renderItem}
                enableEmptySections={false}
                style={{ marginBottom: screenHeight * 0.11 }}
                keyExtractor = {(item, index) => index.toString()}
              />
            </View>
          </View>
          <MenuScreen navigation={this.props.navigation} />
        </ImageBackground>
      </View>
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
    try {
      Geolocation.getCurrentPosition(
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
         //getting the Longitude from the location json
         const currentLatitude = JSON.stringify(position.coords.latitude);
         //getting the Latitude from the location json
          this.setState({ latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude) });
          geo_lat = parseFloat(currentLatitude);
          geo_long = parseFloat(currentLongitude);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch(error) {
      console.log(error);
    }    

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

  async UpdateList() {
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
          update: false
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      //alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }

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
        this.UpdateList();
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
          ableToGoBack: true,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2,
          smaka: item.producer_category_3,
          meny: item.producer_category_4
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

  tmp = false;

  NearbyProducers() {
    console.log(this.state.latitude + " " + geo_long + " KOORDINATER KOORDINATER KOORDINATER KOORDINATER KOORDINATER KOORDINATER ");

    try {
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

    } catch(error) {
      console.log(error);

    }
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

    const topMenuStyles = {
      color: 'white',
      height: 35,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center'
    }

    const iconStyles = {
      width: 90,
      height: 27.368
    }

    const iconStyles2 = {
      width: 27.368,
      height: 27.368,
      marginLeft: 10,
      resizeMode: "contain"
    }

    //const store_type = this.props.navigation.dangerouslyGetParent().getParam("store_type");

    return(
      <View style={styles.container}>
        <RenderHeader navigation={this.props.navigation} />
        <View style = {topMenuStyles}>
          <View style = {{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style = {{ flexDirection: "row" }}>
              <Image source = {require("./symboler/shop-512x512.png")} style = {{ width: 14, height: 14, marginTop: 6 }}></Image>
              <Text style = {{ marginLeft: 10, marginTop: 2 }}>Gårdsbutiker</Text>  
            </View> 
            <View style = {{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => {this.NearbyProducers()}}>
                <Image source={require("./close.png")} style={ iconStyles } />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.UpdateList()}}>
                <Image source={require("./update.png")} style={ iconStyles2 } />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
          <HideStatusBar />
          <View style={{marginTop: 0}}>
            <View>
              <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
              </View>
            </View>
            <View style={{marginTop:5}}>
              <FlatList 
                data={this.state.dataSource}
                //ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={this.renderItem}
                enableEmptySections={false}
                style={{ marginBottom: screenHeight * 0.11 }}
                keyExtractor = {(item, index) => index.toString()}
              />
            </View>
          </View>
          <MenuScreen navigation={this.props.navigation} />
        </ImageBackground>
      </View>
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
    try {
      Geolocation.getCurrentPosition(
        position => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
         //getting the Longitude from the location json
         const currentLatitude = JSON.stringify(position.coords.latitude);
         //getting the Latitude from the location json
          this.setState({ latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude) });
          geo_lat = parseFloat(currentLatitude);
          geo_long = parseFloat(currentLongitude);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch(error) {
      console.log(error);
    }

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

  async UpdateList() {
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
          update: false
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.log(error);
      //alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    return return_array;
  }

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
        this.UpdateList();
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
          ableToGoBack: true,
          matfest: item.producer_category_1,
          lpiv: item.producer_category_2,
          smaka: item.producer_category_3,
          meny: item.producer_category_4
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

  tmp = false;

  NearbyProducers() {
    console.log(this.state.latitude + " " + geo_long + " KOORDINATER KOORDINATER KOORDINATER KOORDINATER KOORDINATER KOORDINATER ");

    try {
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

    } catch(error) {
      console.log(error);

    }
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

    const topMenuStyles = {
      color: 'white',
      height: 35,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center'
    }

    const iconStyles = {
      width: 90,
      height: 27.368
    }

    const iconStyles2 = {
      width: 27.368,
      height: 27.368,
      marginLeft: 10,
      resizeMode: "contain"
    }

    //const store_type = this.props.navigation.dangerouslyGetParent().getParam("store_type");

    return(
      <View style={styles.container}>
        <RenderHeader navigation={this.props.navigation} />
        <View style = {topMenuStyles}>
          <View style = {{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style = {{ flexDirection: "row" }}>
              <Image source = {require("./symboler/fika-512x512.png")} style = {{ width: 14, height: 14, marginTop: 6 }}></Image>
              <Text style = {{ marginLeft: 10, marginTop: 2 }}>Lokala producenter</Text>  
            </View> 
            <View style = {{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => {this.NearbyProducers()}}>
                <Image source={require("./close.png")} style={ iconStyles } />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.UpdateList()}}>
                <Image source={require("./update.png")} style={ iconStyles2 } />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
          <HideStatusBar />
          <View style={{marginTop: 0}}>
            <View>
              <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, width: screenWidth - 40}}>
              </View>
            </View>
            <View style={{marginTop:5}}>
              <FlatList 
                data={this.state.dataSource}
                //ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={this.renderItem}
                enableEmptySections={false}
                style={{ marginBottom: screenHeight * 0.11 }}
                keyExtractor = {(item, index) => index.toString()}
              />
            </View>
          </View>
          <MenuScreen navigation={this.props.navigation} />
        </ImageBackground>
      </View>
    );
  }
}

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '', descColor: '#282828', descShadow: 'rgba(255, 255, 255, 0.85)', descTitle: 'Västsvenska\nMatappen', dField: require('./field2.png'), dLogo: require('./menu_icons3/1t.png'), dFontSize: 27 };
    this.arrayholder = [];
  }

  someMethod() {
    console.log("Hej");
  }

  shuffle(a) {
    var n = a.length;
    for (var i = n - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
  }
  sieve(n) {
      var a = new Array(n);
      for (var i = 2; i < n; i++) {
          a[i] = true;
      }
      for (var i = 2; i < Math.sqrt(n); i++) {
          for (var j = i * i; j < n; j += i) {
              if (a[j]) {
                  a[j] = false;
              }
          }
      }
      var b = new Array();
      for (var i = 0; i < n; i++) {
          if (a[i]) {
              b.push(i);
          }
      }
      return b;
  }
  heapsort(a) {
      var n = a.length;
      for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
          this.heapify(a, n, i);
      }
      for (var i = n - 1; i >= 0; i--) {
          var tmp = a[0];
          a[0] = a[i];
          a[i] = tmp;
          this.heapify(a, i, 0);
      }
  }
  heapify(a, n, i) {
      var hi = i;
      var l = 2 * i + 1;
      var r = 2 * i + 2;
      if (l < n && a[l] > a[hi]) {
          hi = l;
      }
      if (r < n && a[r] > a[hi]) {
          hi = r;
      }
      if (hi != i) {
          var tmp = a[i];
          a[i] = a[hi];
          a[hi] = tmp;
          this.heapify(a, n, hi);
      }
  }
  quicksort(a, lo, hi) {
      if (lo < hi) {
          var p = this.partition(a, lo, hi);
          this.quicksort(a, p + 1, hi);
          this.quicksort(a, lo, p - 1);
      }
  }
  partition(a, lo, hi) {
      var pivot = a[hi];
      var i = lo - 1;
      for (var j = lo; j < hi; j++) {
          if (pivot > a[j]) {
              i++;
              var tmp_1 = a[i];
              a[i] = a[j];
              a[j] = tmp_1;
          }
      }
      var tmp = a[i + 1];
      a[i + 1] = a[hi];
      a[hi] = tmp;
      return i + 1;
  }
  stuff() {
      console.log("Would You Kindly");
      var a = [65165, 165, 16, 5198, 196816, 51918, 65191, 651, -65, 0, 651, 5, -651, 51651, 8651, 98, 651, 916, 51981, 6];
      console.log(a);
      this.quicksort(a, 0, a.length - 1);
      console.log(a);
      this.shuffle(a);
      var b = a;
      console.log(b);
      this.heapsort(b);
      console.log(b);
      var primes = this.sieve(799999);
      console.log(primes);
      this.shuffle(primes);
      console.log(primes);
      this.quicksort(primes, 0, primes.length - 1);
      console.log(primes);
      this.shuffle(primes);
      console.log(primes);
      this.heapsort(primes);
      console.log(primes);
  }

  componentDidMount() {
    SplashScreen.show();
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
          producer_list = responseJson;
          full_producer_list = producer_list;
        }
      );
    })
    .catch(error => {
      console.log(error);
      alert("Matappen kräver anslutning till internet för att kunna visa innehåll. Vänligen anslut dig och starta om appen.");
    });

    this.stuff();

    SplashScreen.hide();

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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Would", {rand: Math.floor(Math.random() * (1 + 1000))})}}>
              <Image
                source={require('./menu_icons4/äta.png')}
                style={{ marginBottom: 25, marginTop: 0, width: 314, height: 114,
                  borderColor: '#99994d' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("You", {store_type:"Producent"})}}>
              <Image
                source={require('./menu_icons4/hitta.png')}
                style={{ width: 314, height: 114, marginBottom: 25, 
                  borderColor: '#99994d' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate("Kindly", {store_type:"Gårdsbutik"})}}>
              <Image
                source={require('./menu_icons4/handla.png')}
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

  //source={require("./search-256x256-black-bg.png")}

  render() {
    return (
      <Header
          placement="left"
          leftComponent={<TouchableOpacity>
          <Image source={require("./logo.png")} style={{ resizeMode: "contain", width: 30, height: 30 }}>
          </Image>
          </TouchableOpacity>}
          centerComponent={{ text: 'Västsvenska Matappen', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={<TouchableOpacity onPress={() => {this.props.navigation.navigate("Sök")}}>
            <Image source={require("./search-256x256-black-bg.png")} style={{ resizeMode: "contain", width: 30, height: 30 }}>
            </Image>
          </TouchableOpacity>}
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
      height: 35, 
      width: 35, 
      marginRight: screenWidth / 7,
      marginTop: 10,
      marginBottom: -5
    }

    return (
      <View style = {bottomViewStyles}>
        <TouchableOpacity onPress={() => {this.StoreCategoryFilterFunction("Start"), this.props.navigation.navigate("Start")}}>
          <Image source={this.state.dGardsbutik} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.ResetStack(),  this.props.navigation.navigate("EventScreen")}}>
          <Image source={this.state.dSok} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.StoreCategoryFilterFunction("Karta"), this.props.navigation.navigate("Karta")}}>
          <Image source={this.state.dKarta} style={{ flexDirection: 'row', flexWrap: 'wrap', height: 35, width: 35, marginTop: 10, marginRight: 0, marginBottom: -5 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const SearchStack = createStackNavigator(
  {
    Connected: {
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
    screen: EventSingleMapScreen,
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
    initialRouteName: 'Connected'
  },  
},
{headerMode: 'screen'}

);

const FoodStack = createStackNavigator(
  {
    Connected: {
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
    Connected: {
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
    Connected: {
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
      screen: StartScreen,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Would: {
      screen: FoodStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    You: {
      screen: ProducerStack,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Kindly: {
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
