import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigation/MainNavigator';
import { lookupProduct } from '../lib/openfoodfacts';
import { awardCoinsForEcoScore } from '../utils/ecoscore';
import { recordScan } from '../lib/supabase'; // Assuming this is implemented

type ProductScreenRouteProp = RouteProp<RootTabParamList, 'Product'>;
type ProductScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Product'>;

interface ProductData {
  name: string;
  brand?: string;
  image?: string;
  categories?: string;
  eco_score?: string;
  barcode: string;
}

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const { barcode } = route.params || {}; // Get barcode from navigation params

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [awarding, setAwarding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!barcode) {
        Alert.alert("Error", "No barcode provided to display product.");
        setLoading(false);
        return;
      }
      try {
        const productData = await lookupProduct(barcode);
        if (productData) {
          setProduct({ ...productData, barcode });
        } else {
          Alert.alert("Product Not Found", "Could not find product details for this barcode.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        Alert.alert("Error", "Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  const handleAwardEcoCoins = async () => {
    if (!product || awarding) return;

    setAwarding(true);
    const coins = awardCoinsForEcoScore(product.eco_score);
    Alert.alert("EcoCoins Awarded!", `You earned ${coins} EcoCoins for scanning ${product.name}!`);

    // In a real app, you'd get the actual userId from your auth system
    const dummyUserId = "user-123";
    try {
      // Record the scan and awarded coins to Supabase
      await recordScan(dummyUserId, product.barcode, coins);
      console.log(`Scan recorded for ${product.barcode}, awarded ${coins} coins.`);
    } catch (error) {
      console.error("Error recording scan to Supabase:", error);
      Alert.alert("Error", "Failed to record scan. Please check Supabase configuration.");
    } finally {
      setAwarding(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2e8b57" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>No product found or an error occurred.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      {product.brand && <Text style={styles.productBrand}>{product.brand}</Text>}

      {product.image && (
        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      )}

      <View style={styles.detailsContainer}>
        {product.categories && (
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Categories: </Text>{product.categories}
          </Text>
        )}
        {product.eco_score && (
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Eco-Score: </Text>{product.eco_score}
          </Text>
        )}
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Barcode: </Text>{product.barcode}
        </Text>
      </View>

      <Button
        title={awarding ? "Awarding..." : "Award EcoCoins"}
        onPress={handleAwardEcoCoins}
        disabled={awarding}
        color="#2e8b57"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  productBrand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  productImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#e0e0e0', // Placeholder background
  },
  detailsContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductScreen;
