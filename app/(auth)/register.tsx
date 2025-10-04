// app/(auth)/register.tsx
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import SocialButton from '../../components/SocialButton';
import ThemeToggle from '../../components/ThemeToggle';

export default function Register() {
  const router = useRouter();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }} 
      className="flex-1"
    >
      <View className="pt-12 px-6 flex-row justify-between items-center">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemeToggle />
      </View>

      <View className="items-center mt-8 px-6">
        <Logo />
        <Text style={{ color: colors.text }} className="text-2xl font-bold">
          Create Your Account
        </Text>
      </View>

      <View className="px-6 mt-8 gap-4">
        <Input
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Input
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <Checkbox
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          label="Remember me"
        />

        <Pressable 
          style={{ backgroundColor: colors.primary }}
          className="rounded-full py-3.5 mt-4"
        >
          <Text 
            style={{ color: colors.background }}
            className="text-center font-semibold text-base"
          >
            Sign up
          </Text>
        </Pressable>

        <View className="flex-row items-center my-2">
          <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
          <Text style={{ color: colors.textSecondary }} className="mx-4">
            or continue with
          </Text>
          <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
        </View>

        <View className="flex-row justify-center gap-4 mt-2">
          <SocialButton icon="google" variant="icon" />
          <SocialButton icon="facebook" variant="icon" />
        </View>

        <View className="flex-row justify-center mt-6 mb-8">
          <Text style={{ color: colors.textSecondary }}>
            Already have an account?{' '}
          </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text style={{ color: colors.text }} className="font-semibold">
                Sign in
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}