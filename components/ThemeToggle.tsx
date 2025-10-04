// components/ThemeToggle.tsx
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme, colors } = useTheme();
  
  return (
    <Pressable 
      onPress={toggleTheme}
      className="w-10 h-10 items-center justify-center rounded-full"
      style={{ backgroundColor: colors.surface }}
    >
      <Ionicons 
        name={isDark ? 'sunny' : 'moon'} 
        size={20} 
        color={colors.text} 
      />
    </Pressable>
  );
}