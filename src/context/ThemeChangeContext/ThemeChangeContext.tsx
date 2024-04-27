import React, { useState } from 'react';
import { PaletteMode, useMediaQuery } from '@mui/material';

import {
  ThemeChangeContextProps,
  ThemeChangeProviderProps,
} from './ThemeChangeContext.types';

export const ThemeChangeContext = React.createContext<ThemeChangeContextProps>({
  mode: 'light',
  setMode: () => {},
  prefersDarkMode: false,
});

export const ThemeChangeProvider: React.FC<ThemeChangeProviderProps> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light',
  );

  const themeChangeState = {
    mode,
    setMode,
    prefersDarkMode,
  };

  return (
    <ThemeChangeContext.Provider value={themeChangeState}>
      {children}
    </ThemeChangeContext.Provider>
  );
};
