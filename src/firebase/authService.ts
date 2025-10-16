
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { auth } from './firebaseConfig';

const actionCodeSettings = {
  url: 'magic-ede38.firebaseapp.com', 
  handleCodeInApp: true,
  android: {
    packageName: 'com.amitsingh06.Magic', 
    installApp: true,
    minimumVersion: '1',
  },
};


export async function sendMagicLink(email: string): Promise<void> {
  try {
    
    await SecureStore.setItemAsync('emailForSignIn', email);

    await auth().sendSignInLinkToEmail(email, actionCodeSettings);

    alert('Magic link sent! Check your email.');
  } catch (error: any) {
    console.error('Error sending magic link:', error);
    alert(`Error sending magic link: ${error.message}`);
  }
}


export async function completeSignIn(url: string): Promise<void> {
  try {
    if (!auth().isSignInWithEmailLink(url)) return;

    
    let email = await SecureStore.getItemAsync('emailForSignIn');

    if (!email) {
  email = await new Promise<string>((resolve) => {
    Alert.prompt(
      'Enter your email',
      'Please enter the email you used to sign in',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve('') },
        { text: 'OK', onPress: (value: string | undefined) => resolve(value || '') },
      ],
      'plain-text'
    );
  });
}

    if (!email) {
      alert('Email is required to complete sign-in.');
      return;
    }

    
    const userCredential = await auth().signInWithEmailLink(email, url);

    
    await SecureStore.deleteItemAsync('emailForSignIn');

    alert(`Welcome, ${userCredential.user.email}!`);
    console.log('Signed in user:', userCredential.user);
  } catch (error: any) {
    console.error('Error completing sign-in:', error);
    alert(`Error completing sign-in: ${error.message}`);
  }
}
