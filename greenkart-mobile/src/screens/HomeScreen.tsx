import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigation/MainNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GreenKart!</Text>
      <Text style={styles.subtitle}>Tap Scan to start your eco-friendly shopping journey.</Text>
      <Button title="Go to Scan" onPress={() => navigation.navigate('Scan')} />

      {/* Sample Product Cards - Placeholder */}
      <View style={styles.productCardContainer}>
        <Text style={styles.productCardTitle}>Featured Eco-Products</Text>
        {/* In a real app, this would be a list of ProductCard components */}
        <View style={styles.productCard}>
          <Text>Organic Apples</Text>
          <Text>Eco-Score: A+</Text>
        </View>
        <View style={styles.productCard}>
          <Text>Recycled Water Bottle</Text>
          <Text>Eco-Score: B</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  productCardContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  productCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
