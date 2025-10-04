// components/SocialButton.tsx
import { Pressable, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { SocialButtonProps } from '../types';

export default function SocialButton({ 
  icon, 
  text, 
  variant = 'outline',
  onPress 
}: SocialButtonProps) {
  const { colors } = useTheme();

  const iconMap = {
    google: { 
      type: 'image' as const, 
      source: require('../assets/google.png') 
    },
    facebook: { 
      type: 'ionicon' as const, 
      name: 'logo-facebook' as const, 
      color: variant === 'icon' ? Colors.brand.facebook : 'white' 
    },
    apple: { 
      type: 'ionicon' as const, 
      name: 'logo-apple' as const, 
      color: 'white' 
    }
  };

  const currentIcon = iconMap[icon];

  const getButtonStyle = () => {
    switch (variant) {
      case 'facebook':
        return { backgroundColor: Colors.brand.facebook };
      case 'apple':
        return { backgroundColor: Colors.brand.apple };
      case 'icon':
        return { 
          width: 48, 
          height: 48, 
          borderColor: colors.border,
          backgroundColor: colors.background 
        };
      default:
        return { 
          backgroundColor: colors.background, 
          borderColor: colors.border 
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'facebook' || variant === 'apple') return 'white';
    return colors.text;
  };

  if (variant === 'icon') {
    return (
      <Pressable 
        onPress={onPress}
        style={[styles.iconButton, getButtonStyle()]}
        className="items-center justify-center rounded-full border"
      >
        {currentIcon.type === 'image' ? (
          <Image source={currentIcon.source} className="w-6 h-6" />
        ) : (
          <Ionicons 
            name={currentIcon.name} 
            size={24} 
            color={currentIcon.color} 
          />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable 
      onPress={onPress}
      style={[styles.button, getButtonStyle()]}
      className={`flex-row items-center justify-center rounded-full py-3.5 ${
        variant === 'outline' ? 'border' : ''
      }`}
    >
      {currentIcon.type === 'image' ? (
        <Image source={currentIcon.source} className="w-5 h-5 mr-2" />
      ) : (
        <Ionicons 
          name={currentIcon.name} 
          size={20} 
          color={currentIcon.color} 
        />
      )}
      <Text 
        style={{ color: getTextColor() }}
        className={`font-semibold ${variant !== 'outline' ? 'ml-2' : ''}`}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {},
  iconButton: {},
});