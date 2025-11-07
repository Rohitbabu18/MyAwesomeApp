import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { lightTheme, darkTheme, ThemeType } from '../theme';
import Constant from '../constant';
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: (currentTheme: any) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const [theme, setTheme] = useState<ThemeType>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = Constant.store.getString('theme');
        if (savedTheme) {
          setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
        }
      } catch (error) {
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (currentTheme: any) => {
    try {
      const newTheme = currentTheme === 'dark' ? darkTheme : lightTheme;
      setTheme(newTheme);
      Constant.store.set('theme', newTheme.mode);
    } catch (error) {
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
