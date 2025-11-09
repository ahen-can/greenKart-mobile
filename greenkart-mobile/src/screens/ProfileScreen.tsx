import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  // In a real app, this data would come from user authentication and Supabase
  const userName = "EcoWarrior";
  const userEmail = "ecowarrior@example.com";
  const ecoCoins = 350; // Example balance, should be dynamic
  const productsScanned = 42;
  const ecoScoreAverage = "A-";

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/app-icon.png')} // Placeholder for a profile picture
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{ecoCoins}</Text>
          <Text style={styles.statLabel}>EcoCoins</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{productsScanned}</Text>
          <Text style={styles.statLabel}>Products Scanned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{ecoScoreAverage}</Text>
          <Text style={styles.statLabel}>Avg. EcoScore</Text>
        </View>
      </View>

      {/* Additional profile details or settings can go here */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Text style={styles.sectionItem}>Edit Profile</Text>
        <Text style={styles.sectionItem}>Notification Preferences</Text>
        <Text style={styles.sectionItem}>Privacy Policy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc', // Placeholder background
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#555',
  },
});

export default ProfileScreen;
