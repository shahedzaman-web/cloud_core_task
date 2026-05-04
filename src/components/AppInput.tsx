import { View, TextInput, Text, Pressable } from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from './AppText';
import { useTheme } from '../context/ThemeContext';

type Props = {
    label?: string;
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
    icon: string;
    secure?: boolean;
    error?: string;
    required?: boolean;
    [key: string]: any
};

export default function AppInput({
    placeholder,
    value,
    onChange,
    icon,
    secure,
    error,
    label,
    required = false,
    ...props
}: Props) {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isSecure = secure && !showPassword;
    const { isDark } = useTheme();
    console.log({value})
    return (
        <View className="mb-4">
            {label && <View className='flex-row gap-2 mb-2'>
                <AppText className="mb-1 font-semibold">{label}</AppText>
                {required && <AppText className="mb-1 text-red-500">*</AppText>}
            </View>}
            <View
                className={`flex-row items-center border rounded-xl px-3 py-2 ${focused ? 'border-blue-500' : 'border-gray-300'
                    }`}
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color={focused ? '#3b82f6' : '#9ca3af'}
                />

                <TextInput
                    {...props}
                    placeholder={placeholder}
                    secureTextEntry={isSecure}
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={isDark ? "flex-1 ml-2 text-base text-white" : "flex-1 ml-2 text-base"}
                    placeholderTextColor={isDark ? "#fff" : "#9ca3af"}
                />

                {secure && (
                    <Pressable
                        onPress={() => setShowPassword(prev => !prev)}
                        className="ml-2"
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#9ca3af"
                        />
                    </Pressable>
                )}
            </View>

            {error && (
                <Text className="text-red-500 text-xs mt-1">{error}</Text>
            )}
        </View>
    );
}