import { View, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function Logo() {
  const { isDark } = useTheme();
  
  return (
    <View className="w-16 h-16 mb-6 items-center justify-center">
      <Image 
        source={
          isDark 
            ? require('../assets/logo-dark.png') 
            : require('../assets/logo.png')
        } 
        className="w-full h-full"
        resizeMode="contain"
      />
    </View>
  );
}