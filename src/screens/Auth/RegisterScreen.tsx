import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
} from 'react-native';

import {registerUser} from '../../services/authService';

export default function RegisterScreen() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleRegister = async () => {
    try {
      await registerUser(
        email,
        password,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Register"
        onPress={handleRegister}
      />
    </View>
  );
}