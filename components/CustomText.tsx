import React from 'react';
import { Text, TextProps } from 'react-native';

// 🟢 مكون Text مخصص مع الخط الافتراضي
export default function CustomText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'IBMPlexArabic' }, props.style]}
    >
      {props.children}
    </Text>
  );
}
