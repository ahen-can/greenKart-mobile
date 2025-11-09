import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

// Dummy data for rewards
const rewardsData = [
  { id: '1', name: '10% Off Next Purchase', cost: 100, description: 'Save on your next eco-friendly buy!' },
  { id: '2', name: 'Free Eco-Bag', cost: 200, description: 'Carry your groceries in style.' },
  { id: '3', name: 'Donation to Charity', cost: 500, description: 'Support a sustainable cause.' },
];

const RewardsScreen = () => {
  // In a real app, you would fetch user's current EcoCoins balance and available rewards
  const userEcoCoins = 350; // Example balance

  const handleRedeem = (rewardId: string, cost: number) => {
    if (userEcoCoins >= cost) {
      Alert.alert(
        'Redeem Reward',
        `Are you sure you want to redeem "${rewardsData.find(r => r.id === rewardId)?.name}" for ${cost} EcoCoins?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Redeem',
            onPress: () => {
              // Implement actual redemption logic here (e.g., call Supabase function)
              Alert.alert('Success', 'Reward redeemed! Your EcoCoins balance has been updated.');
              // In a real app, you'd update the userEcoCoins state and persist to Supabase
            },
          },
        ]
      );
    } else {
      Alert.alert('Not Enough EcoCoins', `You need ${cost - userEcoCoins} more EcoCoins to redeem this reward.`);
    }
  };

  const renderRewardItem = ({ item }: { item: typeof rewardsData[0] }) => (
    <View style={styles.rewardCard}>
      <Text style={styles.rewardName}>{item.name}</Text>
      <Text style={styles.rewardDescription}>{item.description}</Text>
      <View style={styles.rewardFooter}>
        <Text style={styles.rewardCost}>{item.cost} EcoCoins</Text>
        <TouchableOpacity
          style={[styles.redeemButton, userEcoCoins < item.cost && styles.redeemButtonDisabled]}
          onPress={() => handleRedeem(item.id, item.cost)}
          disabled={userEcoCoins < item.cost}
        >
          <Text style={styles.redeemButtonText}>Redeem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your EcoRewards</Text>
      <Text style={styles.ecoCoinsBalance}>Current EcoCoins: {userEcoCoins}</Text>
      <FlatList
        data={rewardsData}
        renderItem={renderRewardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e8b57', // SeaGreen
    marginTop: 50,
  },
  ecoCoinsBalance: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rewardCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  redeemButton: {
    backgroundColor: '#2e8b57',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  redeemButtonDisabled: {
    backgroundColor: '#a9a9a9', // DarkGray
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RewardsScreen;
