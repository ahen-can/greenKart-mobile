import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigation/MainNavigator';
import ScannerComponent from '../components/ScannerComponent'; // Custom scanner component

type ScanScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Scan'>;

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<ScanScreenNavigationProp>();
  const isFocused = useIsFocused(); // Hook to check if the screen is currently focused

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (!scanned) { // Only process if not already scanned
      setScanned(true);
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      Alert.alert(
        "Barcode Scanned!",
        `Type: ${type}\nData: ${data}`,
        [
          {
            text: "View Product",
            onPress: () => {
              navigation.navigate('Product', { barcode: data });
              // Reset scanned state after navigating or a short delay
              setTimeout(() => setScanned(false), 1500);
            }
          },
          {
            text: "Scan Again",
            onPress: () => setTimeout(() => setScanned(false), 1500) // Allow rescanning after a delay
          }
        ]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => BarCodeScanner.requestPermissionsAsync()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && ( // Only render BarCodeScanner when the screen is focused
        <ScannerComponent onBarCodeScanned={handleBarCodeScanned} scanned={scanned} />
      )}
      {scanned && (
        <View style={styles.scanAgainButtonContainer}>
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButtonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    padding: 5,
  },
});

export default ScanScreen;
