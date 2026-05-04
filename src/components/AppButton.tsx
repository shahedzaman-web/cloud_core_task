import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    loading?: boolean;
};

export default function AppButton({ title, onPress, loading }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading}
            className="bg-blue-600 py-3 rounded-xl items-center"
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text className="text-white font-semibold text-base">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}