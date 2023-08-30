/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { BAAS_CONFIG } from './baasConfig';

const App = () => {
  const baas = initializeApp(BAAS_CONFIG)
  const db = getFirestore(baas)
  console.log('App')
  return (
    <View>
      <Header />
      <Initial databaseRef={db} base='notice-boards' />
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

const Initial = ({ databaseRef, base }) => {
  const [code, setCode] = useState('')
  getNoticeBoardByCode = async () => {
    console.log('getNoticeBoardByCode')
    const response = await getDocs(query(collection(databaseRef, base), where('code', '==', code)));
    if (!response.empty) {
      const noticeBoard = response.docs[0].data()
      console.log({ noticeBoard })
    }
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
