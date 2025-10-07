import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Logo from '../../components/Logo';
import SocialButton from '../../components/SocialButton';
import ThemeToggle from '../../components/ThemeToggle';
import CustomText from '../../components/CustomText';

export default function Login() {
  const { colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }} className="flex-1">
      <View className="pt-12 px-6 flex-row justify-between items-center">
        <Pressable>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemeToggle />
      </View>

      <View className="items-center mt-8 px-6">
        <Logo />
        <CustomText style={{ color: colors.text }} className="text-3xl font-bold mb-2">
          مرحبًا بك في متجر ماسة فيشن
        </CustomText>
        <CustomText style={{ color: colors.textSecondary }} className="text-center text-sm">
          يرجى تسجيل الدخول أو التسجيل للمتابعة في التسوق
        </CustomText>
      </View>

      <View className="px-6 mt-8 gap-3">
        <SocialButton 
          icon="google" 
          text="تسيجل الدخول باستخدام غوغل  "
          variant="outline"
        />
        <SocialButton 
          icon="facebook" 
          text="تسجيل الدخول باستخدام فيسبوك"
          variant="facebook"
        />
        <SocialButton 
          icon="apple" 
          text="تسجيل الدخول باستخدام آبل"
          variant="apple"
        />
      </View>

      <View className="flex-row items-center px-6 my-6">
        <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
        <CustomText style={{ color: colors.textSecondary }} className="mx-4">أو</CustomText>
        <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
      </View>

      <View className="px-6">
        <Pressable 
          style={{ backgroundColor: colors.primary }}
          className="rounded-full py-3.5"
        >
          <CustomText 
            style={{ color: colors.background }} 
            className="text-center font-semibold">
          تسجيل الدخول باستخدام البريد الإلكتروني
          </CustomText>
        </Pressable>

        <View className="flex-row justify-center mt-4 gap-2">
          <CustomText style={{ color: colors.textSecondary }}>
            هل لديك حساب؟{' '}
          </CustomText>
          {/* 🟢 الحل: استخدم Link مع Pressable بشكل صحيح */}
        <Link href="/(tabs)/index">
  <CustomText style={{ color: colors.primary }} className="font-semibold">
    تسجيل
  </CustomText>
</Link>
        </View>
      </View>
    </View>
  );
}