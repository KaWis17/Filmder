import React from 'react';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';



export default function App() {

  // Version created as a proof of concept.
  // Strongly inspired by online tutorial: https://www.youtube.com/watch?v=qJaFIGjyRms&t
  
  return (
    <TailwindProvider>
      <NavigationContainer>
          <StackNavigator />
      </NavigationContainer>
    </TailwindProvider>

  );
}

