import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  product: {
    name: string;
    brand?: string;
    image?: string;
    eco_score?: string;
  };
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      {product.image && (
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        {product.brand && <Text style={styles.brand}>{product.brand}</Text>}
        {product.eco_score && (
          <Text style={styles.ecoScore}>Eco-Score: {product.eco_score}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    width: '90%',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ecoScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginTop: 5,
  },
});

export default ProductCard;
