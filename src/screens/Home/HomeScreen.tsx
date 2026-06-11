import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

import {logoutUser} from '../../services/authService';

export default function HomeScreen() {
  return (
    <View>
      <Text>
        Welcome AI Assistant
      </Text>

      <Button
        title="Logout"
        onPress={logoutUser}
      />
    </View>
  );
}