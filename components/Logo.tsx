// components/Logo.tsx
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function Logo() {
  const { colors } = useTheme();
  
  return (
    <View className="w-16 h-16 mb-6 items-center justify-center rounded-full" style={{ backgroundColor: colors.surface }}>
      <Ionicons 
        name="storefront" 
        size={40} 
        color={colors.primary} 
      />
    </View>
  );
}