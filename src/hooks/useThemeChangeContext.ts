import { useContext } from 'react';
import { ThemeChangeContext } from '../context/ThemeChangeContext';

export const useThemeChangeContext = () => {
  const context = useContext(ThemeChangeContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};
