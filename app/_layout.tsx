
import LinkListener from '@/src/components/LinkListener';
import { Stack } from 'expo-router';
import React from 'react';


export default function RootLayout() {
  return (
    <>
      <LinkListener />
      <Stack />
    </>
  );
}
