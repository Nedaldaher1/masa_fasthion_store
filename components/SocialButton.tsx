// components/SocialButton.tsx
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { SocialButtonProps } from '../types';
import CustomText from '../components/CustomText';

export default function SocialButton({ 
  icon, 
  text, 
  variant = 'outline',
  onPress 
}: SocialButtonProps) {
  const { colors } = useTheme();

  const iconMap = {
    google: { 
      name: 'logo-google' as const, 
      color: variant === 'icon' ? '#DB4437' : colors.text 
    },
    facebook: { 
      name: 'logo-facebook' as const, 
      color: variant === 'icon' ? Colors.brand.facebook : 'white' 
    },
    apple: { 
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
        <Ionicons 
          name={currentIcon.name} 
          size={24} 
          color={currentIcon.color} 
        />
      </Pressable>
    );
  }

  return (
    <Pressable 
      onPress={onPress}
      style={[styles.button, getButtonStyle()]}
      className={`flex-row items-center text-center gap-[37px] py-[12px] pr-[76px] pl-[16px]  rounded-lg ${
        variant === 'outline' ? 'border' : ''
      }`}
    >
      <Ionicons 
        name={currentIcon.name} 
        size={20} 
        color={icon === 'google' && variant === 'outline' ? '#DB4437' : currentIcon.color} 
      />
      <CustomText 
        style={{ color: getTextColor() }}
        className="font-semibold ml-6"
      >
        {text}
      </CustomText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {},
  iconButton: {},
});