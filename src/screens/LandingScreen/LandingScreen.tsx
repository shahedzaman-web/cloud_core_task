import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { navigate } from '../../navigation/navigationService';
import {
    useGetCompaniesQuery,
    useGetIndustriesQuery,
    useGetJobsQuery,
} from '../../store/services/apiSlice';
import { logout, useAuthSelector } from '../../store/slices/authSlice';
import { getImageUrl } from '../../utils/image';
import HeroSection from './HeroSection';


// ==================== Header Component ====================
const AppHeader = () => {

    const { isDark, toggleTheme } = useTheme();
    const { isAuthenticated } = useAuthSelector()
    const dispatch = useDispatch();


    return (
        <View className={`flex-row justify-between items-center px-4 py-3 ${isDark ? 'bg-gray-900' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            {/* App Logo */}
            <Image
                source={{ uri: "https://bhcjobs.com/images/logo_day_mode.png" }}
                className="w-24 h-10"
                resizeMode="contain"
            />
            <View className="flex-row items-center gap-4">
                {/* Theme Toggle Button */}
                <TouchableOpacity onPress={toggleTheme} >
                    <Ionicons
                        name={isDark ? 'sunny' : 'moon'}
                        size={24}
                        color={isDark ? '#fbbf24' : '#4b5563'}
                    />
                </TouchableOpacity>

                {/* Login / Avatar */}
                {isAuthenticated ? (
                    <View className='flex-row items-center gap-3'>

                        <Ionicons name="person-circle" size={28} color={isDark ? '#fbbf24' : '#4b5563'} />

                        <TouchableOpacity onPress={() => {
                            dispatch(logout())
                        }}>
                            <Ionicons name="log-out" size={28} color={isDark ? '#fbbf24' : '#4b5563'} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => navigate('Login')}
                        className="bg-blue-600 px-4 py-2 rounded-full"
                    >
                        <Text className="text-white font-semibold">Login</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// ==================== Industry Card ====================
const IndustryCard = ({ industry }: { industry: any }) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm mr-4 p-3 items-center w-32`}>
            <Image
                source={{ uri: getImageUrl('industry-image', industry.image) }}
                className="w-20 h-20 rounded-lg mb-2"
                resizeMode="cover"
            />
            <Text className={`text-sm font-semibold text-center ${isDark ? 'text-white' : 'text-gray-800'}`} numberOfLines={1}>
                {industry.name}
            </Text>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                {industry.jobs_count} jobs
            </Text>
        </TouchableOpacity>
    );
};

// ==================== Industries Section ====================
const IndustriesSection = ({ industries, isLoading }: { industries: any[]; isLoading: boolean }) => {
    const { isDark } = useTheme();

    if (isLoading) {
        return (
            <View className="flex-row px-4">
                {[1, 2, 3].map((item) => (
                    <View key={item} className="mr-4 w-32">
                        <View className={`w-20 h-20 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg mb-2`} />
                        <View className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-full mb-1`} />
                        <View className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`} />
                    </View>
                ))}
            </View>
        );
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pl-4"
            className="flex-row"
        >
            {industries.map((industry: any) => (
                <IndustryCard key={industry.id} industry={industry} />
            ))}
        </ScrollView>
    );
};

// ==================== Job Card ====================
const JobCard = ({ job }: { job: any }) => {
    const { isDark } = useTheme();
    const companyLogo = job.company?.image ? getImageUrl('company-image', job.company.image) : null;

    return (
        <TouchableOpacity className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-4 mb-3 mx-4`}>
            <View className="flex-row">
                {companyLogo && (
                    <Image
                        source={{ uri: companyLogo }}
                        className="w-14 h-14 rounded-lg mr-3"
                        resizeMode="contain"
                    />
                )}
                <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                        <View className="flex-1">
                            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>
                                {job.job_title}
                            </Text>
                            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                                {job.company_name}
                            </Text>
                            <View className="flex-row items-center mt-1">
                                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {job.country?.name || 'Saudi Arabia'}
                                </Text>
                                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mx-2`}>•</Text>
                                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {job.employment_type?.replace('_', ' ')}
                                </Text>
                            </View>
                        </View>
                        {job.is_hot === 1 && (
                            <View className="bg-red-500 rounded-full px-2 py-1">
                                <Text className="text-xs text-white font-bold">HOT</Text>
                            </View>
                        )}
                    </View>
                    <View className={`flex-row justify-between items-center mt-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                        <Text className="text-blue-600 font-bold">
                            {job.currency} {job.min_salary?.toLocaleString()}
                            {job.max_salary ? ` - ${job.max_salary.toLocaleString()}` : '+'}
                            <Text className="text-gray-500 text-xs font-normal">/{job.salary_type}</Text>
                        </Text>
                        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {job.vacancy} vacancy{job.vacancy > 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// ==================== Company Card ====================
const CompanyCard = ({ company }: { company: any }) => {
    const { isDark } = useTheme();
    return (
        <TouchableOpacity className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm mr-4 p-4 items-center w-36`}>
            <Image
                source={{ uri: getImageUrl('company-image', company.image) }}
                className="w-16 h-16 rounded-full mb-2"
                resizeMode="contain"
            />
            <Text className={`text-sm font-semibold text-center ${isDark ? 'text-white' : 'text-gray-800'}`} numberOfLines={1}>
                {company.name}
            </Text>
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                {company.jobs_count} open position{company.jobs_count !== 1 ? 's' : ''}
            </Text>
        </TouchableOpacity>
    );
};

