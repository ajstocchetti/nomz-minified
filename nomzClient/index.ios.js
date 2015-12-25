'use strict';

var React = require('react-native');
var Home = require('./App/components/home-screen');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  NavigatorIOS,
  AsyncStorage,
  ActivityIndicatorIOS
} = React;



class nomzClient extends Component{
  render() {
    return (
      <NavigatorIOS
        ref = "nav"
        style={styles.container}
        initialRoute = {{
           title: 'Nomz!',
           backButtonTitle: ' ',
           description: 'Nomz! - the best new way to find food',
           component: Home
         }} />
       )
   }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('nomzClient', () => nomzClient);
