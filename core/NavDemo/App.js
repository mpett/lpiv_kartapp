import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detta är hemskärmen</Text>
        <Button 
          title = "Gå till detaljskärmen"
          onPress = {() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detta är detaljskärmen</Text>
        <Button 
          title = "Gå till detaljskärmen igen"
          onPress = {() => this.props.navigation.push('Details')}
        />
        <Button 
          title = "Gå hem"
          onPress = {() => this.props.navigation.navigate('Home')}
        />
        <Button 
          title = "Gå tillbaka"
          onPress = {() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
