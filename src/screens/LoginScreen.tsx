import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Touchable, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLoginMutation } from '../store/services/apiSlice';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { navigate, replace } from '../navigation/navigationService';
import { useTheme } from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
const LoginScreen = () => {
    const { isDark } = useTheme();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [login, { isLoading, }] = useLoginMutation();

    const onSubmit = async (data: any) => {
        try {
            const res = await login(data).unwrap();
            if (res.status) {
                replace('Landing');
            } else {
                Alert.alert('Error', res.message);
            }
            console.log(res);
        } catch (e) {
            console.log(e);

        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10">
                {/* Card Container */}
                <View className={`rounded-2xl shadow-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    {/* Job Seeker Badge */}
                    <View className="flex-row justify-center mb-4">
                        <View className="flex-row items-center bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2">
                            <View className="bg-blue-500 rounded-full p-1 mr-2">
                                <Ionicons name="person" size={16} color="white" />
                            </View>
                            <AppText className={`font-semibold ${isDark ? 'text-slate-500' : 'text-gray-800'}`}>
                                Job Seeker Login
                            </AppText>
                        </View>
                    </View>

                    {/* Title */}
                    <Image
                        source={{ uri: "https://bhcjobs.com/images/logo_day_mode.png" }}
                        className="w-32 h-10 mx-auto mb-4"
                        resizeMode="contain"
                    />
                    <AppText className={`text-2xl font-bold text-center mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Welcome Back 👋
                    </AppText>
                    <AppText className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Login to your account
                    </AppText>

                    {/* Phone */}
                    <Controller
                        control={control}
                        name="phone"
                        rules={{ required: 'Phone is required' }}
                        render={({ field: { onChange, value } }) => (
                            <AppInput
                                label="Mobile Number"
                                required
                                keyboardType="phone-pad"
                                placeholder="01XXXXXXXXX"
                                value={value}
                                onChange={onChange}
                                icon="call-outline"
                                error={errors.phone?.message as string}
                            />
                        )}
                    />

                    {/* Password */}
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'Password is required' }}
                        render={({ field: { onChange, value } }) => (
                            <AppInput
                                label="Password"
                                required
                                placeholder="Enter your password"
                                value={value}
                                onChange={onChange}
                                icon="lock-closed-outline"
                                secure
                                error={errors.password?.message as string}
                            />
                        )}
                    />

                    {/* Forgot Password */}
                    <TouchableOpacity
                        onPress={() => navigate('ForgotPassword')}
                        className="self-end mt-1 mb-4"
                    >
                        <AppText className="text-blue-500 dark:text-blue-400 text-sm font-semibold">
                            Forgot Your Password?
                        </AppText>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <AppButton
                        title="SIGN IN"
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                    />

                    {/* OR Divider */}
                    <View className="flex-row items-center my-5">
                        <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                        <AppText className={`mx-3 ${isDark ? 'text-gray-400' : 'text-gray-500'} font-semibold`}>
                            OR
                        </AppText>
                        <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                    </View>

                    {/* Sign Up Link */}
                    <View className="flex-row justify-center">
                        <AppText className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            New to BhcJobs.com?
                        </AppText>
                        <TouchableOpacity onPress={() => navigate('Register')}>
                            <AppText className="text-blue-500 dark:text-blue-400 font-semibold ml-1">
                                Create an account
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;