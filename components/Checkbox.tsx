// components/Checkbox.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { CheckboxProps } from '../types';

export default function Checkbox({ checked, onPress, label }: CheckboxProps) {
  const { colors } = useTheme();
  
  return (
    <Pressable onPress={onPress} className="flex-row items-center">
      <View 
        style={[
          styles.checkbox,
          { 
            backgroundColor: checked ? colors.primary : 'transparent',
            borderColor: checked ? colors.primary : colors.border 
          }
        ]}
        className="w-5 h-5 rounded border-2 items-center justify-center"
      >
        {checked && (
          <Ionicons 
            name="checkmark" 
            size={14} 
            color={colors.background} 
          />
        )}
      </View>
      <Text style={{ color: colors.text }} className="ml-2">
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {},
});