/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, query, collection, where, onSnapshot, orderBy } from 'firebase/firestore';
import { BAAS_CONFIG } from './baasConfig';
import EncryptedStorage from 'react-native-encrypted-storage';

const BAAS = initializeApp(BAAS_CONFIG);
const DB = getFirestore(BAAS);
const BASE = 'notice-boards';
const SUBCOLLECTION = 'notifications';

const App = () => {
  const [noticeBoard, setNoticeBoard] = useState(null);
  EncryptedStorage.getItem('noticeBoard')
    .then(response => {
      if (response != null) setNoticeBoard(JSON.parse(response).noticeBoard);
    })
    .catch(e => console.log(e))
  return (
    <View>
      <Header noticeBoard={noticeBoard} setNoticeBoard={setNoticeBoard} />
      {noticeBoard != null ? <NotificationList noticeBoard={noticeBoard} /> : <Initial setNoticeBoard={setNoticeBoard} />}
    </View>
  )
}

const Header = ({ noticeBoard, setNoticeBoard }) => {
  const unfollow = () => {
    EncryptedStorage.clear().then(() => setNoticeBoard(null))
  }
  return (
    <View style={styles.header}>
      <Text style={styles.headerBrand}>{noticeBoard != null ? <Text onPress={unfollow}>Unfollow {noticeBoard.name}</Text> : 'Notice board'}</Text>
    </View>
  )
}

const NotificationList = ({ noticeBoard: { id } }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const dispose = onSnapshot(query(collection(DB, BASE, id, SUBCOLLECTION), orderBy('dateCreated', 'desc')), snapshot => setNotifications(snapshot.docs.map(i => i.data())));
    return () => dispose();
  }, []);
  return (
    <ScrollView>
      {notifications.map(i => <Notification key={i.dateCreated} {...i} />)}
    </ScrollView>
  )
}

const Notification = ({ title, text }) => {
  const [isExpanded, toggleIsExpanded] = useState(false);
  return (
    <View style={styles.notification}>
      <Button title={title} onPress={() => toggleIsExpanded(!isExpanded)} />
      <Text style={styles.notificationText}>{isExpanded ? text : ''}</Text>
    </View>
  )
}

const Initial = ({ setNoticeBoard }) => {
  const [code, setCode] = useState('');
  const getNoticeBoardByCode = () => {
    getDocs(query(collection(DB, BASE), where('code', '==', code)))
      .then(response => {
        if (!response.empty) {
          const noticeBoard = { ...response.docs[0].data(), id: response.docs[0].id };
          EncryptedStorage.setItem('noticeBoard', JSON.stringify({ noticeBoard: noticeBoard }))
            .then(() => setNoticeBoard(noticeBoard))
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));
  }
  return (
    <View style={styles.initial}>
      <TextInput style={styles.initialInput} placeholder='Enter code' value={code} onChangeText={setCode} />
      <Button title='Submit' onPress={getNoticeBoardByCode} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3F51B5',
    height: 50,
  },
  headerBrand: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 25,
  },
  initial: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialInput: {
    textAlign: 'center',
  },
  notification: {
    padding: 10,
  },
  notificationText: {
    textAlign: 'center',
  },
});

export default App;
