import { AsyncStorage } from "../firebase/firebaseConfig";

const KEY = 'emailForSignIn';

export const saveEmailForSignIn = (email: string) =>
  AsyncStorage.setItem(KEY, email);

export const getSavedEmail = async () => AsyncStorage.getItem(KEY);

export const removeSavedEmail = async () => AsyncStorage.removeItem(KEY);