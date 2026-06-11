import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { loginUser } from '../../services/authService';
import EditTextInput from '../../components/EditTextInput';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please enter email and password',
      });
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);

      navigation.replace('Home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Login to continue
        </Text>

        <EditTextInput
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
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
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>
              Login
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register')
          }>
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },
  subtitle: {
    color: '#666',
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#4A6CF7',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4A6CF7',
    fontWeight: '600',
  },
});