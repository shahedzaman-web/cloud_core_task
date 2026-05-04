
import "./global.css"
import { Provider } from 'react-redux';
import store, { persistor, } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>} persistor={persistor}>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider >
  );
}