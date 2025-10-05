// app/(auth)/register.tsx
import { View, ScrollView, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import SocialButton from '../../components/SocialButton';
import ThemeToggle from '../../components/ThemeToggle';
import CustomText from '../../components/CustomText';

export default function Register() {
  const router = useRouter();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
        <CustomText style={{ color: colors.text }} className="text-2xl font-bold">
          إنشاء حساب جديد
        </CustomText>
      </View>

      <View className="px-6 mt-8 gap-4">


        <Input
          icon="mail-outline"
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Input
          icon="lock-closed-outline"
          placeholder="كلمة المرور"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />



        <Checkbox
          checked={agreeToTerms}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          label="أوافق على الشروط والأحكام"
        />

        <Pressable 
          style={{ backgroundColor: colors.primary }}
          className="rounded-full py-3.5 mt-4"
        >
          <CustomText 
            style={{ color: colors.background }}
            className="text-center font-semibold text-base"
          >
            إنشاء حساب
          </CustomText>
        </Pressable>

        <View className="flex-row items-center my-2">
          <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
          <CustomText style={{ color: colors.textSecondary }} className="mx-4">
            أو المتابعة باستخدام
          </CustomText>
          <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
        </View>

        <View className="flex-row justify-center gap-4 mt-2">
          <SocialButton icon="google" variant="icon" />
          <SocialButton icon="facebook" variant="icon" />
        </View>

        <View className="flex-row justify-center mt-6 mb-8 gap-2">
          <CustomText style={{ color: colors.textSecondary }}>
            لديك حساب بالفعل؟{' '}
          </CustomText>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <CustomText style={{ color: colors.primary }} className="font-semibold">
                تسجيل الدخول
              </CustomText>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}