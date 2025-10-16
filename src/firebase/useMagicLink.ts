
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { completeSignIn } from './authService';

export function useMagicLink() {
  useEffect(() => {
    
    Linking.getInitialURL().then((url) => {
      if (url) completeSignIn(url);
    });

    
    const subscription = Linking.addEventListener('url', (event) => {
      completeSignIn(event.url);
    });

    return () => subscription.remove();
  }, []);
}