// ==================== Companies Section ====================
const CompaniesSection = ({ companies, isLoading }: { companies: any[]; isLoading: boolean }) => {
    const { isDark } = useTheme();

    if (isLoading) {
        return (
            <View className="flex-row px-4">
                {[1, 2, 3].map((item) => (
                    <View key={item} className="mr-4 w-36">
                        <View className={`w-16 h-16 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-2`} />
                        <View className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-full mb-1`} />
                        <View className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`} />
                    </View>
                ))}
            </View>
        );
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pl-4"
            className="flex-row"
        >
            {companies.map((company: any) => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </ScrollView>
    );
};

// ==================== Section Header ====================
const SectionHeader = ({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) => {
    const { isDark } = useTheme();
    return (
        <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</Text>
            {onSeeAll && (
                <TouchableOpacity onPress={onSeeAll}>
                    <Text className="text-blue-600 font-semibold">See All</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

// ==================== Loading Skeleton for Job Items ====================
const JobLoadingSkeleton = () => {
    const { isDark } = useTheme();
    return (
        <View className="px-4">
            {[1, 2].map((item) => (
                <View key={item} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-3 mx-4`}>
                    <View className="flex-row">
                        <View className={`w-14 h-14 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg mr-3`} />
                        <View className="flex-1">
                            <View className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-2`} />
                            <View className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2 mb-3`} />
                            <View className={`h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded`} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

// ==================== Main Landing Screen ====================
const LandingScreenContent = () => {
    const { isDark } = useTheme();

    const {
        data: industries,
        isLoading: industriesLoading,
        error: industriesError,
    } = useGetIndustriesQuery();
    const {
        data: jobs,
        isLoading: jobsLoading,
        error: jobsError,
    } = useGetJobsQuery();
    const {
        data: companies,
        isLoading: companiesLoading,
        error: companiesError,
    } = useGetCompaniesQuery();

    // Sort industries by priority
    const sortedIndustries = React.useMemo(() => {
        if (!industries) return [];
        return [...industries].sort((a, b) => a.priority - b.priority);
    }, [industries]);

    // Get top 10 active jobs 
    const topJobs = React.useMemo(() => {
        if (!jobs) return [];

        return jobs.slice(0, 10);

    }, [jobs]);

    // Top 5 companies
    const topCompanies = React.useMemo(() => {
        if (!companies) return [];
        return companies.slice(0, 5);
    }, [companies]);

    const handleSeeAllIndustries = () => console.log('See all industries');
    const handleSeeAllJobs = () => console.log('See all jobs');
    const handleSeeAllCompanies = () => console.log('See all companies');

    if (industriesLoading && jobsLoading && companiesLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    if (industriesError || jobsError || companiesError) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-500 text-center mb-4">
                    Failed to load data. Please check your connection.
                </Text>
                <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
                    <Text className="text-white font-semibold">Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const ListHeader = () => (
        <>
            <HeroSection />
            <View className="mt-8">
                <SectionHeader title="Popular Industries" onSeeAll={handleSeeAllIndustries} />
                <IndustriesSection industries={sortedIndustries} isLoading={industriesLoading} />
            </View>
            <View className="mt-8">
                <SectionHeader title="Recommended Jobs" onSeeAll={handleSeeAllJobs} />
            </View>
        </>
    );

    const ListFooter = () => (
        <>
            <View className="mt-4">
                <SectionHeader title="Popular Companies" onSeeAll={handleSeeAllCompanies} />
                <CompaniesSection companies={topCompanies} isLoading={companiesLoading} />
            </View>
            <View className="h-6" />
        </>
    );

    const renderJobItem = ({ item }: { item: any }) => <JobCard job={item} />;

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <AppHeader />
            <FlatList
                data={topJobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderJobItem}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListFooter}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    jobsLoading ? (
                        <JobLoadingSkeleton />
                    ) : (
                        <View className="items-center py-8">
                            <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                No jobs available at the moment
                            </Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

export default LandingScreenContent;