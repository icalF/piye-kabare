'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    backgroundColor: 'white',
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
    height: 36,
    padding: 4,
    flexDirection: 'row',
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    color: '#48BBEC'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
});

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      isLoading: false,
      message: ''
    };
  }

  onUsernameChanged(ev) {
    this.setState({ uname: ev.nativeEvent.text });
  }

  onFind() {
    // var socket = this.props.socket;
    // socket.emit('login', {uname: this.state.uname, pass: this.state.pass});
    this.setState({ isLoading: true });
    // socket.on('login_status', function (userData) {
    //   this.setState({ message: JSON.stringify(userData) });
    // });
  }

  render() {
    var loading = this.state.isLoading ?
      <ActivityIndicator
          style={styles.loading}
          size='large'/> :
      <View/>
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={this.state.uname}
          onChange={this.onUsernameChanged.bind(this)}
          underlineColorAndroid={'transparent'}
          placeholder='Username'/>
        <TouchableHighlight style={styles.button}
            onPress={this.onFind.bind(this)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableHighlight>
        {loading}
      </View>
    );
  }
};