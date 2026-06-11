import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { registerUser } from '../../services/authService';
import EditTextInput from '../../components/EditTextInput';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Fill all fields',
      });
      return;
    }

    try {
      await registerUser(
        email,
        password,
      );
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
      });

      navigation.goBack();
    } catch (error) {
      console.error('Registration Failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Create Account 🚀
        </Text>

        <EditTextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <EditTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <EditTextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }>
          <Text style={styles.loginLink}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#4A6CF7',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4A6CF7',
    fontWeight: '600',
  },
});