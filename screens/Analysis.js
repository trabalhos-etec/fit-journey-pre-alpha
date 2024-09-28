import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanning(false);
    const response = await fetch(`https://my-json-server.typicode.com/trabalhos-etec/api-fitjourney/db`);
    const json = await response.json();

    // Verifique se o código de barras é o esperado
    const product = json.product.barcode === data ? json.product : null;

    if (product) {
      setScannedData(product);
    } else {
      alert('Produto não encontrado!');
    }
  };

  const getColorFromRating = (rating) => {
    if (rating >= 90) return 'green';
    if (rating >= 80) return 'lightgreen';
    if (rating >= 70) return 'orange';
    return 'red';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escaneie o código de barras</Text>
      {hasPermission === null ? (
        <Text>Solicitando permissão para usar a câmera</Text>
      ) : hasPermission === false ? (
        <Text>Sem acesso à câmera</Text>
      ) : (
        <View>
          {scanning ? (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          ) : (
            <Button title="Iniciar escaneamento" onPress={() => setScanning(true)} />
          )}
          {scannedData && (
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{scannedData.name}</Text>
              <Image source={{ uri: scannedData.image_url }} style={styles.image} />
              <Text>Porção: {scannedData.portion.quantity} {scannedData.portion.unit}</Text>
              <Text>Calorias: {scannedData.nutrition_facts.values['200 ml'].calories_kcal}</Text>
              <Text style={{ color: getColorFromRating(scannedData.rating) }}>
                Nota: {scannedData.rating}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
