import React from "react";
import { Button, View, Text, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

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
    return {
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

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
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

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
