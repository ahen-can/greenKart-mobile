import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Retrieve Supabase URL and Anon Key from environment variables
// These should be set in your app.json or .env file and exposed via expo-constants
const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Supabase Stub Functions ---

/**
 * Creates a new user profile or retrieves an existing one.
 * In a real application, this would typically be called after user authentication.
 * @param userId The unique ID of the user.
 * @param props Additional profile properties (e.g., username, email).
 * @returns The user's profile data.
 */
export async function createOrGetProfile(userId: string, props?: { username?: string; email?: string }) {
  console.log(`Supabase: Attempting to create or get profile for user ${userId}`);
  // Example: Check if profile exists, if not, create it.
  // IMPORTANT: Implement proper RLS (Row Level Security) policies in your Supabase project
  // to ensure users can only access/modify their own profiles.
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') { // No rows found
      console.log(`Supabase: Profile for ${userId} not found, creating new one.`);
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([{ id: userId, ...props }])
        .select()
        .single();

      if (createError) throw createError;
      console.log('Supabase: New profile created:', newProfile);
      return newProfile;
    } else if (error) {
      throw error;
    }
    console.log('Supabase: Existing profile retrieved:', data);
    return data;
  } catch (error) {
    console.error('Supabase: Error in createOrGetProfile:', error);
    throw error;
  }
}

/**
 * Records a product scan event, including the barcode and awarded coins.
 * @param userId The ID of the user who performed the scan.
 * @param barcode The barcode that was scanned.
 * @param coins The number of EcoCoins awarded for this scan.
 */
export async function recordScan(userId: string, barcode: string, coins: number) {
  console.log(`Supabase: Recording scan for user ${userId}, barcode ${barcode}, coins ${coins}`);
  // IMPORTANT: Ensure your 'scans' table has appropriate RLS policies.
  try {
    const { data, error } = await supabase
      .from('scans')
      .insert([{ user_id: userId, barcode: barcode, coins_awarded: coins, scanned_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    console.log('Supabase: Scan recorded successfully:', data);
    return data;
  } catch (error) {
    console.error('Supabase: Error recording scan:', error);
    throw error;
  }
}

/**
 * Retrieves a list of rewards available to the user.
 * This is a stub; in a real app, rewards might be dynamic or based on user level.
 * @returns A list of reward objects.
 */
export async function getRewards() {
  console.log('Supabase: Fetching rewards (stub)');
  // IMPORTANT: RLS for rewards table.
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*');

    if (error) throw error;
    console.log('Supabase: Rewards fetched:', data);
    return data;
  } catch (error) {
    console.error('Supabase: Error fetching rewards:', error);
    throw error;
  }
}

/**
 * Redeems a specific reward for a user.
 * @param userId The ID of the user redeeming the reward.
 * @param rewardId The ID of the reward to redeem.
 */
export async function redeemReward(userId: string, rewardId: string) {
  console.log(`Supabase: Redeeming reward ${rewardId} for user ${userId} (stub)`);
  // IMPORTANT: This function would involve transaction-like logic:
  // 1. Check user's coin balance.
  // 2. Deduct coins.
  // 3. Record the redemption.
  // 4. Ensure atomicity (all or nothing).
  try {
    // Example: Update user's coin balance and record redemption
    // This is highly simplified and needs robust backend logic/Supabase functions
    const { data, error } = await supabase
      .from('redemptions')
      .insert([{ user_id: userId, reward_id: rewardId, redeemed_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    console.log('Supabase: Reward redemption recorded:', data);
    return data;
  } catch (error) {
    console.error('Supabase: Error redeeming reward:', error);
    throw error;
  }
}

// Security Note:
// NEVER store your Supabase `service_role` key in client-side code.
// The `anon` key is safe for client-side use with proper Row Level Security (RLS) enabled.
// Ensure your Supabase RLS policies are correctly configured for all tables.
// For sensitive operations, consider using Supabase Edge Functions or a backend server.
