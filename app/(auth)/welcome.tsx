// app/(auth)/welcome.tsx
import { View, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import CustomText from '../../components/CustomText';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Welcome: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    Array.from({ length: 20 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-50),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    // تسلسل الأنميشن
    Animated.sequence([
      // 1. ظهور الدائرة مع التكبير
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      // 2. ظهور علامة الصح
      Animated.spring(checkmarkScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. ظهور النص تدريجياً
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // 4. أنميشن الكونفيتي
    confettiAnims.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim.y, {
          toValue: height + 100,
          duration: 2000 + Math.random() * 1000,
          delay: 400 + index * 50,
          useNativeDriver: true,
        }),
        Animated.timing(anim.rotate, {
          toValue: Math.random() * 10 - 5,
          duration: 2000,
          delay: 400 + index * 50,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 2000,
          delay: 1000 + index * 50,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // 5. الانتقال للصفحة الرئيسية
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const confettiColors = [
    colors.primary,
    '#FF6B9D',
    '#FFC371',
    '#4FACFE',
    '#43E97B',
    '#FA709A',
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Confetti particles */}
      {confettiAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: confettiColors[index % confettiColors.length],
            transform: [
              { translateX: anim.x },
              { translateY: anim.y },
              { rotate: anim.rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })}
            ],
            opacity: anim.opacity,
          }}
        />
      ))}

      <View className="flex-1 items-center justify-center px-6">
        {/* Success Circle with checkmark */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            marginBottom: 40,
          }}
        >
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              backgroundColor: colors.primary + '20',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Animated.View
                style={{
                  transform: [{ scale: checkmarkScale }],
                }}
              >
                <Ionicons name="checkmark" size={60} color={colors.background} />
              </Animated.View>
            </View>
          </View>
        </Animated.View>

        {/* Welcome Text */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
          }}
        >
          <CustomText
            style={{ color: colors.text, marginBottom: 16 }}
            className="text-3xl font-bold text-center"
          >
            🎉 مرحباً بك! 🎉
          </CustomText>
          
          <CustomText
            style={{ color: colors.textSecondary }}
            className="text-center text-base px-8"
          >
            تم تسجيل دخولك بنجاح{'\n'}
            جاري تحضير تجربة تسوق مميزة لك
          </CustomText>

          {/* Loading dots */}
          <View className="flex-row gap-2 mt-8">
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.primary,
                  opacity: fadeAnim,
                }}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

export default Welcome;