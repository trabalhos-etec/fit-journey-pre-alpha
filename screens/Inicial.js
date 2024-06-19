import React from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, 
    Inter_100Thin, 
    Inter_200ExtraLight, 
    Inter_300Light, 
    Inter_400Regular, 
    Inter_500Medium, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold, 
 } from '@expo-google-fonts/inter';


 export default function Inicial({ navigation }) {
    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
    }
      
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.subtitle}>Dê seu primeiro passo em direção a uma <Text style={styles.phrase}>vida saudável</Text> com o</Text>
            <Text style={styles.title}>FitJourney</Text>
            <Text style={styles.slogan}>Seu parceiro pra uma <Text style={styles.phrase}>vida saudável</Text>.</Text>
            <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textButton}>Vamos lá?</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    subtitle: {
      fontSize: 20,
      padding: 15,
      textAlign: 'center',
      fontFamily: 'Inter_700Bold'
    },
    phrase: {
      color: "#0DE347",
    },
    slogan: {
      fontSize: 14,
      fontFamily: 'Inter_700Bold'
    },
    buttonStart: {
      height: 45,
      width: 185,
      borderWidth: 2,
      borderColor: 'black', 
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80,
    },
    textButton: {
      fontFamily: 'Inter_800ExtraBold'
    }
});
