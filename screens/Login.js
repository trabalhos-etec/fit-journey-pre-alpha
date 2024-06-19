import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../firebase.config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  })
})

export default function App({ navigation }) {
  const handleCallNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      alert("Não deixou as notificações ativas");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "FitJourney: Boas-vindas!",
        body: "Seja bem-vindo ao FitJourney!",
      },
      trigger: {
        seconds: 5,
      },
    })
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  function loginFirebase() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Logado em ${user.uid}`);
      console.log(user.email);
      navigation.navigate('Home', { userName: user.displayName });
      handleCallNotifications();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitJourney</Text>
      <Text style={styles.slogan}>Seu parceiro pra uma <Text style={styles.phrase}>vida saudável</Text>.</Text>
      <TextInput
        style={styles.input}
        placeholder='Email...'
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Senha...'
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => loginFirebase()}>
        <Text style={styles.buttonText}>Login Seguro</Text>
      </TouchableOpacity>
      <Text style={styles.securityPhrase}>Sua informação está segura conosco.</Text>
      <Text style={styles.notHaveAccount} onPress={() => navigation.navigate('Register')}>Não tem uma conta? <Text style={styles.bold}>Crie uma!</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    fontFamily: 'Inter_800ExtraBold'
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
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Inter_800ExtraBold'
  },
  phrase: {
    color: "#0DE347",
  },
  slogan: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
  },
  securityPhrase: {
    color: "#0DE347",
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
  notHaveAccount: {
    fontFamily: 'Inter_400Regular',
    marginTop: 40,
  },

  bold: {
    fontWeight: 'bold'
  }
});
