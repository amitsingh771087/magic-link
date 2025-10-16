
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { getSavedEmail, removeSavedEmail } from '../auth/rememberEmail';
import { auth } from '../firebase/firebaseConfig';

export default function LinkListener() {
    useEffect(() => {
        const handleLink = async (url: string | null) => {
            if (!url) return;
            console.log('Received link:', url);

            // Check if it's a Firebase email sign-in link
            if (!auth().isSignInWithEmailLink(url)) return;

            const savedEmail = await getSavedEmail();
            if (!savedEmail) {
                Alert.alert(
                    'Missing email',
                    'Please enter the email address you used to sign in.'
                );
                return;
            }

            try {
                const userCredential = await auth().signInWithEmailLink(savedEmail, url);
                console.log('Successfully signed in:', userCredential.user?.email);
                Alert.alert('Success', `Signed in as ${userCredential.user?.email}`);
                await removeSavedEmail();
            } catch (err: any) {
                console.error('Sign-in failed:', err);
                Alert.alert('Error', err.message);
            }
        };

        // Cold start: when app is opened via link
        Linking.getInitialURL().then((url) => handleLink(url));

        // Warm start: when app is already open
        const sub = Linking.addEventListener('url', ({ url }) => handleLink(url));

        return () => {
            sub.remove();
        };
    }, []);

    return null; // No UI — runs silently in background
}
