import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Logo from '../../components/Logo';
import SocialButton from '../../components/SocialButton';
import ThemeToggle from '../../components/ThemeToggle';

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
        <Text style={{ color: colors.text }} className="text-2xl font-bold mb-2">
          Welcome to Elowen
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-center">
          Please log in or sign up to continue shopping
        </Text>
      </View>

      <View className="px-6 mt-8 gap-3">
        <SocialButton 
          icon="google" 
          text="Continue with Google"
          variant="outline"
        />
        <SocialButton 
          icon="facebook" 
          text="Continue with Facebook"
          variant="facebook"
        />
        <SocialButton 
          icon="apple" 
          text="Continue with Apple"
          variant="apple"
        />
      </View>

      <View className="flex-row items-center px-6 my-6">
        <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
        <Text style={{ color: colors.textSecondary }} className="mx-4">or</Text>
        <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
      </View>

      <View className="px-6">
        <Pressable 
          style={{ backgroundColor: colors.primary }}
          className="rounded-full py-3.5"
        >
          <Text 
            style={{ color: colors.background }} 
            className="text-center font-semibold"
          >
            Sign in with password
          </Text>
        </Pressable>

        <View className="flex-row justify-center mt-4">
          <Text style={{ color: colors.textSecondary }}>
            Don't have an account?{' '}
          </Text>
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text style={{ color: colors.text }} className="font-semibold">
                Sign up
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}