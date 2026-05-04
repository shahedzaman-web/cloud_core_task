import { Text } from 'react-native';
import clsx from 'clsx';
import { useTheme } from '../context/ThemeContext';
type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function AppText({ children, className }: Props) {
      const { isDark } = useTheme();
    return (
        <Text className={clsx( isDark ? 'text-white' : 'text-gray-500', className)
        }>
            {children}
        </Text >
    );
}