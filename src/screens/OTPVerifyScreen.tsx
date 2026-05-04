import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import { useTheme } from '../context/ThemeContext'; // adjust path as needed
import { useVerifyOtpMutation } from '../store/services/apiSlice';
import { replace } from '../navigation/navigationService';

export default function OTPVerifyScreen({ route }: any) {
    const { phone, otp } = route.params;
    const [otpCode, setOtpCode] = useState(otp);

    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const { isDark } = useTheme();
    console.log({ otpCode })
    const onSubmit = async () => {
        try {
            const res = await verifyOtp({
                phone,
                otp: otp,
            }).unwrap();
            if(res?.status) {
                replace('Landing')
            }else {
                Alert.alert('Error', res.message);
            }
           
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
            >
                <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10">
                    <View className={`rounded-2xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        {/* Badge */}
                        <View className="flex-row justify-center mb-4">
                            <View className="flex-row items-center bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2">
                                <View className="bg-blue-500 rounded-full p-1 mr-2">
                                    <Ionicons name="shield-checkmark" size={16} color="white" />
                                </View>
                                <AppText className="text-blue-600 dark:text-blue-400 font-semibold">
                                    Verify Your Account
                                </AppText>
                            </View>
                        </View>

                        <AppText className={`text-2xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            OTP Verification
                        </AppText>
                        <AppText className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Enter the OTP sent to {phone}
                        </AppText>
                        <View className="mb-6">
                            <View
                                className="flex-row items-center border rounded-xl p-4 py-6  border-gray-300"
                            >
                                <Ionicons
                                    name="key-outline"
                                    size={20}
                                    color={'#9ca3af'}
                                />
                                <AppText className="ml-2 text-gray-500 dark:text-gray-400">
                                    {otpCode}
                                </AppText>
                            </View>



                        </View>


                        <AppButton
                            title="Verify"
                            loading={isLoading}
                            onPress={onSubmit}
                        />

                        {/* Resend link (optional) */}
                        <TouchableOpacity className="mt-6 self-center">
                            <AppText className="text-blue-500 dark:text-blue-400">
                                Didn't receive the code? Resend
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}