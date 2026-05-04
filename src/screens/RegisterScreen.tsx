import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import { useTheme } from '../context/ThemeContext';
import { navigate, replace } from '../navigation/navigationService';
import { useRegisterMutation } from '../store/services/apiSlice';

type FormData = {
    name: string;
    email: string;
    phone: string;
    passport_number: string;
    dob: string;
    gender: string;
    password: string;
    confirm_password: string;
};

export default function RegisterScreenContent() {

    const { isDark } = useTheme();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormData>();

    const [register, { isLoading }] = useRegisterMutation();

    const [showDate, setShowDate] = useState(false);
    const [showGender, setShowGender] = useState(false);

    const dob = watch('dob');
    const gender = watch('gender');

    const onSubmit = async (data: FormData) => {
        try {
            const res = await register(data).unwrap();
            if (res.status) {
                replace('OTPVerify', {
                    phone: data.phone,
                    otp: res.data.otp
                });
            } else {
                Alert.alert('Error', JSON.stringify(res.error, null, 2));
            }
        } catch (e) {
            console.log('Register error:', e);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <ScrollView contentContainerClassName="px-6 py-10" showsVerticalScrollIndicator={false}>
                {/* Card Container */}
                <View className={`rounded-2xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    {/* Job Seeker Badge */}
                    <View className="flex-row justify-center mb-4">
                        <View className="flex-row items-center bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2">
                            <View className="bg-blue-500 rounded-full p-1 mr-2">
                                <Ionicons name="person-add" size={16} color="white" />
                            </View>
                            <AppText className="text-blue-600 dark:text-blue-400 font-semibold">
                                Create New Account
                            </AppText>
                        </View>
                    </View>

                    <AppText className={`text-2xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Get Started
                    </AppText>

                    {/* NAME */}
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: 'Full name is required' }}
                        render={({ field }) => (
                            <AppInput
                                required
                                label="Full Name"
                                icon="person-outline"
                                placeholder="Enter your full name"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.name?.message}
                                autoCapitalize="words"
                                returnKeyType="next"
                                containerClassName={isDark ? 'bg-gray-700' : ''}
                            />
                        )}
                    />

                    {/* EMAIL */}
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: 'Email is required' }}
                        render={({ field }) => (
                            <AppInput
                                required
                                label="Email Address"
                                icon="mail-outline"
                                placeholder="example@mail.com"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.email?.message}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                containerClassName={isDark ? 'bg-gray-700' : ''}
                            />
                        )}
                    />

                    {/* PHONE */}
                    <Controller
                        control={control}
                        name="phone"
                        rules={{ required: 'Phone is required' }}
                        render={({ field }) => (
                            <AppInput
                                required
                                label="Phone Number"
                                icon="call-outline"
                                placeholder="01XXXXXXXXX"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.phone?.message}
                                keyboardType="phone-pad"
                                returnKeyType="next"
                                containerClassName={isDark ? 'bg-gray-700' : ''}
                                maxLength={11}
                            />
                        )}
                    />

                    {/* PASSPORT */}
                    <Controller
                        control={control}
                        name="passport_number"
                        render={({ field }) => (
                            <AppInput
                                required
                                label="Passport Number"
                                icon="card-outline"
                                placeholder="Passport number"
                                value={field.value}
                                onChange={field.onChange}
                                autoCapitalize="characters"
                                returnKeyType="next"
                                containerClassName={isDark ? 'bg-gray-700' : ''}
                                maxLength={9}
                            />
                        )}
                    />

                    {/* DOB */}
                    <Pressable onPress={() => setShowDate(true)}>
                        <AppInput
                            required
                            label="Date of Birth"
                            icon="calendar-outline"
                            placeholder="Select date of birth"
                            value={dob ? new Date(dob).toISOString().split('T')[0] : ''}
                            onChange={() => { }}
                            editable={false}
                            containerClassName={isDark ? 'bg-gray-700' : ''}
                        />
                    </Pressable>

                    {showDate && (
                        <DateTimePicker
                            value={dob ? new Date(dob) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDate(false);
                                if (selectedDate) {
                                    setValue('dob', moment(selectedDate).format('YYYY-MM-DD'));
                                }
                            }}
                        />
                    )}

                    {/* GENDER */}
                    <Pressable onPress={() => setShowGender(true)}>
                        <AppInput
                            required
                            label="Gender"
                            icon="male-female-outline"
                            placeholder="Select gender"
                            value={gender || ''}
                            onChange={() => { }}
                            editable={false}
                            containerClassName={isDark ? 'bg-gray-700' : ''}
                        />
                    </Pressable>

                    <Modal visible={showGender} transparent animationType="fade">
                        <Pressable
                            className="flex-1 justify-center items-center bg-black/50"
                            onPress={() => setShowGender(false)}
                        >
                            <View className={`w-64 rounded-xl p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                <Pressable
                                    onPress={() => {
                                        setValue('gender', 'male');
                                        setShowGender(false);
                                    }}
                                    className="p-3"
                                >
                                    <AppText className={isDark ? 'text-white' : 'text-gray-800'}>Male</AppText>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        setValue('gender', 'female');
                                        setShowGender(false);
                                    }}
                                    className="p-3"
                                >
                                    <AppText className={isDark ? 'text-white' : 'text-gray-800'}>Female</AppText>
                                </Pressable>
                            </View>
                        </Pressable>
                    </Modal>

                    {/* PASSWORD */}
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => (
                            <AppInput
                                required
                                label="Password"
                                icon="lock-closed-outline"
                                placeholder="Enter password"
                                value={field.value}
                                onChange={field.onChange}
                                secure
                                error={errors.password?.message}
                                returnKeyType="next"
                                containerClassName={isDark ? 'bg-gray-700' : ''}
                            />
                        )}
                    />

                    {/* CONFIRM PASSWORD */}
                    <Controller
                        control={control}
                        name="confirm_password"
                        rules={{ required: 'Confirm password is required' }}
                        render={({ field }) => (
                            <AppInput
                                required
                                label="Confirm Password"
                                icon="lock-closed-outline"
                                placeholder="Confirm password"
                                value={field.value}
                                onChange={field.onChange}
                                secure
                                error={errors.confirm_password?.message}
                                returnKeyType="done"
                                containerClassName={isDark ? 'bg-gray-700' : ''}
                            />
                        )}
                    />

                    {/* SUBMIT */}
                    <AppButton
                        title="Register"
                        loading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                    />

                    {/* Login Link */}
                    <View className="flex-row justify-center mt-6">
                        <AppText className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            Already have an account?
                        </AppText>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <AppText className="text-blue-500 dark:text-blue-400 font-semibold ml-1">
                                Sign In
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};