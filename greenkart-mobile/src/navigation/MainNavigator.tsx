import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductScreen from '../screens/ProductScreen'; // Will be navigated to, not a direct tab

// Define the types for the navigation parameters
export type RootTabParamList = {
  Home: undefined;
  Scan: undefined;
  Rewards: undefined;
  Profile: undefined;
  Product: { barcode: string } | undefined; // Product screen can receive a barcode
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'barcode' : 'barcode-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-circle-outline'; // Default or fallback icon
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide header for tab screens, screens can manage their own headers
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* ProductScreen is not a direct tab, but can be navigated to */}
      <Tab.Screen name="Product" component={ProductScreen} options={{ tabBarButton: () => null, headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
