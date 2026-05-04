import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'; // or Ionicons

const HeroSection = () => {
    return (
        <LinearGradient
            colors={['#1e3a8a', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-b-3xl py-12 px-4"
        >
            <View className="items-center justify-center">
                {/* Title */}
                <Text className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-sm">
                    #1 Platform for Saudi Jobs
                </Text>

                {/* Description */}
                <Text className="font-sans text-base sm:text-lg md:text-xl text-blue-100 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
                    Apply for jobs in Saudi Arabia with verified employers. We connect Bangladeshi workforce with high-demand Saudi Jobs.
                </Text>

                {/* Search Form */}
                <View className="max-w-3xl w-full mx-auto px-2 sm:px-4">
                    <View className="flex-row items-center bg-white dark:bg-gray-700 rounded-full shadow-md px-2 py-2 focus-within:ring-2 ring-blue-500">
                        <TextInput
                            placeholder="Search Job"
                            placeholderTextColor="#9ca3af"
                            className="flex-1 bg-transparent text-gray-700 dark:text-white px-3 py-1 text-xl sm:text-2xl rounded-full"
                        />
                        <TouchableOpacity
                            className="w-10 h-10 sm:w-12 sm:h-12 items-center justify-center bg-blue-500 rounded-full ml-2"
                            onPress={() => console.log('Search')}
                        >
                            <Icon name="search" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

export default HeroSection;