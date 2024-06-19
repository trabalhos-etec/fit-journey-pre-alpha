import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import firebase from '../firebase.config';
import { getAuth, signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App({ navigation }) {
  const [food, setFood] = useState('');
  const [calorieData, setCalorieData] = useState([]);

  function getCalories() {
    fetch(`https://caloriasporalimentoapi.herokuapp.com/api/calorias/?descricao=${food}`)
      .then(response => response.json())
      .then(data => {
        setCalorieData(data); 
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  const auth = getAuth();
  function logoutFirebase() {
    signOut(auth).then(() => {
      alert("Deslogado");
      navigation.navigate('Login');
    }).catch((error) => {
      alert(`deu um erro: ${error}`);
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logoutFirebase}>
        <Icon name="sign-out" size={30} color="#fff" />
      </TouchableOpacity>
      <ScrollView style={styles.searchFood}>
        <TextInput
          style={styles.input}
          placeholder='Digite um alimento...'
          onChangeText={food => setFood(food)}
          value={food}
        />
        <TouchableOpacity style={styles.button} onPress={() => getCalories()}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        {calorieData.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>
              {item.descricao} - {item.quantidade} - {item.calorias}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  searchFood: {
    marginTop: 80,
  },
  input: {
    height: 55,
    width: 320,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    height: 55,
    width: 320,
    borderWidth: 2,
    borderColor: 'black', 
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
  },
});
