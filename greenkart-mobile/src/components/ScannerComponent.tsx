import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface ScannerComponentProps {
  onBarCodeScanned: (result: { type: string; data: string }) => void;
  scanned: boolean;
}

const { width, height } = Dimensions.get('window');
const overlaySize = width * 0.7; // 70% of screen width for the square overlay

const ScannerComponent: React.FC<ScannerComponentProps> = ({ onBarCodeScanned, scanned }) => {
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Overlay for the scanning area */}
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}>
          <View style={styles.unfocusedTop} />
          <View style={styles.focusedContainer}>
            <View style={styles.unfocusedSide} />
            <View style={styles.focusedCenter} />
            <View style={styles.unfocusedSide} />
          </View>
          <View style={styles.unfocusedBottom} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unfocusedContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  unfocusedTop: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  focusedContainer: {
    flexDirection: 'row',
    width: '100%',
    height: overlaySize, // Square scanning area
  },
  unfocusedSide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  focusedCenter: {
    width: overlaySize, // Square scanning area
    height: overlaySize,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  unfocusedBottom: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

export default ScannerComponent;
