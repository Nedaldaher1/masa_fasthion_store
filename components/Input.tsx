import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { InputProps } from '../types';

export default function Input({ 
  icon, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  showPassword,
  onTogglePassword,
  keyboardType = 'default'
}: InputProps) {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[styles.container, { backgroundColor: colors.surface }]}
      className="rounded-xl px-4 py-3.5 flex-row items-center"
    >
      {icon && <Ionicons name={icon} size={20} color={colors.textSecondary} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, { color: colors.text }]}
        className="flex-1 ml-3 text-base"
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {onTogglePassword && (
        <Pressable onPress={onTogglePassword}>
          <Ionicons 
            name={showPassword ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color={colors.textSecondary} 
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {},
});