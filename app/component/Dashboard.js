'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ContactList from './ContactList';
import GroupList from './GroupList';
import AddFriend from './AddFriend';
import Room from './Room';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      friends: []
    };

    this.socket = this.props.socket;
  }

  getGroup(resp) {
    if (typeof(resp) === 'object') {
      let rooms = [];
      resp.map(function (el) {
        rooms.push({
          name: el.nameGroup,
          id: el._id
        });
      });
      this.setState({ rooms: rooms });
    };
  }

  addFriend() {
    this.socket.emit('find_friend', {userID: this.props.userData.userId});
  }

  getFriend(resp) {
    if (typeof(resp) === 'object') {
      let friends = [];
      resp.map(function (el) {
        friends.push({
          name: el.name,
          id: el._id
        });
      });
      this.setState({ friends: friends });
    };
  }

  componentWillMount() {
    this.socket.emit('findRoom', this.props.userData.userId);
    this.socket.emit('find_friend', {userID: this.props.userData.userId});

    this.socket.on('chat_resp', this.gotoRoom.bind(this));
    this.socket.on('findRoom_resp', this.getGroup.bind(this));
    this.socket.on('find_friend_resp', this.getFriend.bind(this));
  }

  gotoRoom(id) {
    this.props.navigator.push({
      title: 'Room',
      component: Room,
      passProps: {
        userData: this.props.userData,
        roomId: id, 
        socket: this.socket
      }
    });
  }

  gotoFriendRoom(id) {
    this.findFriendRoom(id);
  }

  findFriendRoom(friendId) {
    this.socket.emit('chat', {
      userId1: this.props.userData.userId,
      userId2: friendId
    });
  }

  render() {
    let pos = (
      Platform.OS === 'ios' ?
      'bottom' :
      'top'
    );
    return (
      <ScrollableTabView 
        tabBarPosition={pos}
        tabBarActiveTextColor='#48BBEC' 
        tabBarUnderlineStyle={{backgroundColor: '#48BBEC'}}>
        <ContactList 
          dataSource={this.state.friends}
          onClick={this.gotoFriendRoom.bind(this)}
          tabLabel="Friend List" />
        <GroupList 
          dataSource={this.state.rooms}
          onClick={this.gotoRoom.bind(this)}
          socket={this.socket}
          userData={this.props.userData}
          tabLabel="Room List" />
        <AddFriend 
          socket={this.socket}
          onAdd={this.addFriend.bind(this)}
          uname={this.props.userData.username}
          tabLabel="Add Friend" />
      </ScrollableTabView>
    );
  }
};