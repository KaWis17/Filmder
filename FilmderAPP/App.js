/**
 * @module main
 */
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './backend/AuthProvider';

import Navigation from './screens/Navigation/BottomTabNavigation';


/**
 * Main function that is running the whole program. 
 * 
 * The navigation is wrapped in the Authentication Provider,
 * which will be used mainly to authenticate user
 * and pass down all the necessary information about user.
 */
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
