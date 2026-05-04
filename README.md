Here is a clean, production-ready `README.md` file version of your content with improved structure, consistency, and formatting:

---

# 📱 BHC Jobs – React Native Job Portal App

A full-featured **job portal mobile application** built using **React Native CLI**, connecting job seekers with verified employers in Saudi Arabia.

The app delivers a modern experience with authentication, job discovery, company insights, and seamless dark/light theming.

---

## ✨ Features

* 🔐 **Authentication System**

  * Sign up, login, OTP verification
  * Password recovery

* 🔎 **Job Discovery**

  * Browse by industry
  * Search & filter jobs
  * Personalized recommendations

* 🏢 **Company Profiles**

  * View companies
  * Explore open positions

* 🌓 **Dark / Light Mode**

  * System preference detection
  * Manual toggle support

* 📱 **Responsive UI**

  * Optimized for Android & iOS

* ⚡ **Real-time Data**

  * Powered by RTK Query (caching + auto refetch)

---

## 🚀 Quick Start

### 📋 Prerequisites

Ensure the following are installed:

* Node.js (v16+)
* npm or yarn
* React Native CLI

  ```bash
  npm install -g react-native-cli
  ```
* Android Studio (Android development)
* Xcode (iOS – macOS only)
* JDK 11

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bhc-jobs-mobile.git
cd bhc-jobs-mobile
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Install iOS dependencies (macOS only)

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### 4. Setup environment variables

Create a `.env` file in root:

```env
API_BASE_URL=https://dev.bhcjobs.com
API_TIMEOUT=30000
```

---

## ▶️ Running the App

### Start Metro

```bash
npm start
# or
yarn start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

> ⏳ First build may take several minutes.

---

## 📁 Project Structure

```
bhc-jobs-mobile/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens
│   ├── navigation/      # Navigation setup
│   ├── store/           # Redux + RTK Query
│   ├── context/         # Theme context
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Helpers
│   ├── constants/       # App constants
│   └── types/           # TypeScript types
├── android/
├── ios/
├── assets/
├── .env
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── package.json
```

---

## 🎨 Styling (NativeWind)

Uses **NativeWind (Tailwind CSS for React Native)**

```tsx
<View className="flex-1 bg-white dark:bg-gray-900">
  <Text className="text-xl font-bold text-gray-800 dark:text-white">
    Hello World
  </Text>
</View>
```

* Supports `dark:` variants
* Utility-first styling

---

## 🌓 Dark Mode

Implemented via **React Context**

```tsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <Text className={isDark ? 'text-white' : 'text-gray-800'}>
        Themed text
      </Text>
    </View>
  );
};
```

💡 Tip: Persist using AsyncStorage for better UX.

---

## 🔐 Authentication Flow

1. **Registration**

   * name, email, phone
   * passport number, DOB, gender
   * password

2. **OTP Verification**

   * Phone-based OTP confirmation

3. **Login**

   * Email/phone + password

4. **Token Handling**

   * JWT stored in Redux
   * Auto-attached to API requests

---

## 📡 API Integration (RTK Query)

Centralized API layer via RTK Query:

```tsx
const { data, isLoading, error } = useGetJobsQuery();
```

### Error Handling

`getErrorMessage()` utility:

* Handles API errors
* Handles network failures
* Extracts user-friendly messages

---

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### E2E Testing

Use Detox (manual setup required)

---

## 📦 Production Build

### Android

```bash
cd android

# APK
./gradlew assembleRelease

# AAB (Play Store)
./gradlew bundleRelease
```

📍 Output:

```
android/app/build/outputs/
```

---

### iOS

1. Open workspace:

   ```
   ios/BhcJobs.xcworkspace
   ```
2. Select device
3. Product → Archive
4. Export IPA via Xcode

---

## 🐛 Troubleshooting

| Issue                      | Solution                               |
| -------------------------- | -------------------------------------- |
| Metro cache issue          | `npx react-native start --reset-cache` |
| Android SDK error          | Add `sdk.dir` in `local.properties`    |
| iOS build error            | `pod deintegrate && pod install`       |
| API not working (emulator) | `adb reverse tcp:8081 tcp:8081`        |
| Dark mode not persisting   | Use AsyncStorage                       |

---

## 📄 License

This project is **proprietary and confidential**.
Unauthorized use, copying, or distribution is prohibited.

---

## 🙏 Acknowledgments

* React Native
* Redux Toolkit & RTK Query
* NativeWind
* React Navigation

---

## ❤️ Built With

Crafted using **React Native CLI**

---

**Last Updated:** May 2026

