import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    Animated,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';

const EditTextInput = ({
    label,
    value,
    secureTextEntry = false,
    ...props
}: any) => {
    const [focused, setFocused] = useState(false);
    const [hidePassword, setHidePassword] =
        useState(secureTextEntry);

    const animatedValue = useRef(
        new Animated.Value(value ? 1 : 0),
    ).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: focused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [focused, value, animatedValue]);

    const labelStyle = {
        position: 'absolute' as const,
        left: 15,
        top: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -10],
        }),
        fontSize: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        color: focused ? '#4A6CF7' : '#999',
        zIndex: 1,
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={labelStyle}>
                {label}
            </Animated.Text>

            <TextInput
                {...props}
                value={value}
                secureTextEntry={hidePassword}
                style={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />

            {secureTextEntry && (
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setHidePassword(!hidePassword)}
                >
                    <Text style={{ fontSize: 20 }}>
                        {hidePassword ? '👁️' : '🙈'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EditTextInput;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        position: 'relative',
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingRight: 50,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },

    eyeButton: {
        position: 'absolute',
        right: 15,
        top: 16,
    },
});