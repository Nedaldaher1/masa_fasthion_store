// types/index.ts
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export type Theme = 'light' | 'dark';

export interface InputProps {
  icon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label: string;
}

export interface SocialButtonProps {
  icon: 'google' | 'facebook' | 'apple';
  text?: string;
  variant?: 'outline' | 'facebook' | 'apple' | 'icon';
  onPress?: () => void;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}