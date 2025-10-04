import { useThemeStore } from '../store/themeStore';

export const useTheme = () => {
  const { theme, colors, toggleTheme, setTheme } = useThemeStore();
  
  return {
    theme,
    colors,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  };
};