import { ThemeProvider, createTheme } from '@mui/material';
import { customPaletteDarkMode, customPaletteLightMode } from './palete.config';
import { customBreakpoints } from './breakpoints.config';
import { customTypography } from './typography.config';
import { useThemeChangeContext } from '../hooks/useThemeChangeContext';
import React from 'react';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const { mode } = useThemeChangeContext();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette:
          mode === 'dark'
            ? {
                ...customPaletteDarkMode,
              }
            : {
                ...customPaletteLightMode,
              },
        breakpoints: customBreakpoints,
        typography: customTypography,
      }),
    [mode],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
