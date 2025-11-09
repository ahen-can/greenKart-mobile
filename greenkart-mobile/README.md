# GreenKart Mobile

This is an Expo-managed React Native application (TypeScript) for GreenKart, focusing on eco-friendly product scanning and rewards.

## Features

*   **Bottom-tab navigation:** Home, Scan, Rewards, Profile.
*   **Live barcode scanning:** Using `expo-barcode-scanner`.
*   **Product lookup:** Via OpenFoodFacts API.
*   **Supabase integration:** Client configuration and sample read/write stubs.
*   **Product display screen:** Shows product details and allows awarding EcoCoins.
*   **EcoCoins awarding logic:** Based on product eco-score.
*   **Placeholder screens:** For Home, Rewards, and Profile.

## Project Structure

```
greenkart-mobile/
├─ README.md
├─ package.json
├─ app.json
├─ tsconfig.json
├─ babel.config.js
├─ src/
│  ├─ App.tsx                         # Entry point, NavigationContainer
│  ├─ navigation/
│  │   └─ MainNavigator.tsx           # Bottom-tab navigator
│  ├─ screens/
│  │   ├─ HomeScreen.tsx
│  │   ├─ ScanScreen.tsx              # Barcode scanner
│  │   ├─ ProductScreen.tsx           # Displays product details
│  │   ├─ RewardsScreen.tsx
│  │   └─ ProfileScreen.tsx
│  ├─ components/
│  │   ├─ ScannerComponent.tsx        # Wrapper for BarCodeScanner + ROI overlay
│  │   └─ ProductCard.tsx             # Reusable product display component
│  ├─ lib/
│  │   ├─ supabase.ts                 # Supabase client and stub functions
│  │   └─ openfoodfacts.ts            # Product lookup function
│  └─ utils/
│      └─ ecoscore.ts                 # EcoCoin awarding logic
└─ assets/
   └─ app-icon.png                    # Placeholder app icon
   └─ splash.png                      # Placeholder splash screen
   └─ adaptive-icon.png               # Placeholder adaptive icon
```

## Setup Instructions

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or Yarn
*   Expo CLI (`npm install -g expo-cli` if you don't have it)
*   Expo Go app installed on your physical device (iOS or Android) for testing.

### Installation

1.  **Navigate to the project directory:**
    ```bash
    cd greenkart-mobile
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```

### Environment Configuration (Supabase)

This project uses Supabase for backend services. You'll need to set up your Supabase project and provide the API keys.

1.  **Create a `.env` file:**
    Create a file named `.env` in the root of the `greenkart-mobile` directory.
2.  **Add your Supabase credentials:**
    Copy the contents of `.env.example` into your new `.env` file and replace the placeholder values with your actual Supabase project URL and `anon` key.

    ```
    EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    *   You can find these in your Supabase project settings under "API".
    *   **Important:** Never use your `service_role` key in client-side code. The `anon` key is safe for client-side use with proper Row Level Security (RLS) enabled in your Supabase project.

3.  **Configure `app.json` (Optional, for EAS Build/Publish):**
    If you plan to build or publish your app with EAS (Expo Application Services), you might want to embed these variables directly into `app.json`'s `extra` field for easier management during builds.

    ```json
    {
      "expo": {
        "extra": {
          "EXPO_PUBLIC_SUPABASE_URL": "YOUR_SUPABASE_PROJECT_URL",
          "EXPO_PUBLIC_SUPABASE_ANON_KEY": "YOUR_SUPABASE_ANON_KEY",
          "eas": {
            "projectId": "your-eas-project-id"
          }
        }
      }
    }
    ```
    *   **Note:** For local development with `npx expo start`, the `.env` file is sufficient. For EAS builds, `app.json` or environment variables configured in EAS are typically used.

### Camera Permissions (iOS)

For iOS, you need to explicitly declare camera usage in `app.json`. This has already been added:

```json
"ios": {
  "supportsTablet": true,
  "bundleIdentifier": "com.yourcompany.greenkartmobile",
  "infoPlist": {
    "NSCameraUsageDescription": "This app uses the camera to scan barcodes for product information."
  }
},
```

## Running the Application

1.  **Start the Expo development server:**
    ```bash
    npx expo start
    ```
    This will open a new tab in your browser with the Expo Dev Tools.
2.  **Open on your device:**
    *   **Using Expo Go:** Scan the QR code displayed in your terminal or the Expo Dev Tools page with the Expo Go app on your phone.
    *   **Using a simulator/emulator:** You can also choose to run on an iOS simulator or Android emulator from the Expo Dev Tools.

## Testing Barcode Scanning

*   Navigate to the "Scan" tab.
*   Grant camera permissions when prompted.
*   Point your device's camera at a barcode (e.g., a product in your home, or search for "UPC barcode" online and display it on another screen).
*   The app should detect the barcode and navigate to the `ProductScreen` displaying the scanned data.

## Building and Publishing (EAS)

*   **EAS Build:** To create a standalone build for iOS or Android, you'll use Expo Application Services (EAS).
    ```bash
    eas build -p ios # for iOS
    eas build -p android # for Android
    ```
    You'll need to configure `eas.json` and have an Expo account.
*   **EAS Update:** To publish over-the-air updates to your app, use `eas update`.
    ```bash
    eas update
    ```

## Detox Testing

Detox is a powerful end-to-end testing framework for React Native. While this scaffold doesn't include Detox setup, it's important to note:

*   Detox works by building your native app and running tests directly on a device or simulator.
*   Setting up Detox involves native build steps and configuration specific to iOS and Android projects.
*   If you'd like to add Detox testing, please ask, and I can walk you through the specifics of integrating it into this Expo project.

## Manual Product Add / Camera Photo Fallback

*   **Manual Product Add:** Currently not implemented but can be added to `ScanScreen.tsx` as an alternative input method if barcode scanning fails or is unavailable.
*   **Camera Photo Fallback:** `expo-image-picker` has been installed. This can be integrated into `ScanScreen.tsx` to allow users to take a photo of a barcode if live scanning is problematic, then process the image for barcode detection. This would require additional logic to integrate an image-based barcode reader (e.g., `zxing-wasm` or a cloud-based API).
