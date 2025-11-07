import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation';
import ThemeProvider from './src/components/ThemeContext';


const App = () => {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
