import "../global.css";
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';
import { useAuthStore } from '../store/authStore';
import { useFonts } from 'expo-font';
import { View, Text } from 'react-native';
import { setCustomText } from 'react-native-global-props'; // 👈 المكتبة

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function RootLayoutNav() {
  const { colors } = useTheme();
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const inAuthGroup = segments[0] === '(auth)';

      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/(tabs)');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'IBMPlexArabic': require('../assets/fonts/IBMPlexArabic.ttf'),
  });

  // 🟢 تطبيق الخط عالمياً على كل النصوص
  useEffect(() => {
    if (fontsLoaded) {
      const customTextProps = {
        style: {
          fontFamily: 'IBMPlexArabic',
        }
      };
      setCustomText(customTextProps);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>...جاري تحميل الخط</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
