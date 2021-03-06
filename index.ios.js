'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import Home from './app/component/Home';

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class PiyeKabareApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Piye Kabare',
          component: Home
        }}/>
    );
  }
}

AppRegistry.registerComponent('PiyeKabare', () => PiyeKabareApp);
