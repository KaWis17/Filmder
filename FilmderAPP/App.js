import React from 'react';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';



export default function App() {

  return (
    <TailwindProvider>
      <NavigationContainer>
          <StackNavigator />
      </NavigationContainer>
    </TailwindProvider>

  );
}

