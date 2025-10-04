// store/themeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeColors } from '../types';
import { Colors } from '../constants/Colors';

interface ThemeStore {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      colors: Colors.light,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
          colors: state.theme === 'light' ? Colors.dark : Colors.light,
        })),
      setTheme: (theme: Theme) =>
        set({
          theme,
          colors: theme === 'light' ? Colors.light : Colors.dark,
        }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);