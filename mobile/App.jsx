/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
  EncryptedStorage.clear()
  EncryptedStorage.getItem('noticeBoard')
    .then(response => {
      if (response != null) setNoticeBoard(JSON.parse(response).noticeBoard);
    })
    .catch(e => console.log(e))
  return (
    <View>
      <Header />
      {noticeBoard != null ? <NotificationList noticeBoard={noticeBoard} /> : <Initial setNoticeBoard={setNoticeBoard} />}
    </View>
  )
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerBrand}>Notice board</Text>
    </View>
  )
}

const NotificationList = ({ noticeBoard: { id } }) => {
  const [notifications, setNotifications] = useState([]);
  console.log({ notifications });
  useEffect(() => {
    const dispose = onSnapshot(query(collection(DB, BASE, id, SUBCOLLECTION), orderBy('dateCreated', 'desc')), snapshot => {
      setNotifications(snapshot.docs.map(i => i.data()));
      // if (notifications.length === 0) {
      //   setNotifications(snapshot.docChanges().map(i => i.doc.data()));
      //   setNotifications(snapshot.docs.map(i => i.data()));
      // } else {
      //   const temp = [...notifications];
      //   snapshot.docChanges().forEach(i => {
      //     if (i.type === 'added') {
      //       temp.unshift(i.doc.data());
      //       console.log({ temp })
      //     }
      //   })
      //   setNotifications(temp);
      // }
    });
    return () => dispose()
  }, []);
  return (
    <Text>Prikazi postove</Text>
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
});

export default App;
