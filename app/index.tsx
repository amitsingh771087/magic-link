
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { sendSignInLink } from '../src/auth/emailLink';
import { saveEmailForSignIn } from '../src/auth/rememberEmail';

export default function LoginScreen() {
    const [email, setEmail] = useState('');

    const handleSendLink = async () => {
        if (!email.includes('@')) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        try {
            await sendSignInLink(email);
            await saveEmailForSignIn(email);
            Alert.alert(
                'Email Sent',
                'Check your inbox for the magic link to sign in.'
            );
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to send link.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Sign in via Magic Link</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 8,
                }}
                placeholder="Enter your email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Send Magic Link" onPress={handleSendLink} />
        </View>
    );
}
