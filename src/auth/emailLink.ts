import { auth } from "../firebase/firebaseConfig";

export const actionCodeSettings = {
  
  url: 'https://magic-ede38.firebaseapp.com/finishSignIn', 
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.amitsingh06.Magic', 
  },
  android: {
    packageName: 'com.amitsingh06.Magic', 
    installApp: true,
    minimumVersion: '1',
  },
  
} as const;

export async function sendSignInLink(email: string) {
  try {
    await auth().sendSignInLinkToEmail(email, actionCodeSettings);
    
    return { ok: true };
  } catch (err) {
    console.error('sendSignInLink error', err);
    throw err;
  }
}